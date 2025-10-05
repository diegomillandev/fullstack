import { z } from "zod";

export const transactionSchema = z.object({
  user_id: z.string("User ID must be a string"),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
  concept: z.string().min(3, "Concept must be at least 3 characters"),
  type: z.enum(["INCOME", "EXPENSE"]),
  date: z.string().optional(),
});

export const transactionInputs = transactionSchema
  .omit({ user_id: true })
  .extend({
    type: z.enum(["INCOME", "EXPENSE"]).default("INCOME"),
    date: z.string().min(1, "Date is required"),
  });
