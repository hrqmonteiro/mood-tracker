export enum MoodType {
  EXCITED = "EXCITED",
  PLEASANT = "PLEASANT",
  SAD = "SAD",
}

export type MoodState = {
  id: string;
  type: MoodType;
  createdAt: Date;
  updatedAt: Date;
};
