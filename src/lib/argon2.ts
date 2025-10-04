import { hash, verify, type Options } from "@node-rs/argon2";

const opts: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const createPasswordHash = async (plainPassword: string) => {
  const passwordHash = await hash(plainPassword, opts);
  return passwordHash;
};

export const comparePasswordToHash = async (data: {
  hash: string;
  password: string;
}) => {
  const isValid = await verify(data.hash, data.password, opts);
  return isValid;
};
