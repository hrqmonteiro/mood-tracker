'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import Modal from '@/components/modal'
import Mood from '@/components/mood'
import Sidebar from '@/components/sidebar'

interface MoodData {
  mood: string
  date: string
}

export default function Home() {
  const [moodList, setMoodList] = useState<MoodData[]>([
    {
      mood: 'pleasant',
      date: '2023-11-01T21:10:13.806Z'
    },
    {
      mood: 'excited',
      date: '2023-11-01T21:10:15.602Z'
    },
    {
      mood: 'sad',
      date: '2023-11-01T21:10:17.097Z'
    },
    {
      mood: 'excited',
      date: '2023-11-01T21:10:18.673Z'
    },
    {
      mood: 'sad',
      date: '2023-11-01T21:10:20.001Z'
    },
    {
      mood: 'pleasant',
      date: '2023-11-01T21:10:21.721Z'
    },
    {
      mood: 'excited',
      date: '2023-11-01T21:10:23.848Z'
    },
    {
      mood: 'sad',
      date: '2023-11-01T21:10:25.134Z'
    },
    {
      mood: 'pleasant',
      date: '2023-11-01T21:10:26.492Z'
    },
    {
      mood: 'excited',
      date: '2023-11-01T21:10:27.618Z'
    },
    {
      mood: 'sad',
      date: '2023-11-01T21:10:28.652Z'
    },
    {
      mood: 'pleasant',
      date: '2023-11-01T21:10:29.832Z'
    },
    {
      mood: 'excited',
      date: '2023-11-01T21:10:31.175Z'
    },
    {
      mood: 'sad',
      date: '2023-11-01T21:10:32.475Z'
    },
    {
      mood: 'pleasant',
      date: '2023-11-01T21:10:33.673Z'
    },
    {
      mood: 'pleasant',
      date: '2023-11-01T21:10:37.347Z'
    },
    {
      mood: 'excited',
      date: '2023-11-01T21:10:38.868Z'
    },
    {
      mood: 'sad',
      date: '2023-11-01T21:10:40.804Z'
    },
    {
      mood: 'excited',
      date: '2023-11-01T21:10:42.535Z'
    },
    {
      mood: 'pleasant',
      date: '2023-11-01T21:10:44.098Z'
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const scrollToRef = useRef<HTMLDivElement>(null)

  const updateMood = (newMood: string) => {
    const date = new Date().toISOString()
    setMoodList((currentMood) => [...currentMood, { mood: newMood, date }])
    router.push(`/?mood=${newMood}`)
    setShowModal(false)
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main>
      <Modal
        showModal={showModal}
        updateMood={updateMood}
        closeModal={() => setShowModal(false)}
      />
      <Mood />
      <Sidebar moodList={moodList} setShowModal={setShowModal}>
        <div ref={scrollToRef} />
      </Sidebar>
    </main>
  )
}
