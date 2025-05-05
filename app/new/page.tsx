"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { saveRecipe } from "@/utils/storage";
import { Recipe } from "@/types/recipe";

export default function NewRecipePage() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const router = useRouter();

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleChangeIngredient = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const recipe: Recipe = {
      id: uuidv4(),
      title,
      ingredients: ingredients.filter((item) => item.trim() !== ""),
    };

    saveRecipe(recipe);
    router.push("/");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>レシピ追加</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>料理名：</label>
          <br />
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>材料：</label>
          <br />
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type='text'
                value={ingredient}
                onChange={(e) => handleChangeIngredient(index, e.target.value)}
                placeholder={`材料 ${index + 1}`}
              />
            </div>
          ))}
          <button type='button' onClick={handleAddIngredient}>
            ＋ 材料を追加
          </button>
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <button type='submit'>保存して一覧へ戻る</button>
        </div>
      </form>
    </div>
  );
}
