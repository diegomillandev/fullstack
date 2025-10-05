import { transactionInputs } from "@/schemas/transactions";
import { z } from "zod";

export type TransactionInput = z.infer<typeof transactionInputs>;
