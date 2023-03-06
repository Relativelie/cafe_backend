import { Request, Response } from "express";

export interface IAuthController {
  registration: (req: Request, res: Response) => void;
}
