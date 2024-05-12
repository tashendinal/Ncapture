import { Router } from "express";
import authController from "../controllers/auth.js";

const authRouter = new Router();
authRouter.post("/login", authController.Login);

export default authRouter;

