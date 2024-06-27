'use client'

import { useEffect, useRef, useState } from 'react'
import type { MoodData } from '@/utils/types'
import { Toaster } from 'react-hot-toast'

import useMoodStates from '@/hooks/useMoodStates'
import Modal from '@/components/modal'
import Mood from '@/components/mood'
import Sidebar from '@/components/sidebar'

export default function Home() {
  const [moodList, setMoodList] = useState<MoodData[]>([])
  const [showModal, setShowModal] = useState(false)
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

  return (
    <main>
      <Toaster />
      <Modal
        showModal={showModal}
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
