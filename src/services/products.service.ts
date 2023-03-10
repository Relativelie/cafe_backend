import pool from "../db";

export interface IProductsService {
  getProductsByUserId: (userId: string) => Promise<string[]>;
  updateProductsByUserId: (userId: string, productsList: string[]) => Promise<string[]>;
  createProductsList: (userId: string) => void;
}

export class ProductsService implements IProductsService {
  async getProductsByUserId(userId: string) {
    const products = await pool.query("select * from products where user_id = $1", [
      userId,
    ]);
    return products.rows[0];
  }

  async updateProductsByUserId(userId: string, productsList: string[]) {
    const products = await pool.query(
      "update products set products_list = $1 where user_id = $2 RETURNING *",
      [productsList, userId],
    );
    return products.rows[0].products_list;
  }

  async createProductsList(userId: string) {
    const productsQuery = "INSERT INTO products (user_id, products_list) VALUES ($1, $2)";
    const productsValues = [userId, []];
    await pool.query(productsQuery, productsValues);
  }
}
