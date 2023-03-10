import { Router } from "express";
import { UserController } from "../controller/user/user.controller";
import { UserService } from "../services/user.service";

const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.get("/:id", userController.getUserById.bind(userController));

export default userRouter;
