import mongoose from 'mongoose';

const connectToDB = async () => {
    mongoose.set("strictQuery", false);
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        console.log(err)
    }
}

export default connectToDB;