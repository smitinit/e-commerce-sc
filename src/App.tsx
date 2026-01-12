import { AppNavbar } from "@/components/app-navbar";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("products", { replace: true });
  }, [navigate]);

  return (
    <main>
      <AppNavbar />
      <div className="flex flex-col p-4">
        <Outlet />
      </div>
    </main>
  );
}
