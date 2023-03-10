import { Router } from "express";
import { AuthController } from "../controller/auth/auth.controller";
import { AuthService } from "../services/auth.service";
import { MailService } from "../services/mail.service";
import { TokenService } from "../services/token.service";
import { body } from "express-validator";

const authRouter = Router();

const tokenService = new TokenService();
const mailService = new MailService();
const userService = new AuthService(mailService, tokenService);
const authController = new AuthController(userService);

authRouter.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  authController.registration.bind(authController),
);
authRouter.get("/activate/:link", authController.activate.bind(authController));
authRouter.post("/login", authController.login.bind(authController));
authRouter.post("/logout", authController.logout.bind(authController));
authRouter.get("/refresh", authController.refresh.bind(authController));

export default authRouter;
