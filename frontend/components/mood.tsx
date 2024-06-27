import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Player } from '@lottiefiles/react-lottie-player'
import clsx from 'clsx'

import useMoodStates from '@/hooks/useMoodStates'
import BackgroundExcited from '@/components/backgrounds/background-excited'
import BackgroundPleasant from '@/components/backgrounds/background-pleasant'
import BackgroundSad from '@/components/backgrounds/background-sad'

import BackgroundFallback from './backgrounds/background-fallback'
import styles from './mood.module.css'

const moodsAvailable: Record<string, { title: string; message: string }> = {
  pleasant: {
    title: 'You’re feeling pleasant',
    message:
      'Feeling on top of the world, are we? Must be all those endorphins doing their happy dance!'
  },
  excited: {
    title: 'You’re feeling excited',
    message:
      "Buckle up, buttercup! Someone's got an extra sparkle in their step today!"
  },
  sad: {
    title: 'You’re feeling sad',
    message:
      'Got the blues, huh? Remember, even clouds have silver linings. We’re here for you.'
  },
  notFound: {
    title: 'No record found',
    message:
      'No record of Mood Trackings found. Choose your current mood on the sidebar and start!'
  }
}

export default function Mood() {
  const searchParams = useSearchParams()
  const mood = searchParams.get('mood') as string | null
  const [latestMoodState, setLatestMoodState] = useState<string | null>(null)
  const { moodStates, loading, error } = useMoodStates()
  const userMood = mood || latestMoodState

  useEffect(() => {
    if (!loading && !error && moodStates.length > 0) {
      const latestMood = moodStates[0].type.toLowerCase()
      setLatestMoodState(latestMood)
    }
  }, [moodStates, loading, error])

  const showFallback = !mood && !latestMoodState

  useEffect(() => {
    if (showFallback) {
      setLatestMoodState('notFound')
    }
  }, [moodStates, showFallback])

  const currentMood = userMood ? moodsAvailable[userMood] : undefined

  return (
    <div className={clsx(styles.mood, userMood && styles[userMood])}>
      <div className={styles.foreground}>
        {userMood && (
          <div className={styles.content}>
            <p className={styles.eyebrow}>Current Mood</p>
            <p className={styles.title}>{currentMood?.title}</p>
            <p className={styles.message}>{currentMood?.message}</p>
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
