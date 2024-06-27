import { HTTPException } from "hono/http-exception";
import { MoodState } from "../models/mood-state";

export function validateMoodState(moodState: MoodState) {
  if (!moodState) {
    throw new HTTPException(400, { message: "Empty Mood State" });
  }

  if (!("type" in moodState) || typeof moodState.type !== "string") {
    throw new HTTPException(400, { message: "Invalid Mood State" });
  }

  return moodState;
}
