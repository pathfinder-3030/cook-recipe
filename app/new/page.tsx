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
    <main className='min-h-screen bg-yellow-50 py-12 px-4 flex items-center justify-center'>
      <div className='max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-orange-200 w-100'>
        <h1 className='text-2xl font-bold text-center text-orange-800 flex items-center justify-center gap-2 mb-6'>
          <span role='img' aria-label='pencil'>
            📝
          </span>
          レシピを追加
        </h1>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-700'>料理名</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400'
              placeholder='例: カレーライス'
            />
          </div>

          <div>
            <label className='block mb-2 text-sm font-medium text-gray-700'>材料</label>
            <div className='space-y-2'>
              {ingredients.map((ingredient, index) => (
                <input
                  key={index}
                  type='text'
                  value={ingredient}
                  onChange={(e) => handleChangeIngredient(index, e.target.value)}
                  placeholder={`材料 ${index + 1}`}
                  className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200'
                />
              ))}
            </div>
            <button
              type='button'
              onClick={handleAddIngredient}
              className='mt-3 inline-block text-sm text-orange-600 hover:underline'
            >
              ＋ 材料を追加
            </button>
          </div>

          <div className='text-center'>
            <button
              type='submit'
              className='bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full shadow transition'
            >
              登録
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
