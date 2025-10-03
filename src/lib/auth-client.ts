import { createAuthClient } from "better-auth/react";
import { NEXT_PUBLIC_API_URL } from "./constants/env";

const authClient = createAuthClient({
  baseURL: NEXT_PUBLIC_API_URL,
});

export const { signIn, signUp, useSession } = authClient;
