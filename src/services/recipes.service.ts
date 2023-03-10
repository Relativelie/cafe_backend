import { Recipe } from "@controller/recipes";
import pool from "db";

export interface IRecipesService {
  getRecipeById: (recipeId: string) => Promise<Recipe>;
  getAllRecipes: (from: number, limit: number) => Promise<Recipe[]>;
  createRecipe: (title: string, link_id: string) => Promise<Recipe>;
}

export class RecipesService implements IRecipesService {
  async getRecipeById(recipeId: string) {
    const recipe = await pool.query("select * from recipes where id = $1", [recipeId]);
    return recipe.rows[0];
  }

  async getAllRecipes(from: number, limit: number) {
    const recipe = await pool.query("select * from recipes offset $1 limit $2", [
      from - 1,
      limit,
    ]);
    return recipe.rows;
  }

  async createRecipe(title: string, link_id: string) {
    const recipe = await pool.query(
      "insert into recipes (title, link_id) values ($1, $2) RETURNING *",
      [title, link_id],
    );
    return recipe.rows[0];
  }
}
