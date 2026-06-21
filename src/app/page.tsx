import Link from "next/link";

import { LearningPlayground } from "@/components/learning-playground";
import { fetchProducts } from "@/lib/sample-data";

const conceptCards = [
  {
    title: "Component",
    description: "画面を部品として分割し、責務ごとに組み立てる考え方です。",
  },
  {
    title: "State",
    description: "入力値や選択状態など、変化するデータを起点にUIを更新します。",
  },
  {
    title: "Data Fetching",
    description: "Spring Boot APIから取得したJSONを画面に載せるのが日常業務の中心です。",
  },
  {
    title: "Rendering",
    description: "Server/Clientのどちらで描画するかを使い分けて体験を最適化します。",
  },
];

const learningSteps = [
  "HTML/CSSでレイアウトと見た目を理解する",
  "JavaScriptでイベントと非同期通信を掴む",
  "Reactでstateとpropsに慣れる",
  "Next.jsでルーティングとデータ取得を学ぶ",
  "Spring Boot APIと接続して実務の流れに寄せる",
];

const comparisonRows = [
  ["URL設計", "@RequestMapping / @GetMapping", "app配下のファイルベースルーティング"],
  ["初期表示", "ThymeleafなどでHTML生成", "Server Component / SSRでHTML生成"],
  ["API通信", "RestControllerでJSON返却", "fetchでJSON取得して描画"],
  ["状態管理", "サーバー側のセッションやDTO", "useStateや外部ストアで画面状態を保持"],
];

export default async function Home() {
  const products = await fetchProducts();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-5 py-8 text-slate-800 sm:px-8 lg:px-12">
      <section className="grid gap-6 overflow-hidden rounded-[2rem] border border-border bg-surface p-8 shadow-[0_30px_120px_rgba(23,76,99,0.12)] backdrop-blur md:grid-cols-[1.4fr_0.9fr] md:p-12">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent-deep">
            Next.js Learning Kit
          </p>
          <div className="space-y-4">
            <h1 className="font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
              フロントエンド未経験から、Next.jsとSpring Bootの接続点まで一気に掴む。
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              このページはServer Componentで初期描画され、下のプレイグラウンドはClient Componentで動きます。
              実務で必要になる概念を、画面とドキュメントの両方から追える構成にしています。
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="#playground"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              サンプルを触る
            </Link>
            <Link
              href="https://nextjs.org/docs"
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-accent-deep transition-colors hover:bg-white/65"
              target="_blank"
              rel="noreferrer"
            >
              公式ドキュメント
            </Link>
          </div>
        </div>

        <div className="rounded-[1.75rem] bg-[linear-gradient(160deg,rgba(23,76,99,0.96),rgba(23,76,99,0.74))] p-6 text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-200">
            Spring Bootとの役割分担
          </p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-100/90">
            <p>
              ブラウザ: 入力・表示・画面遷移を担当
            </p>
            <p>
              Next.js: UI構築、初期表示、BFF的な中継処理を担当
            </p>
            <p>
              Spring Boot: 業務ロジック、認証、DBアクセス、正式なAPIを担当
            </p>
          </div>
          <div className="mt-6 rounded-3xl border border-white/15 bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-orange-100/80">
              このページの例
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-50/90">
              上段の商品一覧はServer Componentで取得済みデータをそのまま描画し、下段の検索・再取得はClient ComponentからAPI Routeを呼んでいます。
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {conceptCards.map((card) => (
          <article
            key={card.title}
            className="rounded-[1.5rem] border border-border bg-surface p-6 shadow-[0_10px_40px_rgba(23,76,99,0.08)]"
          >
            <h2 className="font-heading text-2xl text-accent-deep">{card.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <article className="rounded-[1.75rem] border border-border bg-surface p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            学習順
          </p>
          <ol className="mt-5 space-y-4">
            {learningSteps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-deep text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-7 text-slate-700">{step}</p>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-[1.75rem] border border-border bg-surface p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            Spring Boot経験者向け対応表
          </p>
          <div className="mt-5 overflow-hidden rounded-[1.25rem] border border-border">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-white/70 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">観点</th>
                  <th className="px-4 py-3 font-semibold">Spring Boot</th>
                  <th className="px-4 py-3 font-semibold">Next.js</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([topic, spring, next]) => (
                  <tr key={topic} className="border-t border-border/80 align-top">
                    <td className="px-4 py-4 font-semibold text-accent-deep">{topic}</td>
                    <td className="px-4 py-4 text-slate-600">{spring}</td>
                    <td className="px-4 py-4 text-slate-600">{next}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section className="rounded-[1.75rem] border border-border bg-surface p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              Server Componentの例
            </p>
            <h2 className="mt-2 font-heading text-3xl text-accent-deep">
              初期表示の商品一覧
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            ここはサーバー側でデータ取得してからHTMLを返す想定です。実務ではここでSpring Boot APIを叩くことが多いです。
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-[1.5rem] bg-surface-strong p-5 shadow-[0_8px_30px_rgba(23,76,99,0.08)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-accent">{product.category}</p>
                  <h3 className="mt-2 font-heading text-2xl text-accent-deep">{product.name}</h3>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                  #{product.id}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{product.description}</p>
              <p className="mt-4 text-lg font-semibold text-slate-800">{product.price.toLocaleString("ja-JP")}円</p>
            </article>
          ))}
        </div>
      </section>

      <LearningPlayground />
    </main>
  );
}
