import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { moodsAvailable } from '@/utils/constants'
import type { MoodKey } from '@/utils/types'
import { Player } from '@lottiefiles/react-lottie-player'
import clsx from 'clsx'

import useMoodStates from '@/hooks/useMoodStates'
import BackgroundExcited from '@/components/backgrounds/background-excited'
import BackgroundPleasant from '@/components/backgrounds/background-pleasant'
import BackgroundSad from '@/components/backgrounds/background-sad'

import BackgroundFallback from './backgrounds/background-fallback'
import styles from './mood.module.css'

export default function Mood() {
  const searchParams = useSearchParams()
  const mood = searchParams.get('mood') as MoodKey | null
  const [latestMoodState, setLatestMoodState] = useState<MoodKey | null>(null)
  const { moodStates, loading, error } = useMoodStates()
  const userMood = mood || latestMoodState

  useEffect(() => {
    if (!loading && !error && moodStates.length > 0) {
      const latestMood = moodStates[0].type.toLowerCase() as MoodKey
      setLatestMoodState(latestMood)
    }
  }, [moodStates, loading, error])

  const showFallback = !mood && !latestMoodState

  useEffect(() => {
    if (showFallback) {
      setLatestMoodState('notFound')
    }
  }, [moodStates, showFallback])

  let currentMood = null
  if (userMood && Object.keys(moodsAvailable).includes(userMood)) {
    currentMood = moodsAvailable[userMood]
  }

  return (
    <div className={clsx(styles.mood, userMood && styles[userMood])}>
      <div className={styles.foreground}>
        {userMood && currentMood && (
          <div className={styles.content}>
            <p className={styles.eyebrow}>Current Mood</p>
            <p className={styles.title}>{currentMood.title}</p>
            <p className={styles.message}>{currentMood.message}</p>
          </div>
        )}
        <div className={styles.video}>
          <div className={styles['emoji-group']}>
            {Object.keys(moodsAvailable).map((moodKey) => (
              <Player
                key={moodKey}
                src={`/assets/animations/${moodKey}.json`}
                style={{ height: '300px', width: '300px' }}
                autoplay
                loop
                className={clsx(styles.emoji, {
                  [styles['emoji--active']]: moodKey === userMood
                })}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.background}>
        <BackgroundPleasant isActive={userMood === 'pleasant'} />
        <BackgroundSad isActive={userMood === 'sad'} />
        <BackgroundExcited isActive={userMood === 'excited'} />
        <BackgroundFallback isActive={userMood === 'notFound'} />
      </div>
    </div>
  )
}
