import { prisma } from "@/lib/prisma";
import { transactionSchema } from "@/schemas/transactions";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
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

      const user = await prisma.user.findUnique({
        where: { id: validateData.data.user_id },
      });

      if (!user || user.role !== "ADMIN") {
        return res.status(403).json({
          success: false,
          message: !user
            ? "Unauthorized: user not found"
            : "Forbidden: only admins can access this resource",
          errors: null,
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
    } catch (error) {
      console.log("Get API: ", error);
      res.status(500).json({
        success: false,
        message: "Error Server API",
        errors: null,
      });
    }
  }

  if (req.method === "GET") {
    try {
      const { searchParams } = new URL(req.url!, `http://${req.headers.host}`);
      const user_id = searchParams.get("user_id");

      if (!user_id) {
        return res.status(400).json({
          success: false,
          message: "Missing user_id parameter",
          errors: null,
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: user_id },
      });

      if (!user || user.role !== "ADMIN") {
        return res.status(403).json({
          success: false,
          message: !user
            ? "Unauthorized: user not found"
            : "Forbidden: only admins can access this resource",
          errors: null,
        });
      }

      const movements = await prisma.movement.findMany();

      res.status(200).json(movements);
    } catch (error) {
      console.log("Get API: ", error);
      res.status(500).json({
        success: false,
        message: "Error Server API",
        errors: null,
      });
    }
  }
}
