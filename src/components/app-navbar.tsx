import { useUser } from "@/hooks/use-user";
import { ThemeToggle } from "./theme-toggle";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AppNavbar() {
  const navigate = useNavigate();

  const { user, logout } = useUser();

  function handleLogOut() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 py-2 lg:gap-2 lg:px-6 ">
        <h1 className="text-base ">
          Hey <span className="text-primary italic">{user?.username}</span>,
          Welcome back.
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <LogoutButton handleLogout={handleLogOut} />
        </div>
      </div>
    </header>
  );
}
function LogoutButton({ handleLogout }: { handleLogout: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to get logged out?</AlertDialogTitle>
          <AlertDialogDescription>Continue to Log out.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant={"destructive"} asChild>
            <AlertDialogAction onClick={handleLogout}>
              Yes, Continue
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
