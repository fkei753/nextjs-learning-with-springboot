import { NextResponse } from "next/server";

import { fetchProducts } from "@/lib/sample-data";

export async function GET() {
  const products = await fetchProducts();

  return NextResponse.json({
    source: "nextjs-route-handler",
    products,
  });
}