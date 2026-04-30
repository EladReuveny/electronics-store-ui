import type { Item } from "./item.types";
import type { User } from "./user.types";

export type Order = {
  id: number;
  orderDate: Date;
  totalAmount: number;
  status: Status;
  items: Item[];
  user: User;
};

export type Status =
  | "PENDING"
  | "PACKAGING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELED";
