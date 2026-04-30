import type { Item } from "./item.types";
import type { WishList } from "./wish-list.types";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  stockQuantity: number;
  category: Category;
  items: Item[];
  wishLists: WishList[];
};

export type Category = "SMART_PHONE" | "TABLET" | "LAPTOP" | "TV";

export type ProductUpdateDto = Pick<
  Product,
  "name" | "description" | "price" | "imgUrl" | "stockQuantity" | "category"
>;
