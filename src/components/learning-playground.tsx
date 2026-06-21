"use client";

import { useEffect, useState, useTransition } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
};

type ProductsResponse = {
  source: string;
  products: Product[];
};

export function LearningPlayground() {
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const refreshProducts = () => {
    startTransition(async () => {
      setErrorMessage("");

      try {
        const response = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("商品一覧の取得に失敗しました");
        }

        const data: ProductsResponse = await response.json();
        setProducts(data.products);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "不明なエラーが発生しました",
        );
      }
    });
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const normalizedKeyword = keyword.trim().toLowerCase();
  const visibleProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesKeyword =
      normalizedKeyword.length === 0 ||
      `${product.name} ${product.description}`.toLowerCase().includes(normalizedKeyword);

    return matchesCategory && matchesKeyword;
  });

  const categories = ["all", ...new Set(products.map((product) => product.category))];

  return (
    <section
      id="playground"
      className="grid gap-6 rounded-[1.75rem] border border-border bg-surface p-8 lg:grid-cols-[0.92fr_1.08fr]"
    >
      <article>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
          Client Componentの例
        </p>
        <h2 className="mt-2 font-heading text-3xl text-accent-deep">
          状態管理とAPI再取得のプレイグラウンド
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          このブロックはブラウザ上で動作します。検索文字列、カテゴリ、ローディング状態、エラー状態をuseStateとuseTransitionで扱っています。
        </p>

        <div className="mt-6 space-y-4 rounded-[1.5rem] bg-surface-strong p-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">キーワード検索</span>
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="例: Dashboard"
              className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none transition-colors focus:border-accent"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">カテゴリ</span>
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none transition-colors focus:border-accent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "すべて" : category}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={refreshProducts}
            className="inline-flex rounded-full bg-accent-deep px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            APIを再取得する
          </button>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-dashed border-border p-5 text-sm leading-7 text-slate-600">
          <p>ブラウザ → /api/products → 実務ではさらにSpring Boot APIという流れを再現しています。</p>
          <p className="mt-2">認証ヘッダー付与やレスポンス整形をNext.js側で吸収したい場合、この中継層は有効です。</p>
        </div>
      </article>

      <article className="rounded-[1.5rem] bg-surface-strong p-5 shadow-[0_12px_35px_rgba(23,76,99,0.08)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent-deep">
              fetch結果
            </p>
            <p className="mt-1 text-sm text-slate-500">件数: {visibleProducts.length}</p>
          </div>
          {isPending ? (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
              読み込み中
            </span>
          ) : (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Ready
            </span>
          )}
        </div>

        {errorMessage ? (
          <p className="mt-4 rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-700">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-5 space-y-3">
          {visibleProducts.map((product) => (
            <div key={product.id} className="rounded-[1.25rem] border border-border bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-slate-800">{product.name}</h3>
                <span className="text-xs uppercase tracking-[0.22em] text-accent">{product.category}</span>
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-600">{product.description}</p>
              <p className="mt-3 text-sm font-semibold text-accent-deep">{product.price.toLocaleString("ja-JP")}円</p>
            </div>
          ))}

          {!isPending && visibleProducts.length === 0 ? (
            <p className="rounded-[1.25rem] border border-dashed border-border px-4 py-6 text-sm text-slate-500">
              条件に一致する商品がありません。
            </p>
          ) : null}
        </div>
      </article>
    </section>
  );
}