import { Request, Response } from "express";
import { ApiError } from "../exceptions/api-error";

export const errorMiddleware = (err: Error, req: Request, res: Response) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: err.message });
};
