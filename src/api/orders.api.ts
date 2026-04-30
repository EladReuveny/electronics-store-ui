import type { Order, Status } from "../types/order.types";
import { api } from "./api.config";

const RESOURCE_PREFIX = "orders";

export const ordersApi = {
  getOrdersByUserId: async (userId: number): Promise<Order[]> => {
    const { data } = await api.get(`${RESOURCE_PREFIX}/user/${userId}`);
    return data;
  },
  getAllOrders: async (): Promise<Order[]> => {
    const { data } = await api.get(`${RESOURCE_PREFIX}`);
    return data;
  },
  getAllOrdersAsXML: async (): Promise<string> => {
    const { data } = await api.get(`${RESOURCE_PREFIX}/all/xml-format`);
    return data;
  },
  updateOrderStatus: async (
    orderId: number,
    newStatus: Status,
  ): Promise<Order> => {
    const { data } = await api.put(`${RESOURCE_PREFIX}/${orderId}`, newStatus);
    return data;
  },
  cancelOrder: async (orderId: number): Promise<void> => {
    await api.delete(`${RESOURCE_PREFIX}/${orderId}`);
  },
};
