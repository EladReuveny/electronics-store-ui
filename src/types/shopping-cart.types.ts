import type { Item } from "./item.types";
import type { User } from "./user.types";

export type ShoppingCart = {
  id: number;
  totalAmount: number;
  user: User;
  items: Item[];
};
