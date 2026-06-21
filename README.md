# Next.js Learning With Spring Boot

フロントエンド未経験の人が、Next.jsの基礎概念とSpring Boot連携の考え方を一緒に学ぶためのサンプルです。

このリポジトリでは次の3つをまとめて確認できます。

- Next.jsの基本概念
- Server ComponentとClient Componentの違い
- Spring Boot APIとつなぐときの考え方

## このプロジェクトで学べること

### 1. フロントエンドの役割

フロントエンドの主な責務は次の3つです。

1. 画面を表示する
2. ユーザー操作を受け取る
3. APIからデータを取得して表示や更新を行う

Spring Bootが業務ロジックやDBアクセスを担うのに対し、Next.jsは画面と画面単位の制御を担います。

### 2. Next.jsの全体像

Next.jsはReactベースのフレームワークです。React単体で必要になる周辺機能を、実務で使いやすい形にまとめています。

- ルーティング
- サーバーサイド描画
- クライアントサイド描画
- データ取得
- API Route
- レイアウト管理

### 3. Spring Bootとの役割分担

よくある構成は次の2パターンです。

#### パターンA: 完全分離

- Next.js: 画面
- Spring Boot: API
- ブラウザから直接Spring Boot APIを呼ぶ

#### パターンB: BFF寄り

- Next.js: 画面 + 中継処理
- Spring Boot: 業務API
- ブラウザはNext.jsにアクセスし、Next.jsがSpring Bootを呼ぶ

認証、CORS、ヘッダー制御、レスポンス整形をまとめたいならパターンBが扱いやすいです。

## 最初に押さえる概念

### HTML

画面の骨組みです。見出し、ボタン、入力欄、表などの意味を持った要素を置きます。

### CSS

見た目を整えます。余白、色、横並び、レスポンシブ対応を扱います。

### JavaScript

クリック時の処理やAPI呼び出しなど、画面の動きを作ります。

### Reactのstate

Reactでは、値が変わると再描画されます。画面を直接書き換えるのではなく、状態を変えることでUIを更新するのが基本です。

### データ取得

フロントエンド開発では、APIからJSONを受け取って一覧や詳細に表示する処理が非常に多いです。

## このサンプルの構成

### トップページ

- 概念説明を表示
- Server Componentで初期データを表示
- Client Componentで検索やフィルタを操作

### API Route

- /api/products を用意
- 実務ではここからSpring Boot APIを呼ぶ想定

### サンプルデータ

- 商品一覧のダミーデータを保持
- 画面表示とAPIレスポンスの両方で利用

## 実装の見どころ

### Server Component

トップページはasync関数として定義し、サーバー側で商品一覧を取得してから描画しています。

用途:

- 初期表示を早くしたい
- SEOを考慮したい
- 機密情報をブラウザに渡したくない

### Client Component

プレイグラウンド部分はuse clientを付けたClient Componentです。

用途:

- 入力フォーム
- ボタンクリック
- ローカル状態管理
- ブラウザイベント処理

### API Route

Next.jsのRoute Handlerを使うと、フロントエンド内に軽いサーバー処理を持てます。

これにより、ブラウザから直接Spring Bootを呼ばずに、次のような構成にできます。

ブラウザ → Next.js Route Handler → Spring Boot API

## Spring Boot連携のサンプルコード

実務ではRoute Handler内で外部APIを呼ぶことがあります。

```ts
export async function GET() {
	const response = await fetch("http://localhost:8080/api/products", {
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-store",
	});

	if (!response.ok) {
		return Response.json({ message: "failed" }, { status: 500 });
	}

	const data = await response.json();
	return Response.json(data);
}
```

Spring Boot側のイメージは次のようになります。

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {

		@GetMapping
		public List<ProductResponse> findAll() {
				return List.of(
						new ProductResponse(1L, "Analytics Dashboard", 12800),
						new ProductResponse(2L, "Order Sync API", 18400)
				);
		}
}
```

## おすすめの学習順

1. HTML/CSSの基本を押さえる
2. JavaScriptの非同期処理とfetchを学ぶ
3. Reactのpropsとstateを理解する
4. Next.jsのApp Routerを触る
5. Spring Boot APIにつないで一覧・登録画面を作る

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

## 検証コマンド

```bash
npm run lint
npm run build
```

## 次に作ると良い課題

1. 商品詳細ページを追加する
2. 登録フォームを追加する
3. Spring Boot APIに差し替える
4. 認証付き画面にする
5. エラーハンドリングを強化する
