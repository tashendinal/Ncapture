import { Router } from "express";
import userController from "../controllers/user.js";
import UserValidator from "../middleware/UserValidator.js";

const userRouter = new Router();

userRouter.post("/user", UserValidator.createUser , userController.createUser);
userRouter.get("/user/:id", userController.getUserById);
userRouter.get("/users", userController.getAllUsers);
userRouter.put("/user/:id", userController.updateUserById);
userRouter.delete("/user/:id", userController.deleteUserById);

export default userRouter;
