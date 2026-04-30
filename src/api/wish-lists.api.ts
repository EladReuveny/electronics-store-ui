import type { WishList } from "../types/wish-list.types";
import { api } from "./api.config";

const RESOURCE_PREFIX = "wish-lists";

export const wishListsApi = {
  getWishListByUserId: async (userId: number): Promise<WishList> => {
    const { data } = await api.get(`${RESOURCE_PREFIX}/user/${userId}`);
    return data;
  },
  addProductToWishList: async (
    userId: number,
    productId: number,
  ): Promise<WishList> => {
    const { data } = await api.post(
      `${RESOURCE_PREFIX}/user/${userId}/add-product/${productId}`,
    );
    return data;
  },
  removeProductFromWishList: async (
    userId: number,
    productId: number,
  ): Promise<WishList> => {
    const { data } = await api.delete(
      `${RESOURCE_PREFIX}/user/${userId}/remove-product/${productId}`,
    );
    return data;
  },
  moveToShoppingCart: async (
    userId: number,
    productId: number,
    quantity = 1,
  ): Promise<WishList> => {
    const { data } = await api.post(
      `${RESOURCE_PREFIX}/user/${userId}/move-to-cart/${productId}`,
      null,
      {
        params: { quantity },
      },
    );
    return data;
  },
  clearWishList: async (userId: number): Promise<WishList> => {
    const { data } = await api.put(
      `${RESOURCE_PREFIX}/user/${userId}/clear-wishlist`,
    );
    return data;
  },
};
