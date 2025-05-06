"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteRecipeById, getRecipes } from "@/utils/storage";
import { Recipe } from "@/types/recipe";
import { Microwave, ChefHat, X } from "lucide-react";

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    setRecipes(getRecipes());
  }, []);

  const handleDelete = (id: string) => {
    deleteRecipeById(id);
    setRecipes(getRecipes());
  };

  return (
    <main className='min-h-screen bg-yellow-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl'>
        <div className='flex items-center justify-center gap-1 mb-2'>
          <Microwave size={30} className='text-orange-600' />
          <h1 className='text-3xl font-bold  text-orange-600'>レシピ一覧</h1>
        </div>

        <div className='flex justify-center mb-10'>
          <Link href='/new'>
            <button className='bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md text-sm font-medium shadow cursor-pointer'>
              ＋ 新しいレシピを追加
            </button>
          </Link>
        </div>

        {recipes.length === 0 ? (
          <div className='flex items-center justify-center'>
            <p className='text-center text-gray-500'>まだレシピが登録されていません</p>
            <ChefHat size={20} className='text-orange-600' />
          </div>
        ) : (
          <div>
            <ul className='space-y-3'>
              {recipes.map((recipe) => (
                <li key={recipe.id}>
                  <div className='flex gap-2 items-center w-full '>
                    <Link
                      href={`/${recipe.id}`}
                      className='block p-2 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-md text-orange-800 font-medium transition w-full'
                    >
                      {recipe.title}
                    </Link>
                    <button
                      onClick={() => handleDelete(recipe.id)}
                      className='text-sm text-red-500 hover:text-red-700 transition border border-red-500 p-2 rounded-md cursor-pointer'
                    >
                      <X />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
