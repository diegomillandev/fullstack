import { NavItem } from "@/types/auth";

export const navItems: NavItem[] = [
  {
    title: "Transactions",
    href: "/transactions",
    requiredRole: "USER",
    isActive: true,
  },
  {
    title: "User Management",
    href: "/users",
    requiredRole: "ADMIN",
    isActive: false,
  },
  {
    title: "Reports",
    href: "/reports",
    requiredRole: "ADMIN",
    isActive: false,
  },
];
