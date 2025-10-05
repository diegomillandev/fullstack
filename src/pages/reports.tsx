import AppLayout from "@/components/layouts/app-layout";
import InformeTransacciones from "@/components/reports/reports";
import { ReactElement } from "react";

export default function ReportsPage() {
  return (
    <>
      <InformeTransacciones />
    </>
  );
}

ReportsPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
