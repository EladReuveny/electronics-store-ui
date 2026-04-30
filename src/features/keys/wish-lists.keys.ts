export const wishListsKeys = {
  all: ["wish-lists"],
  byUserId: (userId: number) => [...wishListsKeys.all, "users", userId],
} as const;
