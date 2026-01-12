import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";

import AppRoot from "./components/AppRoot.tsx";
import Feed from "./Feed.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

import { Login } from "./components/Login.tsx";
import { Register } from "./components/Register.tsx";
import { UserProfile } from "./components/UserProfile.tsx";

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
            path: "/",
            element: <Feed />,
            children: [
              {
                path: "profile",
                element: <UserProfile />,
              },
            ],
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
