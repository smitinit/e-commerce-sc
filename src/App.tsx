import { AppNavbar } from "@/components/app-navbar";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import store from "./store/cart";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("products", { replace: true });
  }, [navigate]);

  return (
    <Provider store={store}>
      <main>
        <AppNavbar />
        <div className="flex flex-col p-4">
          <Outlet />
        </div>
      </main>
    </Provider>
  );
}
