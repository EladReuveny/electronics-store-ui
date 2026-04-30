import type { Category } from "../../types/product.types";

export const productsKeys = {
  all: ["products"],
  detail: (productId: number) => [...productsKeys.all, productId],
  search: (query: string) => [...productsKeys.all, "search", query],
  category: (category: Category) => [...productsKeys.all, category],
} as const;
