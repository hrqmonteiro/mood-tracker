'use client'

import { useSearchParams } from 'next/navigation'
import { Player } from '@lottiefiles/react-lottie-player'
import clsx from 'clsx'

import BackgroundExcited from '@/components/backgrounds/background-excited'
import BackgroundPleasant from '@/components/backgrounds/background-pleasant'
import BackgroundSad from '@/components/backgrounds/background-sad'
import Fallback from '@/components/fallback'

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
  }
}

export default function Mood() {
  const searchParams = useSearchParams()
  const mood = searchParams.get('mood')
  const userMood = mood as string
  const isValidMood = Object.keys(moodsAvailable).includes(userMood)

  if (!isValidMood) return <Fallback />

  const currentMood = moodsAvailable[userMood]

  return (
    <div className={clsx(styles.mood, styles[userMood])}>
      <div className={styles.foreground}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Current Mood</p>
          <p className={styles.title}>{currentMood.title}</p>
          <p className={styles.message}>{currentMood.message}</p>
        </div>
        <div className={styles.video}>
          <div className={styles['emoji-group']}>
            {Object.keys(moodsAvailable).map((moodKey) => (
              <Player
                autoplay
                loop
                key={moodKey}
                src={`/assets/animations/${moodKey}.json`}
                style={{ height: '300px', width: '300px' }}
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
      </div>
    </div>
  )
}
