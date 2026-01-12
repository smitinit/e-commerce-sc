import { useUser } from "@/hooks/use-user";
import { ThemeToggle } from "./theme-toggle";

import { ShoppingCart } from "./ShoppingCart";
import { UserMenu } from "./UserMenu";

export function AppNavbar() {
  const { user } = useUser();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between gap-1 px-4 py-2 lg:gap-2 lg:px-6 ">
        <h1 className="text-base ">
          Hey <span className="text-primary italic">{user?.username}</span>,
          Welcome back.
        </h1>

        <div className=" flex items-center gap-2">
          <ShoppingCart />
          <UserMenu />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
