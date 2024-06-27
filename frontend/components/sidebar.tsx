'use client'

import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import MoodPreview from './mood-preview'
import styles from './sidebar.module.css'

export default function Sidebar({ moodList = [], setShowModal, children }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const updateSelectedMood = (newMood) => {
    router.push(pathname + '?' + createQueryString('mood', newMood))
  }

  return (
    <div className={styles.sidebar} suppressHydrationWarning>
      <div className={styles['sidebar__list']}>
        <div className={styles.scrollable}>
          {moodList.map(({ mood, date }, index) => (
            <MoodPreview
              key={`mood-preview-${date}-${mood}-${index}`}
              mood={mood}
              date={date}
              updateSelectedMood={updateSelectedMood}
            />
          ))}
          {children}
        </div>
      </div>
      <div className={styles['sidebar__footer']}>
        <button
          className={styles['sidebar__add_button']}
          onClick={() => setShowModal((current) => !current)}
        >
          Log Mood
        </button>
      </div>
    </div>
  )
}
