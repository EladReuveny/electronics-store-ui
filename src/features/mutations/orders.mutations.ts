import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ordersApi } from "../../api/orders.api";
import type { Status } from "../../types/order.types";
import { handleError } from "../../utils/utils";
import { ordersKeys } from "../keys/orders.keys";

export const ordersMutations = {
  useUpdateOrderStatus: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        orderId,
        newStatus,
      }: {
        orderId: number;
        newStatus: Status;
      }) => ordersApi.updateOrderStatus(orderId, newStatus),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ordersKeys.all }),
      onError: (err) => handleError(err),
    });
  },
  useCancelOrder: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (orderId: number) => ordersApi.cancelOrder(orderId),
      onSuccess: () => {
        toast.success("Order canceled successfully");
        queryClient.invalidateQueries({ queryKey: ordersKeys.all });
      },
      onError: (err) => handleError(err),
    });
  },
};
