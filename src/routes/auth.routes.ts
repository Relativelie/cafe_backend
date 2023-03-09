import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { ClientAuthService } from "../services/client-auth.service";
import { MailService } from "../services/mail.service";
import { TokenService } from "../services/token.service";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/auth-middleware";

const authRouter = Router();

const tokenService = new TokenService();
const mailService = new MailService();
const userService = new ClientAuthService(mailService, tokenService);
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
authRouter.get("/users", authMiddleware, authController.getUsers.bind(authController));

export default authRouter;
