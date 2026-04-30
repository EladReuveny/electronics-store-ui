import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../../api/products.api";
import type { Category } from "../../types/product.types";
import { productsKeys } from "../keys/products.keys";

export const productsQueries = {
  useGetProductById: (productId: number) =>
    useQuery({
      queryKey: productsKeys.detail(productId),
      queryFn: () => productsApi.getProductById(productId),
      enabled: !!productId,
    }),
  useGetAllProducts: () =>
    useQuery({
      queryKey: productsKeys.all,
      queryFn: () => productsApi.getAllProducts(),
    }),
  useSearchProductsByName: (query: string) =>
    useQuery({
      queryKey: productsKeys.search(query),
      queryFn: () => productsApi.searchProductsByName(query),
      enabled: !!query,
    }),
  useGetProductsByCategory: (category: Category) =>
    useQuery({
      queryKey: productsKeys.category(category),
      queryFn: () => productsApi.getProductsByCategory(category),
    }),
};
