import { useQuery } from "@tanstack/react-query";
import { shoppingCartsApi } from "../../api/shopping-carts.api";
import { shoppingCartsKeys } from "../keys/shopping-carts.keys";

export const shoppingCartsQueries = {
  useGetCartByUserId: (userId: number) =>
    useQuery({
      queryKey: shoppingCartsKeys.byUserId(userId),
      queryFn: () => shoppingCartsApi.getCartByUserId(userId),
      enabled: !!userId,
    }),
};
