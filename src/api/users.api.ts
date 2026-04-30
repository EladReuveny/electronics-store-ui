import type {
  CreateUserDto,
  User,
  UserForgotPasswordDto,
  UserLoginDto,
  UserUpdateDto,
} from "../types/user.types";
import { api } from "./api.config";

const RESOURCE_PREFIX = "users";

export const usersApi = {
  getAllUsers: async (): Promise<User[]> => {
    const { data } = await api.get(`${RESOURCE_PREFIX}`);
    return data;
  },
  getUserById: async (id: number): Promise<User> => {
    const { data } = await api.get(`${RESOURCE_PREFIX}/${id}`);
    return data;
  },
  registerUser: async (createUserDto: CreateUserDto): Promise<User> => {
    const { data } = await api.post(
      `${RESOURCE_PREFIX}/register`,
      createUserDto,
    );
    return data;
  },
  loginUser: async (loginUserDto: UserLoginDto): Promise<User> => {
    const { data } = await api.post(`${RESOURCE_PREFIX}/login`, loginUserDto);
    return data;
  },
  updateUser: async (
    userId: number,
    updateUserDto: UserUpdateDto,
  ): Promise<User> => {
    const { data } = await api.put(
      `${RESOURCE_PREFIX}/${userId}/update`,
      updateUserDto,
    );
    return data;
  },
  deleteUser: async (userId: number): Promise<void> => {
    await api.delete(`${RESOURCE_PREFIX}/${userId}/delete`);
  },
  forgotPassword: async (
    userForgotPasswordDto: UserForgotPasswordDto,
  ): Promise<User> => {
    const { data } = await api.post(
      `${RESOURCE_PREFIX}/forgot-password`,
      userForgotPasswordDto,
    );
    return data;
  },
};
