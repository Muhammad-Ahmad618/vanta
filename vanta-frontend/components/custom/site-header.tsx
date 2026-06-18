import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { SearchInput } from "./search-input";

export function SiteHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 px-4 lg:px-6 transition-all">
      <div className="flex w-full items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-2 min-w-fit">
          <SidebarTrigger className="-ml-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white" />
          <Separator orientation="vertical" className="mx-2 h-4" />
          <h1 className="text-base font-semibold tracking-tight">Dashboard</h1>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md hidden md:flex items-center justify-center">
          <SearchInput />
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end min-w-fit">
          <NavUser
            user={{
              name: "Admin",
              email: "admin@vanta.com",
              avatar: "/avatars/shadcn.jpg",
            }}
          />
        </div>
      </div>
    </header>
  );
}
