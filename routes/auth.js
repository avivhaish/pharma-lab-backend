import { Router } from 'express';
import { createNewUser } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/signup", createNewUser);

export default authRouter;