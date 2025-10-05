import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { user_id } = req.body;

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

      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      console.log("Get API:", error);
      res.status(500).json({
        success: false,
        message: "Error Server API",
        errors: null,
      });
    }
  }
}
