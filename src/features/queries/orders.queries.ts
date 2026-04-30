import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "../../api/orders.api";
import { ordersKeys } from "../keys/orders.keys";

export const ordersQueries = {
  useGetOrdersByUserId: (userId: number) =>
    useQuery({
      queryKey: ordersKeys.byUserId(userId),
      queryFn: () => ordersApi.getOrdersByUserId(userId),
    }),
  useGetAllOrders: () =>
    useQuery({
      queryKey: ordersKeys.all,
      queryFn: () => ordersApi.getAllOrders(),
    }),
  useGetAllOrdersAsXML: () =>
    useQuery({
      queryKey: ordersKeys.asXML(),
      queryFn: () => ordersApi.getAllOrdersAsXML(),
    }),
};
