export const usersKeys = {
  all: ["users"],
  detail: (userId: number) => [...usersKeys.all, userId],
} as const;
