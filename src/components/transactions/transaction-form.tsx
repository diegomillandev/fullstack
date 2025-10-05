import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionInputs } from "@/schemas/transactions";
import { TransactionInput } from "@/types/transactions";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

export function TransactionForm() {
  const { data: session } = useSession();
  const { register, control, handleSubmit, reset } = useForm({
    resolver: zodResolver(transactionInputs),
  });

  const onSubmit = async (data: TransactionInput) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/transactions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: data.type,
            amount: Number(data.amount),
            concept: data.concept,
            date: data.date,
            user_id: session?.user.id,
          }),
        }
      );

      if (!response.ok) {
        toast.error("Failed to create transaction");
        console.log(response);
        return;
      }

      toast.success("Transaction created successfully");
      reset();
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast.error("An error occurred while creating the transaction");
    }
  };

  return (
    <form
      className="flex flex-col gap-4 mt-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <>
              <Label htmlFor="type">Type</Label>
              <Select
                onValueChange={field.onChange}
                value={field.value ?? "INCOME"}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INCOME">Income</SelectItem>
                  <SelectItem value="EXPENSE">Expense</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          {...register("amount")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="concept">Concept</Label>
        <Textarea
          id="concept"
          placeholder="Enter transaction details"
          required
          className="resize-none"
          {...register("concept")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" {...register("date")} required />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="submit">
          {/* {loading ? "Saving..." : transaction ? "Update" : "Create"} */}
          Crate
        </Button>
      </div>
    </form>
  );
}
