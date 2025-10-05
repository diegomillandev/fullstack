import { LoadingPage } from "@/components/shared/loading-page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { NavCardItem } from "@/types/auth";
import { hasRequiredPermission } from "@/utils";
import {
  BadgeDollarSign,
  BarChart3,
  Menu,
  PiggyBank,
  Users,
} from "lucide-react";
import Link from "next/link";
import { navItems } from "@/lib/constants/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const navCardItems: NavCardItem[] = [
  {
    title: "Transactions",
    description: "Track and manage all income and expenses across users.",
    href: "/transactions",
    requiredRole: "USER",
    icon: PiggyBank,
  },
  {
    title: "User Management",
    description: "View and edit user accounts and assign roles.",
    href: "/users",
    requiredRole: "ADMIN",
    icon: Users,
  },
  {
    title: "Financial Reports",
    description: "Generate and download financial summaries and charts.",
    href: "/reports",
    requiredRole: "ADMIN",
    icon: BarChart3,
  },
];

export default function Home() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <LoadingPage />;
  }

  const filteredNavItems = navItems.filter((item) =>
    hasRequiredPermission(session?.user.role, item.requiredRole)
  );

  const filteredItems = navCardItems.filter((item) =>
    hasRequiredPermission(session?.user.role, item.requiredRole)
  );
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <BadgeDollarSign className="size-5" />
          </div>
          <div className="grid flex-1 text-left text-xl leading-tight">
            <span className="truncate font-bold">FinTrack.</span>
          </div>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="items-center gap-3 text-sm font-medium hidden md:flex">
            {filteredNavItems.map((item) => (
              <Button key={item.title} asChild variant="ghost">
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-red-900 dark:text-gray-400 dark:hover:text-white"
                >
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger className="md:hidden">
              <Button variant="ghost" className="px-3">
                <Menu className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-1">
              {filteredNavItems.map((item) => (
                <DropdownMenuItem key={item.title} asChild>
                  <Link href={item.href}>{item.title}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Welcome to FinTrack
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Manage your finances efficiently with FinTrack. Navigate to the
            desired section using the menu above.
          </p>
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Available Sections
            </h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Link key={item.href} href={item.href} className="group">
                  <Card className="h-full transition-all duration-300 hover:shadow-xl hover:border">
                    <CardHeader className="p-6">
                      {/* Ícono */}
                      <div className="flex mx-auto items-center justify-center bg-primary/10 text-primary rounded-md w-10 h-10 mb-4">
                        <item.icon className="h-6 w-6" />
                      </div>

                      {/* Título y Descripción */}
                      <CardTitle className="text-lg text-center">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="mt-1 text-center">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
