import { Navigate, Outlet, useLocation } from "react-router";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/auth.store";

type ProtectedLayoutProps = {};

const ProtectedLayout = ({}: ProtectedLayoutProps) => {
  const user = useAuthStore((state) => state.user);

  const location = useLocation();

  if (!user) {
    toast.info("You need to be logged in to access this page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
