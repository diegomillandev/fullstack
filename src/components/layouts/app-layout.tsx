import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { ArrowRightFromLine, MoreHorizontal } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { LoadingPage } from "../shared/loading-page";

const ADMIN_ROUTES = ["/reports", "/users"];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (isPending) return;

    const isAdminRoute = ADMIN_ROUTES.some((route) =>
      pathname.startsWith(route)
    );
    const userRole = session?.user?.role;

    if (isAdminRoute && userRole !== "ADMIN") {
      toast.error("You do not have access to this page");
      router.replace("/");
      setAuthorized(false);
      return;
    }

    setAuthorized(true);
  }, [isPending, session, pathname, router]);

  if (isPending) {
    return <LoadingPage />;
  }

  if (!authorized) {
    return <LoadingPage />;
  }

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="data-[state=open]:bg-accent h-10 w-10 cursor-pointer"
              >
                <MoreHorizontal size={36} />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-56 overflow-hidden rounded-lg p-1"
              align="end"
            >
              <Button
                variant="ghost"
                className="w-full rounded-none cursor-pointer flex justify-between"
                onClick={handleSignOut}
              >
                Log Out
                <ArrowRightFromLine className="" />
              </Button>
            </PopoverContent>
          </Popover>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
