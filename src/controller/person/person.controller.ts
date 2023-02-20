import { Request, Response } from "express";
import pool from "../../db";
import { IPersonController } from "./model";

export class PersonController implements IPersonController {
  async createPerson(req: Request, res: Response) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      const personQueryTxt = "INSERT INTO person values(default) RETURNING *";
      const personRes = await client.query(personQueryTxt);
      const person = personRes.rows[0];

      const insertLikesTxt = "INSERT INTO likes (user_id, likes_list) VALUES ($1, $2)";
      const insertLikesValues = [person.id, []];
      await client.query(insertLikesTxt, insertLikesValues);

      const insertProductsTxt =
        "INSERT INTO products (user_id, products_list) VALUES ($1, $2)";
      const insertProductsValues = [person.id, []];
      await client.query(insertProductsTxt, insertProductsValues);

      await client.query("COMMIT");

      res.json({ status: "ok", person });
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }

  async getPersonById(req: Request, res: Response) {
    const id = req.params.id;
    const person = await pool.query("select * from person where id = $1", [id]);
    res.json({ status: "ok", person: person.rows[0] });
  }
}
