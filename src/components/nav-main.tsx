import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navItems } from "@/lib/constants/navigation";
import { useSession } from "@/lib/auth-client";
import { hasRequiredPermission } from "@/utils";
import Link from "next/link";

export function NavMain() {
  const { data: session } = useSession();

  const filteredNavItems = navItems.filter((item) =>
    hasRequiredPermission(session?.user.role, item.requiredRole)
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-bold">
        Platform
      </SidebarGroupLabel>
      <SidebarMenu>
        {filteredNavItems.map((item) => (
          <Collapsible key={item.title} asChild>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
