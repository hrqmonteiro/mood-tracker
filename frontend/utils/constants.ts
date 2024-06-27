import type { MoodsAvailable } from '@/utils/types'
import { format } from 'date-fns'

export const todayDate = format(new Date(), 'yyyy-MM-dd')

export const moodsAvailable: MoodsAvailable = {
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
