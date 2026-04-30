import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "../../api/products.api";
import type { Product, ProductUpdateDto } from "../../types/product.types";
import { handleError } from "../../utils/utils";
import { productsKeys } from "../keys/products.keys";

export const productsMutations = {
  useAddProduct: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (product: Product) => productsApi.addProduct(product),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: productsKeys.all }),
      onError: (err) => handleError(err),
    });
  },
  useUpdateProduct: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        productId,
        productUpdateDto,
      }: {
        productId: number;
        productUpdateDto: ProductUpdateDto;
      }) => productsApi.updateProduct(productId, productUpdateDto),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: productsKeys.all });
      },
      onError: (err) => handleError(err),
    });
  },
  useDeleteProductById: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (productId: number) =>
        productsApi.deleteProductById(productId),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: productsKeys.all }),
      onError: (err) => handleError(err),
    });
  },
  useRemoveSelectedProducts: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (productIds: number[]) =>
        productsApi.removeSelectedProducts(productIds),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: productsKeys.all }),
      onError: (err) => handleError(err),
    });
  },
};
