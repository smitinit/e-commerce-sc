import { Outlet } from "react-router-dom";
import { UserProvider } from "@/providers/user-provider";
import { ThemeProvider } from "@/providers/theme-provider";

export function AppRoot() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </ThemeProvider>
  );
}
