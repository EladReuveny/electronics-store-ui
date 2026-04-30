import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { usersApi } from "../../api/users.api";
import { useAuthStore } from "../../store/auth.store";
import type {
  CreateUserDto,
  User,
  UserForgotPasswordDto,
  UserLoginDto,
  UserUpdateDto,
} from "../../types/user.types";
import { handleError } from "../../utils/utils";
import { usersKeys } from "../keys/users.keys";

export const usersMutations = {
  useRegisterUser: () => {
    const queryClient = useQueryClient();

    const login = useAuthStore((state) => state.actions.login);

    const navigate = useNavigate();
    const location = useLocation();

    return useMutation({
      mutationFn: (createUserDto: CreateUserDto) =>
        usersApi.registerUser(createUserDto),
      onSuccess: (data: User) => {
        login(data);
        navigate(location.state?.from ?? "/profile");
        queryClient.invalidateQueries({ queryKey: usersKeys.all });
      },
      onError: (err) => handleError(err),
    });
  },
  useLoginUser: () => {
    const login = useAuthStore((state) => state.actions.login);

    const navigate = useNavigate();
    const location = useLocation();

    return useMutation({
      mutationFn: (loginUserDto: UserLoginDto) =>
        usersApi.loginUser(loginUserDto),
      onSuccess: (data: User) => {
        login(data);
        navigate(location.state?.from ?? "/profile");
      },
      onError: (err) => handleError(err),
    });
  },
  useUpdateUser: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        userId,
        updateUserDto,
      }: {
        userId: number;
        updateUserDto: UserUpdateDto;
      }) => usersApi.updateUser(userId, updateUserDto),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: usersKeys.all });
      },
      onError: (err) => handleError(err),
    });
  },
  useDeleteUser: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (userId: number) => usersApi.deleteUser(userId),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: usersKeys.all }),
      onError: (err) => handleError(err),
    });
  },
  useForgotPassword: () =>
    useMutation({
      mutationFn: (dto: UserForgotPasswordDto) => usersApi.forgotPassword(dto),

      onError: (err) => handleError(err),
    }),
};
