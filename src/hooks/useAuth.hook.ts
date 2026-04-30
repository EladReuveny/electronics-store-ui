import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
};
