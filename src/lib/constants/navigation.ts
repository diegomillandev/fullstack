import { NavItem } from "@/types/auth";

export const navItems: NavItem[] = [
  {
    title: "Movement Management",
    href: "/movements",
    requiredRole: "USER",
  },
  {
    title: "User Management",
    href: "/users",
    requiredRole: "ADMIN",
  },
  {
    title: "Reports",
    href: "/reports",
    requiredRole: "ADMIN",
  },
];
