import { useEffect, useRef } from 'react'
import { Controls, Player } from '@lottiefiles/react-lottie-player'

import styles from './sidebar.module.css'

const capitalizeFirstLetter = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1)

interface MoodPreviewProps {
  mood: string
  date: Date | string
  updateSelectedMood: (newMood: string) => void
}

export default function MoodPreview({
  mood,
  date,
  updateSelectedMood
}: MoodPreviewProps) {
  const videoplayer = useRef(null)

  let localizedDate: string | null = null
  if (date instanceof Date && !isNaN(date.getTime())) {
    localizedDate = new Date(date).toLocaleDateString('en-CA', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    })
  } else if (typeof date === 'string') {
    localizedDate = date
  }

  const localizedTime = new Intl.DateTimeFormat('en-US', {
    timeStyle: 'short'
  })
    .format(new Date(date))
    .toLowerCase()

  return (
    <button
      className={styles.mood_preview}
      type='button'
      onClick={() => updateSelectedMood(mood)}
      onMouseEnter={() => videoplayer.current?.play()}
    >
      <span>
        <Player
          ref={videoplayer}
          src={
            `/assets/animations/${mood}.json` ||
            '/assets/animations/notFound.json'
          }
          style={{ height: '48px', width: '48px' }}
        >
          <Controls />
        </Player>
      </span>
      <span className={styles.mood_content}>
        <span className={styles.mood_name}>{capitalizeFirstLetter(mood)}</span>
        <span className={styles.mood_date} suppressHydrationWarning>
          {localizedDate} at {localizedTime}
        </span>
      </span>
    </button>
  )
}
