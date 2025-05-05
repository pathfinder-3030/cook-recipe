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
    <div style={{ padding: "2rem" }}>
      <h1>料理レシピ一覧</h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <Link href='/new'>
          <button>＋ 新しいレシピを追加</button>
        </Link>
      </div>

      {recipes.length === 0 ? (
        <p>レシピが登録されていません。</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link href={`/${recipe.id}`}>{recipe.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
