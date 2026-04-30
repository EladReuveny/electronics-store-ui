import { useMutation, useQueryClient } from "@tanstack/react-query";
import { wishListsApi } from "../../api/wish-lists.api";
import { handleError } from "../../utils/utils";
import { shoppingCartsKeys } from "../keys/shopping-carts.keys";
import { wishListsKeys } from "../keys/wish-lists.keys";

export const wishListsMutations = {
  useAddProductToWishList: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        userId,
        productId,
      }: {
        userId: number;
        productId: number;
      }) => wishListsApi.addProductToWishList(userId, productId),
      onSuccess: (_, { userId }) =>
        queryClient.invalidateQueries({
          queryKey: wishListsKeys.byUserId(userId),
        }),
      onError: (err) => handleError(err),
    });
  },
  useRemoveProductFromWishList: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        userId,
        productId,
      }: {
        userId: number;
        productId: number;
      }) => wishListsApi.removeProductFromWishList(userId, productId),
      onSuccess: (_, { userId }) =>
        queryClient.invalidateQueries({
          queryKey: wishListsKeys.byUserId(userId),
        }),
      onError: (err) => handleError(err),
    });
  },
  useMoveToShoppingCart: () => {
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
      }) => wishListsApi.moveToShoppingCart(userId, productId, quantity),
      onSuccess: (_, { userId }) => {
        queryClient.invalidateQueries({
          queryKey: wishListsKeys.byUserId(userId),
        });
        queryClient.invalidateQueries({
          queryKey: shoppingCartsKeys.byUserId(userId),
        });
      },
      onError: (err) => handleError(err),
    });
  },
  useClearWishList: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (userId: number) => wishListsApi.clearWishList(userId),
      onSuccess: (_, userId) =>
        queryClient.invalidateQueries({
          queryKey: wishListsKeys.byUserId(userId),
        }),
      onError: (err) => handleError(err),
    });
  },
};
