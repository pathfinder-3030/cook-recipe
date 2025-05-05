"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRecipes } from "@/utils/storage";
import { Recipe } from "@/types/recipe";

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    setRecipes(getRecipes());
  }, []);

  return (
    <main className='min-h-screen bg-yellow-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl'>
        <h1 className='text-3xl font-bold text-center text-orange-600 mb-6 flex items-center justify-center gap-2'>
          <span role='img' aria-label='cooking'>
            🍽️
          </span>
          レシピ一覧
        </h1>

        <div className='flex justify-center mb-6'>
          <Link href='/new'>
            <button className='bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md text-sm font-medium shadow'>
              ＋ 新しいレシピを追加
            </button>
          </Link>
        </div>

        {recipes.length === 0 ? (
          <p className='text-center text-gray-500'>まだレシピが登録されていません 🍳</p>
        ) : (
          <ul className='space-y-3'>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <Link
                  href={`/${recipe.id}`}
                  className='block p-4 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-md text-orange-800 font-medium transition'
                >
                  {recipe.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
