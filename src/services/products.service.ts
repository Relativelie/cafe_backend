import { Products, Weekdays } from "@controller/products";
import pool from "db";

export interface IProductsService {
  getProductsByUserId: (userId: string) => Promise<Products[]>;
  updateProducts: (
    userId: string,
    weekday: Weekdays,
    productsList: string[],
  ) => Promise<Products>;
  createProductsList: (
    productId: string,
    weekday: Weekdays,
    products: string[],
  ) => Promise<Products>;
}

export class ProductsService implements IProductsService {
  async getProductsByUserId(userId: string) {
    const products = await pool.query("select * from products where user_id = $1", [
      userId,
    ]);
    return products.rows;
  }

  async updateProducts(productId: string, weekday: Weekdays, productsList: string[]) {
    const products = await pool.query(
      "update products set products_list = $1, weekday = $2 where id = $3 RETURNING *",
      [productsList, weekday, productId],
    );
    return products.rows[0];
  }

  async createProductsList(userId: string, weekday: Weekdays, products: string[]) {
    const productsQuery =
      "INSERT INTO products (user_id, products_list, weekday) VALUES ($1, $2, $3)  RETURNING *";
    const productsValues = [userId, products, weekday];
    const productsList = await pool.query(productsQuery, productsValues);
    return productsList.rows[0];
  }
}
