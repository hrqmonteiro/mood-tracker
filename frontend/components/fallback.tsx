import { useEffect, useState } from 'react'

import useMoodStates from '@/hooks/useMoodStates'

export default function Fallback() {
  const { moodStates, loading, error } = useMoodStates()
  const [latestMoodState, setLatestMoodState] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !error && moodStates.length > 0) {
      const latestMood = moodStates[0].type.toLowerCase()
      setLatestMoodState(latestMood)
    }
  }, [moodStates, loading, error])

  if (loading) {
    return <div></div>
  }

  if (error) {
    return <div></div>
  }

  return (
    <div>
      <div>Fallback</div>
      {latestMoodState && <div>{latestMoodState}</div>}
    </div>
  )
}
