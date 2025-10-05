import AppLayout from "@/components/layouts/app-layout";
import { ListTransaction } from "@/components/transactions/list-transaction";
import { TransactionDialog } from "@/components/transactions/transaction-dialog";
import { ReactElement } from "react";

export default function TransactionsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">
            Manage your income and expenses
          </p>
        </div>
        <TransactionDialog />
      </div>
      <ListTransaction />
    </div>
  );
}

TransactionsPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
