import { prisma } from "@/lib/prisma";
import { transactionSchema } from "@/schemas/transactions";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("Transaction data received:", req.body);

    const validateData = transactionSchema.safeParse(req.body);

    if (!validateData.success) {
      const fieldErrors = z.flattenError(validateData.error).fieldErrors;
      console.log(validateData);
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
        errors: fieldErrors,
      });
    }

    await prisma.movement.create({
      data: {
        userId: validateData.data.user_id,
        amount: validateData.data.amount,
        type: validateData.data.type,
        concept: validateData.data.concept,
      },
    });

    res.status(200).json({
      success: true,
      message: "Transaction recorded successfully",
      errors: null,
    });
  }
  if (req.method === "GET") {
    const movements = await prisma.movement.findMany();
    res.status(200).json(movements);
  }
}
