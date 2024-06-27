import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { todayDate } from '@/utils/constants'
import type { MoodItem } from '@/utils/types'

import useQueryString from '@/hooks/useQueryString'

import MoodPreview from './mood-preview'
import styles from './sidebar.module.css'

type SidebarProps = {
  moodList: MoodItem[]
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  children?: React.ReactNode
}

export default function Sidebar({
  moodList = [],
  setShowModal,
  children
}: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const { createQueryString } = useQueryString()

  const updateSelectedMood = (newMood: string) => {
    setSelectedMood(newMood)
    router.push(pathname + '?' + createQueryString('mood', newMood))
  }

  const defaultMoodPreview = (
    <MoodPreview
      key='default-mood-preview'
      mood='notFound'
      date={todayDate}
      isSelected={false}
      updateSelectedMood={() => {}}
    />
  )

  return (
    <div className={styles.sidebar} suppressHydrationWarning>
      <div className={styles['sidebar__list']}>
        <div className={styles.scrollable}>
          {moodList.length === 0
            ? defaultMoodPreview
            : moodList.map(({ mood, date }, index) => (
                <MoodPreview
                  key={`mood-preview-${date}-${mood}-${index}`}
                  mood={mood}
                  date={date}
                  isSelected={mood === selectedMood}
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
