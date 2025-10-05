import AppLayout from "@/components/layouts/app-layout";
import { ListUsers } from "@/components/users/list-users";
import { ReactElement } from "react";

export default function UsersPage() {
  return (
    <div>
      <ListUsers />
    </div>
  );
}

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
