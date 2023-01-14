import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
    origin: (origin, cb) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            cb(null, true);
            return;
        }

        cb(new Error("NOT ALLOWED BY CORS"));
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions;