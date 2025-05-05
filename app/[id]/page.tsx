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

  if (!id) return <p>読み込み中...</p>;

  if (recipe === null) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>レシピ詳細</h1>
        <p>レシピが見つかりませんでした。</p>
        <button onClick={() => router.push("/")}>← 一覧へ戻る</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{recipe.title}</h1>

      <h2>材料</h2>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {recipe.instructions && (
        <>
          <h2>作り方</h2>
          <p>{recipe.instructions}</p>
        </>
      )}

      <div style={{ marginTop: "2rem" }}>
        <button onClick={() => router.push("/")}>← 一覧へ戻る</button>
      </div>
    </div>
  );
}
