import { serve } from "@hono/node-server";
import { Context, Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import { env } from "./config/env";
import { errorHandler } from "./middlewares/error";
import { notFound } from "./middlewares/not-found";
import moodStates from "./routes/mood-states";

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

app.route("/mood-states", moodStates);

app.onError((err, c: Context) => {
  console.log("the err", err);
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
