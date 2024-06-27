import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    API_VERSION: z.string(),
    DATABASE_URL: z.string(),
    PORT: z.preprocess(Number, z.number()),
  },
  runtimeEnv: process.env,
});
