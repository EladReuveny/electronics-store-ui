import type { Order } from "./order.types";
import type { Product } from "./product.types";
import type { ShoppingCart } from "./shopping-cart.types";

export type Item = {
  id: number;
  quantity: number;
  product: Product;
  shoppingCart: ShoppingCart;
  order: Order;
};
