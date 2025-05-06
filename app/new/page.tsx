"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { saveRecipe } from "@/utils/storage";
import { Recipe } from "@/types/recipe";
import { Microwave } from "lucide-react";

const units = ["g", "kg", "ml", "L", "個", "本", "大さじ", "小さじ", "適量"];

export default function NewRecipePage() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState<{ name: string; amount: string; unit: string }[]>([
    { name: "", amount: "", unit: "" },
  ]);
  const router = useRouter();

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };

  const handleChangeIngredient = (
    index: number,
    key: "name" | "amount" | "unit",
    value: string
  ) => {
    const updated = [...ingredients];
    updated[index][key] = value;
    setIngredients(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const recipe: Recipe = {
      id: uuidv4(),
      title,
      ingredients: ingredients
        .filter((item) => item.name.trim() !== "")
        .map((item) => `${item.name} ${item.amount || ""}${item.unit || "適量"}`),
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
                <div key={index} className='flex items-center gap-2'>
                  <input
                    type='text'
                    value={ingredient.name}
                    onChange={(e) => handleChangeIngredient(index, "name", e.target.value)}
                    placeholder={`材料 ${index + 1}`}
                    className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200'
                  />
                  <input
                    type='text'
                    value={ingredient.amount}
                    onChange={(e) => handleChangeIngredient(index, "amount", e.target.value)}
                    placeholder='数量'
                    className='w-24 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200'
                  />
                  <select
                    value={ingredient.unit}
                    onChange={(e) => handleChangeIngredient(index, "unit", e.target.value)}
                    className='h-[42px] border border-gray-300 rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200'
                  >
                    <option value=''>---</option>
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
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
