export const ordersKeys = {
  all: ["orders"],
  byUserId: (userId: number) => [...ordersKeys.all, "users", userId],
  asXML: () => [...ordersKeys.all, "xml-format"],
} as const;
