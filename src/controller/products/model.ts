import { NextFunction, Request, Response } from "express";

export interface GetProductReq extends Request {
  params: {
    id: string;
  };
}

export interface PutProductReq extends Request {
  params: {
    id: string;
  };
  body: {
    products: string[];
  };
}
export type ProductRes = Response<{ products: string[] }>;

export interface IProductsController {
  getProducts: (req: GetProductReq, res: ProductRes, next: NextFunction) => void;
  updateProducts: (req: PutProductReq, res: ProductRes, next: NextFunction) => void;
}
