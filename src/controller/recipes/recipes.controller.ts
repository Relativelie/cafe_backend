import pool from "../../db";
import {
  AllRecipesReq,
  AllRecipesRes,
  CreateRecipeReq,
  IRecipesController,
  RecipeReq,
  RecipeRes,
} from "./model";

export class RecipesController implements IRecipesController {
  async getRecipeById(req: RecipeReq, res: RecipeRes) {
    const recipeId = req.params.id;
    const recipe = await pool.query("select * from recipes where id = $1", [recipeId]);
    res.status(200).json(recipe.rows[0]);
  }

  async getAllRecipes(req: AllRecipesReq, res: AllRecipesRes) {
    const { from, limit } = req.query;
    const recipe = await pool.query("select * from recipes offset $1 limit $2", [
      from,
      limit,
    ]);
    res.status(200).json({ items: recipe.rows, from, limit });
  }

  async createRecipe(req: CreateRecipeReq, res: AllRecipesRes) {
    const { title, link_id } = req.body;
    const recipe = await pool.query(
      "insert into recipes (title, link_id) values ($1, $2) RETURNING *",
      [title, link_id],
    );
    res.status(200).json(recipe.rows[0]);
  }
}
