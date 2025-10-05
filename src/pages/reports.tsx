import AppLayout from "@/components/layouts/app-layout";
import { Reports } from "@/components/reports/reports";
import { ReactElement } from "react";

export default function ReportsPage() {
  return (
    <>
      <Reports />
    </>
  );
}

ReportsPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
