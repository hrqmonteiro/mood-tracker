import { useEffect, useState } from 'react'
import { API } from '@/services/api'

export default function useMoodStates() {
  const [moodStates, setMoodStates] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMoodStates()
  }, [])

  const fetchMoodStates = async () => {
    try {
      const response = await API.get('/api/v1/mood-states')
      const sortedMoodStates = response.data.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      setMoodStates(sortedMoodStates)
      setLoading(false)
    } catch (error) {
      setError(error.message)
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
