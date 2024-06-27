import { Context } from "hono";

export function errorHandler(c: Context) {
  c.status(400);

  return c.json({
    message: c.error?.message,
  });
}
