import { Router } from "express";
import { AuthController } from "../controller/auth/auth.controller";

const authRouter = Router();

const authController = new AuthController();

authRouter.post("/registration", authController.registration);
// authRouter.post("/login", authController.updateLikesById);
// authRouter.post("/logout", authController.updateLikesById);
// authRouter.get("/activate/:link", authController.updateLikesById);
// authRouter.get("/refresh", authController.updateLikesById);
// authRouter.get("/users", authController.updateLikesById);

export default authRouter;
