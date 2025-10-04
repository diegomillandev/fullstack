import AppLayout from "@/components/layouts/app-layout";
import { ReactElement } from "react";

export default function ReportsPage() {
  return <div>ReportsPage</div>;
}

ReportsPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
