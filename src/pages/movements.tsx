import AppLayout from "@/components/layouts/app-layout";
import { ReactElement } from "react";

export default function Movements() {
  return <div>MovementsPage</div>;
}

Movements.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
