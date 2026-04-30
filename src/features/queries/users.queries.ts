import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../../api/users.api";
import { usersKeys } from "../keys/users.keys";

export const usersQueries = {
  useGetAllUsers: () =>
    useQuery({
      queryKey: usersKeys.all,
      queryFn: usersApi.getAllUsers,
    }),
  useGetUserById: (userId: number) =>
    useQuery({
      queryKey: usersKeys.detail(userId),
      queryFn: () => usersApi.getUserById(userId),
      enabled: !!userId,
    }),
};
