import { Request, Response } from "express";

type Recipe = {
  id: number;
  title: string;
  link_id: string;
};

type AllRecipesResBody = {
  status: string;
  recipes: {
    items: Recipe[];
    from: string;
    limit: string;
  };
};

export interface AllRecipesReq extends Request {
  query: {
    from: string;
    limit: string;
  };
}

export interface AllRecipesRes extends Response {
  body: AllRecipesResBody;
}

export interface RecipeReq extends Request {
  params: {
    id: string;
  };
}

export interface RecipeRes extends Response {
  body: {
    status: string;
    recipe: Recipe;
  };
}

export interface IRecipesController {
  getRecipeById: (req: RecipeReq, res: RecipeRes) => void;
  getAllRecipes: (req: AllRecipesReq, res: AllRecipesRes) => void;
}
