import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import { env } from "./config/env";

const { API_VERSION, PORT } = env;

const app = new Hono().basePath(`/api/${API_VERSION}`);
const port = PORT || 8000;

app.use("*", logger(), prettyJSON());

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST"],
  })
);

app.get("/", (c) => {
  console.log("handler");
  return c.text("Hello!");
});

console.info(`Running on port: ${port}`);

serve({
  fetch: app.fetch,
  port,
});
