# ファイルの読み方と一般的な記述方法

このドキュメントは、`src/app/page.tsx` を起点に、Next.js学習時に迷いやすい「読む順番」と「書く型」を整理したガイドです。

## まず読む順番

実装を読むときは、次の順で追うと責務が混ざりにくくなります。

1. 画面の入口を見る（`src/app/page.tsx`）
2. ユーザー操作を持つ部品を見る（`src/components/learning-playground.tsx`）
3. APIの入口を見る（`src/app/api/products/route.ts`）
4. データ取得の元を見る（`src/lib/sample-data.ts`）

## `src/app/page.tsx` の見方

`page.tsx` はトップページのServer Componentです。初期表示を作る責務を持ちます。

1. import

- 使うモジュールを宣言する
- 一般的には「外部ライブラリ -> 自作コンポーネント -> 自作関数」の順で並べる

2. 画面表示用の定数

- `conceptCards`、`learningSteps`、`comparisonRows` は固定表示データ
- 一般的には、固定データはコンポーネント外に置いて再作成を防ぐ

3. Server Component本体

- `export default async function Home()` で初期描画前にデータ取得する
- 一般的には、初回表示に必要なデータ取得はServer Componentで行う

4. JSXでの表示

- `map` を使って一覧を描画するのはReactの基本パターン
- 一般的には、JSXが長くなったらsection単位で小さなコンポーネントに分割する

5. Client Componentの呼び出し

- `<LearningPlayground />` を配置し、操作部分を分離している
- 一般的には「初期表示はServer」「操作はClient」を分ける

## `src/components/learning-playground.tsx` の見方

`"use client"` があるため、このファイルはブラウザ側で動作します。

- `useState` で入力値、選択値、取得データ、エラーを保持
- `useTransition` で再取得中の状態を表現
- 一般的な並び順は「state宣言 -> イベント関数 -> 導出値 -> JSX」

このサンプルで出てくるstateの型:

- 入力state: `keyword`, `selectedCategory`
- 非同期state: `isPending`, `errorMessage`
- データstate: `products`

## `src/app/api/products/route.ts` の見方

Route Handlerとして、`GET` 関数がAPIエンドポイントになります。

- 役割はブラウザとバックエンドの中継
- 一般的にはここで認証ヘッダー付与、レスポンス整形、エラーハンドリングを行う

## `src/lib/sample-data.ts` の見方

UIから独立したデータ取得関数を置く層です。

- `Product` 型でデータ形状を定義
- `fetchProducts` で取得処理を集約
- 一般的には、将来この関数内を外部API呼び出しに差し替える

## 一般的な記述ルール（迷わないための型）

1. 1ファイル1責務を守る

- page: 初期表示
- component: 操作と表示
- route: API入口
- lib: 共通ロジックとデータ取得

2. ファイル内の記述順を固定する

- import
- 型定義
- 定数
- コンポーネント本体
- 補助関数

3. stateは最小限にする

- 計算で出せる値はstateに持たない
- 例: 絞り込み後の一覧は、元データと入力値から導出する

4. 命名を役割で統一する

- `fetchXxx`: 取得処理
- `selectedXxx`: 選択中の値
- `isXxx`: 真偽値
- `errorMessage`: UI表示用エラー

5. 分割の目安を決める

- JSXが長い
- `map` の中の表示が重い
- 同じUIが複数回出る

上のいずれかに当てはまったら、コンポーネント分割を検討すると保守しやすくなります。
