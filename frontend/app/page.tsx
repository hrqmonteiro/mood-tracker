'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

import useMoodStates from '@/hooks/useMoodStates'
import Modal from '@/components/modal'
import Mood from '@/components/mood'
import Sidebar from '@/components/sidebar'

type MoodData = {
  mood: string
  date: Date
}

export default function Home() {
  const [moodList, setMoodList] = useState<MoodData[]>([])
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const scrollToRef = useRef<HTMLDivElement>(null)
  const { moodStates, createMoodState } = useMoodStates()

  useEffect(() => {
    if (moodStates.length > 0) {
      const updatedMoodList = moodStates.map((state) => ({
        mood: state.type.toLowerCase(),
        date: new Date(state.createdAt)
      }))
      setMoodList(updatedMoodList)
    }
  }, [moodStates])

  const updateMood = (newMood: string) => {
    const date = new Date()
    setMoodList((currentMood) => [...currentMood, { mood: newMood, date }])
    router.push(`/?mood=${newMood}`)
    setShowModal(false)
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main>
      <Toaster />
      <Modal
        showModal={showModal}
        updateMood={updateMood}
        closeModal={() => setShowModal(false)}
        createMoodState={createMoodState}
      />
      <Mood />
      <Sidebar moodList={moodList} setShowModal={setShowModal}>
        <div ref={scrollToRef} />
      </Sidebar>
    </main>
  )
}
