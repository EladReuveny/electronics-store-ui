import type { Order } from "../types/order.types";
import type { ShoppingCart } from "../types/shopping-cart.types";
import { api } from "./api.config";

const RESOURCE_PREFIX = "shopping-carts";

export const shoppingCartsApi = {
  getCartByUserId: async (userId: number): Promise<ShoppingCart> => {
    const { data } = await api.get(`${RESOURCE_PREFIX}/user/${userId}`);
    return data;
  },
  addProductToCart: async (
    userId: number,
    productId: number,
    quantity = 1,
  ): Promise<ShoppingCart> => {
    const { data } = await api.post(
      `${RESOURCE_PREFIX}/user/${userId}/add-product/${productId}`,
      null,
      {
        params: { quantity },
      },
    );
    return data;
  },
  removeProductFromCart: async (
    userId: number,
    productId: number,
  ): Promise<ShoppingCart> => {
    const { data } = await api.delete(
      `${RESOURCE_PREFIX}/user/${userId}/remove-product/${productId}`,
    );
    return data;
  },
  clearCart: async (userId: number): Promise<ShoppingCart> => {
    const { data } = await api.put(
      `${RESOURCE_PREFIX}/user/${userId}/clear-cart`,
    );
    return data;
  },
  checkout: async (userId: number): Promise<Order> => {
    const { data } = await api.post(
      `${RESOURCE_PREFIX}/user/${userId}/checkout`,
    );
    return data;
  },
};
