import { useEffect, useState } from 'react'
import { API } from '@/services/api'

type MoodState = {
  id: string
  type: string
  createdAt: string
  updatedAt: string
}

type MoodStates = {
  data: MoodState[]
}

export default function useMoodStates() {
  const [moodStates, setMoodStates] = useState<MoodState[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMoodStates()
  }, [])

  const fetchMoodStates = async () => {
    try {
      const response: MoodStates = await API.get('/api/v1/mood-states')

      const sortedMoodStates = response.data.sort(
        (a: MoodState, b: MoodState) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      setMoodStates(sortedMoodStates)
      setLoading(false)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
      setLoading(false)
    }
  }

  const createMoodState = async (type: 'PLEASANT' | 'EXCITED' | 'SAD') => {
    try {
      await API.post('/api/v1/mood-states', { type: type.toUpperCase() })
      await fetchMoodStates()
    } catch (error) {
      console.error('Failed to create mood state', error)
      throw error
    }
  }

  return {
    moodStates,
    loading,
    error,
    createMoodState
  }
}
