import { Router } from "express";
import userRouter from "./user.js";
import authRouter from "./auth.js";
import eventRouter from "./event.js";
import mediaAssignsRouter from "./mediaAssigns.js";

const mainRouter = new Router();

mainRouter.use(authRouter);
mainRouter.use(userRouter);
mainRouter.use(eventRouter);
mainRouter.use(mediaAssignsRouter);


export default mainRouter;
