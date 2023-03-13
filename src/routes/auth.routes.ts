import { Router } from "express";
import { body } from "express-validator";
import URLS from "@constants/urls";
import { AuthController } from "@controller/index";
import { AuthService, MailService, TokenService } from "@services";

const authRouter = Router();

const tokenService = new TokenService();
const mailService = new MailService();
const userService = new AuthService(mailService, tokenService);
const authController = new AuthController(userService);

authRouter.post(
  URLS.AUTH.REGISTRATION,
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  authController.registration.bind(authController),
);
authRouter.get(URLS.AUTH.ACTIVATION, authController.activate.bind(authController));
authRouter.post(URLS.AUTH.LOGIN, authController.login.bind(authController));
authRouter.post(URLS.AUTH.LOGOUT, authController.logout.bind(authController));
authRouter.get(URLS.AUTH.REFRESH, authController.refresh.bind(authController));

export default authRouter;
