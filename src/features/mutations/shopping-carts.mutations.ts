import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shoppingCartsApi } from "../../api/shopping-carts.api";
import { handleError } from "../../utils/utils";
import { ordersKeys } from "../keys/orders.keys";
import { productsKeys } from "../keys/products.keys";
import { shoppingCartsKeys } from "../keys/shopping-carts.keys";
import { wishListsKeys } from "../keys/wish-lists.keys";

export const shoppingCartsMutations = {
  useAddProductToCart: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        userId,
        productId,
        quantity,
      }: {
        userId: number;
        productId: number;
        quantity?: number;
      }) => shoppingCartsApi.addProductToCart(userId, productId, quantity),
      onSuccess: (_, { userId }) => {
        queryClient.invalidateQueries({
          queryKey: shoppingCartsKeys.byUserId(userId),
        });
        queryClient.invalidateQueries({
          queryKey: wishListsKeys.byUserId(userId),
        });
      },
      onError: (err) => handleError(err),
    });
  },
  useRemoveProductFromCart: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        userId,
        productId,
      }: {
        userId: number;
        productId: number;
      }) => shoppingCartsApi.removeProductFromCart(userId, productId),
      onSuccess: (_, { userId, productId }) => {
        queryClient.invalidateQueries({
          queryKey: shoppingCartsKeys.byUserId(userId),
        });
        queryClient.invalidateQueries({
          queryKey: productsKeys.detail(productId),
        });
      },

      onError: (err) => handleError(err),
    });
  },
  useClearCart: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (userId: number) => shoppingCartsApi.clearCart(userId),
      onSuccess: (_, userId) =>
        queryClient.invalidateQueries({
          queryKey: shoppingCartsKeys.byUserId(userId),
        }),
      onError: (err) => handleError(err),
    });
  },
  useCheckout: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (userId: number) => shoppingCartsApi.checkout(userId),
      onSuccess: (_, userId) => {
        queryClient.invalidateQueries({
          queryKey: shoppingCartsKeys.byUserId(userId),
        });
        queryClient.invalidateQueries({ queryKey: ordersKeys.all });
      },
      onError: (err) => handleError(err),
    });
  },
};
