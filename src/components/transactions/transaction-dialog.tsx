import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { TransactionForm } from "./transaction-form";
import { useSession } from "@/lib/auth-client";

export function TransactionDialog() {
  const { data: session } = useSession();

  if (session?.user.role !== "ADMIN") return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"Add Transaction"}</DialogTitle>
          <DialogDescription>
            {"Create a new income or expense transaction"}
          </DialogDescription>
          <TransactionForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
