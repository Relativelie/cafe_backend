import { Request, Response } from "express";

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
    products: number[];
  };
}
export type ProductRes = Response<{ products: string[] }>

export interface IProductsController {
  getProductsByPersonId: (req: GetProductReq, res: ProductRes) => void;
  updateProductsById: (req: PutProductReq, res: ProductRes) => void;
}
