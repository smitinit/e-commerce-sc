import { Outlet } from "react-router-dom";
import { UserProvider } from "@/providers/user-provider";
import { ThemeProvider } from "@/providers/theme-provider";

// parent of app to provide the theme and user context
export default function AppRoot() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </ThemeProvider>
  );
}
