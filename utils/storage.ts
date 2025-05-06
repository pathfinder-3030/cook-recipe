import { Recipe } from "@/types/recipe";

const STORAGE_KEY = "recipes";

export const saveRecipe = (recipe: Recipe) => {
  const recipes = getRecipes();
  recipes.push(recipe);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
};

export const getRecipes = (): Recipe[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getRecipeById = (id: string): Recipe | undefined => {
  return getRecipes().find((recipe) => recipe.id === id);
};

export const deleteRecipeById = (id: string) => {
  const recipes = getRecipes();
  const updated = recipes.filter((recipe) => recipe.id !== id);
  localStorage.setItem("recipes", JSON.stringify(updated));
};
