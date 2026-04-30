import type { Product } from "./product.types";
import type { User } from "./user.types";

export type WishList = {
  id: number;
  user: User;
  products: Product[];
};
