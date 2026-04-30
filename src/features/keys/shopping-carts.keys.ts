export const shoppingCartsKeys = {
  all: ["shopping-carts"],
  byUserId: (userId: number) => [...shoppingCartsKeys.all, "users", userId],
} as const;
