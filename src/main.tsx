import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";

import App from "./App.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

import { Login } from "./components/Login.tsx";
import { AppRoot } from "./components/AppRoot.tsx";
import { Register } from "./components/Register.tsx";

export const router = createBrowserRouter([
  {
    element: <AppRoot />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <App />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
