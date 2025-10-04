export const hasRequiredPermission = (
  userRole: "ADMIN" | "USER" | undefined,
  requiredRole: "ADMIN" | "USER" | null
): boolean => {
  if (requiredRole === "USER") {
    return true;
  }
  if (requiredRole === "ADMIN" && userRole === "ADMIN") {
    return true;
  }
  return false;
};
