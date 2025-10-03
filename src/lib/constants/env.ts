const getEnv = (key: string, defaultValue: string) => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value;
};

export const NEXT_PUBLIC_API_URL = getEnv(
  "NEXT_PUBLIC_API_URL",
  "http://localhost:3000"
);
