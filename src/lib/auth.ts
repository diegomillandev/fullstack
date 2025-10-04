import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { createPasswordHash, comparePasswordToHash } from "@/lib/argon2";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    password: {
      hash: createPasswordHash,
      verify: comparePasswordToHash,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"],
        input: false,
      },
    },
  },
  advanced: {
    generateId: false,
  },
});
