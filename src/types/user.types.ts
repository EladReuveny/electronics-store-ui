import type { Order } from "./order.types";
import type { ShoppingCart } from "./shopping-cart.types";
import type { WishList } from "./wish-list.types";

export type User = {
  id: number;
  email: string;
  password: string;
  address: string;
  phone: string;
  role: Role;
  wishList: WishList;
  shoppingCart: ShoppingCart;
  orders: Order[];
};

type Role = "CUSTOMER" | "SUBSCRIBED" | "ADMIN";

export type UserLoginDto = Pick<User, "email" | "password">;

export type CreateUserDto = Pick<
  User,
  "email" | "password" | "address" | "phone"
>;

export type UserUpdateDto = {
  newEmail: string;
  currentPassword: string;
  newPassword: string;
  newAddress: string;
  newPhone: string;
};

export type UserForgotPasswordDto = Pick<User, "email" | "address" | "phone">;
