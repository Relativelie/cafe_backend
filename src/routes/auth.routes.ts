import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { ClientAuthService } from "../services/client-auth.service";
import { MailService } from "../services/mail.service";
import { TokenService } from "../services/token.service";

const authRouter = Router();

const tokenService = new TokenService();
const mailService = new MailService();
const userService = new ClientAuthService(mailService, tokenService);
const authController = new AuthController(userService);

authRouter.post("/registration", authController.registration.bind(authController));
authRouter.get("/activate/:link", authController.activate.bind(authController));

// authRouter.post("/login", authController.updateLikesById);
// authRouter.post("/logout", authController.updateLikesById);

// authRouter.get("/refresh", authController.updateLikesById);
// authRouter.get("/users", authController.updateLikesById);

export default authRouter;
