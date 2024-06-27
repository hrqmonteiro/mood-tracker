import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { MoodType } from "../models/mood-state";

const moodTypeValues: [string, ...string[]] = Object.values(MoodType) as [
  string,
  ...string[]
];

const swagger = new OpenAPIHono();

swagger.doc("/docs", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Mood Tracker API",
  },
});

const moodStateSchema = z.object({
  id: z.string(),
  type: z.enum(moodTypeValues),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const getMoodStatesRoute = createRoute({
  method: "get",
  path: "/mood-states",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.array(moodStateSchema),
        },
      },
      description: "Retrieve all records of Mood States.",
    },
  },
});

swagger.openapi(getMoodStatesRoute, (c) => {
  return c.json(
    [
      {
        id: "1",
        type: MoodType.EXCITED,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        type: MoodType.PLEASANT,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    200
  );
});

const getMoodStateRoute = createRoute({
  method: "get",
  path: "/mood-states/:id",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: moodStateSchema,
        },
      },
      description: "Retrieve a single record of Mood State by id.",
    },
  },
});

swagger.openapi(getMoodStateRoute, (c) => {
  return c.json(
    {
      id: "1",
      type: MoodType.EXCITED,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    200
  );
});

const createMoodStateRoute = createRoute({
  method: "post",
  path: "/mood-states",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            type: z.enum(moodTypeValues),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: moodStateSchema,
        },
      },
      description: "Create a new record of Mood State.",
    },
  },
});

swagger.openapi(createMoodStateRoute, (c) => {
  const newMoodState = {
    id: "3",
    type: MoodType.SAD,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return c.json(newMoodState, 201);
});

const updateMoodStateRoute = createRoute({
  method: "put",
  path: "/mood-states/:id",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            id: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    204: {
      description: "Update a record of Mood State by id.",
    },
  },
});

swagger.openapi(updateMoodStateRoute, (c) => {
  return c.json({}, 204);
});

const deleteMoodStateRoute = createRoute({
  method: "delete",
  path: "/mood-states/:id",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            id: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    204: {
      description: "Delete a record of Mood State by id.",
    },
  },
});

swagger.openapi(deleteMoodStateRoute, (c) => {
  return c.json({}, 204);
});

swagger.get("/ui", swaggerUI({ url: "/docs" }));

export default swagger;
