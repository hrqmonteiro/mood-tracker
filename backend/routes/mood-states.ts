import { Context, Hono } from "hono";
import {
  createMoodState,
  deleteMoodState,
  getMoodState,
  getMoodStates,
  updateMoodState,
} from "../controllers/mood-state";

const moodStates = new Hono();

moodStates.get("/", (c: Context) => getMoodStates(c));

moodStates.get("/:id", (c: Context) => getMoodState(c));

moodStates.post("/", (c: Context) => createMoodState(c));

moodStates.put("/:id", (c: Context) => updateMoodState(c));

moodStates.delete("/:id", (c: Context) => deleteMoodState(c));

export default moodStates;
