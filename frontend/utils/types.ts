import { moodsAvailable } from '@/utils/constants'

export type BackgroundProps = {
  isActive: boolean
}

export type MoodData = {
  mood: string
  date: Date
}

export type MoodEntry = {
  title: string
  message: string
}

export type MoodsAvailable = {
  pleasant: MoodEntry
  excited: MoodEntry
  sad: MoodEntry
  notFound: MoodEntry
}

export type MoodKey = keyof typeof moodsAvailable

export type MoodItem = {
  mood: string
  date: Date | string
}
