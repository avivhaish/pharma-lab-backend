import asyncHandler from 'express-async-handler';
import { genSalt, hash } from 'bcrypt';
import User from '../models/User.js';

// @desc Creates a new user and saves it to the DB
// @route POST auth/signup 
// @access Private (Admin only!)
export const createNewUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, isAdmin } = req.body;

    if (!fullName || !email || !password || !isAdmin) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    const isUserExists = await User.findOne({ email }).lean().exec();

    if (isUserExists) {
        return res.status(409).json({
            success: false,
            message: "User already exists"
        });
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const userObj = {
        fullName,
        email,
        password: hashedPassword,
        isAdmin
    };

    const user = await User.create(userObj);

    if (user) {
        res.status(201).json({
            success: true,
            message: `New user created for ${fullName}`
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Invalid user data received'
        });
    }
});