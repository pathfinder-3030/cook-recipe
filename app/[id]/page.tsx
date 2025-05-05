"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getRecipeById } from "@/utils/storage";
import { Recipe } from "@/types/recipe";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (typeof id === "string") {
      const found = getRecipeById(id);
      setRecipe(found || null);
    }
  }, [id]);

  if (!id) return <p className='text-center mt-10'>読み込み中...</p>;

  if (recipe === null) {
    return (
      <main className='min-h-screen bg-yellow-50 py-12 px-4 '>
        <div className='max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-orange-200 text-center'>
          <h1 className='text-2xl font-bold text-orange-800 mb-4'>レシピ詳細</h1>
          <p className='text-gray-600 mb-6'>レシピが見つかりませんでした。</p>
          <button
            onClick={() => router.push("/")}
            className='bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full shadow transition'
          >
            ← 一覧へ戻る
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-yellow-50 py-12 px-4 flex items-center justify-center'>
      <div className='max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-orange-200 w-150'>
        <h1 className='text-2xl font-bold text-center text-orange-800 mb-6'>🍲 {recipe.title}</h1>

        <div className='mb-6'>
          <h2 className='text-lg font-semibold text-orange-700 mb-2'>材料</h2>
          <ul className='list-disc list-inside space-y-1 text-gray-800'>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {recipe.instructions && (
          <div className='mb-6'>
            <h2 className='text-lg font-semibold text-orange-700 mb-2'>作り方</h2>
            <p className='text-gray-700 whitespace-pre-wrap'>{recipe.instructions}</p>
          </div>
        )}

        <div className='text-center'>
          <button
            onClick={() => router.push("/")}
            className='bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full shadow transition'
          >
            ← 一覧へ戻る
          </button>
        </div>
      </div>
    </main>
  );
}
