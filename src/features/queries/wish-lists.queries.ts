import { useQuery } from "@tanstack/react-query";
import { wishListsApi } from "../../api/wish-lists.api";
import { wishListsKeys } from "../keys/wish-lists.keys";

export const wishListsQueries = {
  useGetWishListByUserId: (userId: number) =>
    useQuery({
      queryKey: wishListsKeys.byUserId(userId),
      queryFn: () => wishListsApi.getWishListByUserId(userId),
      enabled: !!userId,
    }),
};
