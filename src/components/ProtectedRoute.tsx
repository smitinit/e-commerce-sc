import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/hooks/use-user";

const ProtectedRoute = () => {
  const { user } = useUser();

  // check for both user and its isLoggedIn property
  if (!user || !user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
