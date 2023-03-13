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
    weekday: Weekdays;
  };
}

export enum Weekdays {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}

export interface PostProductReq extends Request {
  body: {
    id: string;
    products: string[];
    weekday: Weekdays;
  };
}

export type Products = {
  id: number;
  user_id: number;
  products_list: string[];
  weekday: Weekdays;
};

export type ProductRes = Response<Products>;
export type ProductsList = Response<Products[]>;

export interface IProductsController {
  getProducts: (req: GetProductReq, res: ProductsList, next: NextFunction) => void;
  updateProducts: (req: PutProductReq, res: ProductRes, next: NextFunction) => void;
  createProductsList: (req: PostProductReq, res: ProductRes, next: NextFunction) => void;
}
