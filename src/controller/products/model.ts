import { Request, Response } from "express";

export interface ProductReq extends Request {
  params: {
    id: string;
  };
}

export interface ProductRes extends Response {
  body: {
    status: string;
    products: string[];
  };
}

export interface IProductsController {
  getProductsByPersonId: (req: ProductReq, res: ProductRes) => void;
}
