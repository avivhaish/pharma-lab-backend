import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

import corsOptions from './config/corsOptions.js';

const PORT = process.env.PORT || 3001;
const app = express();

// MIDDLEWARES
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});