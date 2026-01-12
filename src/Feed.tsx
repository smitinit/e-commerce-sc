import { AppNavbar } from "@/components/app-navbar";
import { Outlet } from "react-router-dom";

export default function Feed() {
  return (
    <main>
      <AppNavbar />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}
