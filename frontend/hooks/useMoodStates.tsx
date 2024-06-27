import { useEffect, useState } from 'react'
import { API } from '@/services/api'

export default function useMoodStates() {
  const [moodStates, setMoodStates] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMoodStates = async () => {
      try {
        const response = await API.get('/api/v1/mood-states')
        const sortedMoodStates = response.data.sort((a: any, b: any) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        })
        setMoodStates(sortedMoodStates)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchMoodStates()
  }, [])

  return {
    moodStates,
    loading,
    error
  }
}
