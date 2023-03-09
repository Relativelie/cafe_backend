import { ApiError } from "../exceptions/api-error";
import { TokenService } from "../services/token.service";

const tokenService = new TokenService();

export const authMiddleware = (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("authHeader", authHeader);
    if (!authHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authHeader.split(" ")[1];
    console.log("accessToken", accessToken);
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    console.log("userData", userData);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
