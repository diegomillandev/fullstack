import AppLayout from "@/components/layouts/app-layout";
import { ReactElement } from "react";

export default function UsersPage() {
  return <div>UsersPage</div>;
}

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
