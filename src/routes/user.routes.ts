import { Router } from "express";
import { authMiddleware } from "@middlewares/auth-middleware";
import { UserController } from "@controller/index";
import { UserService } from "@services/user.service";

const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.get("/:id", authMiddleware, userController.getUserById.bind(userController));

export default userRouter;
