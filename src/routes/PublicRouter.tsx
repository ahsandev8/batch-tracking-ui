import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

const PublicRoute = () => {
  const location = useLocation();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // Replace with your authentication check logic

  if (isAuthenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
};

export default PublicRoute;
