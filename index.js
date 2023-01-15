import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cookieParser from "cookie-parser";

import connectToDB from './config/db.js';
import corsOptions from './config/corsOptions.js';
import authRouter from './routes/auth.js';

config();
connectToDB()

const PORT = process.env.PORT || 3001;
const app = express();

// MIDDLEWARES
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
});

mongoose.connection.on('error', err => {
    console.log(err)
});

