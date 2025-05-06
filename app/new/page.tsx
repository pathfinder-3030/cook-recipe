"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { saveRecipe } from "@/utils/storage";
import { Recipe } from "@/types/recipe";
import { Microwave } from "lucide-react";

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
        <div className='flex items-center justify-center gap-1 mb-2'>
          <Microwave size={30} className='text-orange-600' />
          <h1 className='text-3xl font-bold  text-orange-600'>レシピを追加</h1>
        </div>

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
              className='mt-3 inline-block text-sm text-orange-600 hover:underline cursor-pointer'
            >
              ＋ 材料を追加
            </button>
          </div>

          <div className='flex justify-center gap-2'>
            <button
              type='submit'
              className='bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full shadow transition cursor-pointer'
            >
              登録
            </button>
            <button
              type='button'
              onClick={() => router.push("/")}
              className='text-orange-700 border border-orange-400 hover:bg-orange-100 py-2 px-6 rounded-full transition cursor-pointer'
            >
              一覧へ
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
