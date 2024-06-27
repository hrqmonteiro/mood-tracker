import { PrismaClient } from "@prisma/client";
import { Context } from "hono";
import { validateMoodState } from "../utils/validate-mood-state";

const client = new PrismaClient();

export async function getMoodStates(c: Context) {
  const moodStates = await client.moodState.findMany();

  c.status(200);

  return c.json(moodStates);
}

export async function getMoodState(c: Context) {
  const moodState = await client.moodState.findUnique({
    where: { id: c.req.param("id") },
  });

  c.status(200);

  return c.json(moodState);
}

export async function createMoodState(c: Context) {
  const body = await c.req.json();

  const input = validateMoodState(body);

  const createMoodState = {
    type: input.type,
  };

  const moodState = await client.moodState.create({ data: createMoodState });

  c.status(201);

  return c.json(moodState);
}

export async function updateMoodState(c: Context) {
  const body = await c.req.json();

  const moodState = await client.moodState.update({
    where: { id: c.req.param("id") },
    data: body,
  });

  c.status(204);

  return c.json(moodState);
}

export async function deleteMoodState(c: Context) {
  const moodState = await client.moodState.delete({
    where: { id: c.req.param("id") },
  });

  c.status(204);

  return c.json(moodState);
}
