import { Context } from "hono";

export function notFound(c: Context) {
  c.status(404);

  return c.json({
    message: `Not found: ${c.req.method} on ${c.req.url}`,
  });
}
