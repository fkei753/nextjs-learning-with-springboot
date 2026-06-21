export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
};

const products: Product[] = [
  {
    id: 101,
    name: "Analytics Dashboard",
    category: "UI",
    description: "売上やKPIの可視化に向く管理画面テンプレート。",
    price: 12800,
  },
  {
    id: 102,
    name: "Order Sync API",
    category: "Integration",
    description: "Spring Bootの受注APIと接続する中継用モジュールのイメージ。",
    price: 18400,
  },
  {
    id: 103,
    name: "Member Portal",
    category: "UI",
    description: "認証後のマイページやプロフィール編集画面を想定。",
    price: 9600,
  },
  {
    id: 104,
    name: "Batch Monitor",
    category: "Operations",
    description: "夜間バッチの実行状況を監視する運用向けビュー。",
    price: 15400,
  },
  {
    id: 105,
    name: "Inventory Console",
    category: "Operations",
    description: "在庫引当と更新を扱う内部システム向けの操作パネル。",
    price: 14100,
  },
];

export async function fetchProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 120));
  return products;
}