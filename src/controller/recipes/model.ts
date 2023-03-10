import { NextFunction, Request, Response } from "express";

export interface IRecipesController {
  getRecipe: (req: RecipeReq, res: RecipeRes, next: NextFunction) => void;
  getAllRecipes: (req: AllRecipesReq, res: AllRecipesRes, next: NextFunction) => void;
  createRecipe: (req: CreateRecipeReq, res: RecipeRes, next: NextFunction) => void;
}

export type Recipe = {
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

export type AllRecipesRes = Response<Recipes>;

export interface RecipeReq extends Request {
  params: {
    id: string;
  };
}

export type RecipeRes = Response<Recipe>;

export interface CreateRecipeReq extends Request {
  body: {
    title: string;
    link_id: string;
  };
}
