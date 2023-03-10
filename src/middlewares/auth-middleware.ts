import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/api-error";
import { TokenService } from "../services/token.service";

const tokenService = new TokenService();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    // req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
