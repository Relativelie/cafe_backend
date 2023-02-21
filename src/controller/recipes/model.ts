import { Request, Response } from "express";

type Recipe = {
  id: number;
  title: string;
  link_id: string;
};

type Recipes = {
  items: Recipe[];
  from: string;
  limit: string;
};

export interface AllRecipesReq extends Request {
  query: {
    from: string;
    limit: string;
  };
}

export type AllRecipesRes = Response<Recipes>

export interface RecipeReq extends Request {
  params: {
    id: string;
  };
}

export type RecipeRes = Response<Recipe>

export interface CreateRecipeReq extends Request {
  body: {
    title: string;
    link_id: number;
  };
}

export interface IRecipesController {
  getRecipeById: (req: RecipeReq, res: RecipeRes) => void;
  getAllRecipes: (req: AllRecipesReq, res: AllRecipesRes) => void;
  createRecipe: (req: CreateRecipeReq, res: AllRecipesRes) => void;
}
