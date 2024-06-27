import { serve } from "@hono/node-server";
import { Context, Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import { env } from "./config/env";
import { errorHandler } from "./middlewares/error";
import { notFound } from "./middlewares/not-found";
import moodStates from "./routes/mood-states";

import swagger from "./routes/swagger";

const { API_VERSION, PORT } = env;

const app = new Hono();
const port = PORT || 8000;

app.use("*", logger(), prettyJSON());

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST"],
  })
);

app.route("/", swagger);

app.route(`/api/${API_VERSION}/mood-states`, moodStates);

app.onError((err, c: Context) => {
  const error = errorHandler(c);

  return error;
});

app.notFound((c: Context) => {
  const error = notFound(c);

  return error;
});

console.info(`Running on port: ${port}`);

serve({
  fetch: app.fetch,
  port,
});
