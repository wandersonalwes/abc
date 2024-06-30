import { useState } from 'react'
import { Button } from './components/ui/button'
import { alphabet } from './data/alphabet'
import { useSpeechSynthesis } from './hooks/use-speech-synthesis'
import { cn } from './lib/utils'

const BG_COLORS = [
  'bg-yellow-500',
  'bg-red-500',
  'bg-green-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-purple-500',
  'bg-indigo-500',
]

const generateRandomColor = () => {
  return BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)]
}

export const App = () => {
  const { speak } = useSpeechSynthesis()
  const [bgColor, setBgColor] = useState(generateRandomColor())

  const handleSpeak = (letter: string) => {
    speak(letter)
    setBgColor(generateRandomColor())
  }

  return (
    <div className={cn('min-h-screen', bgColor)}>
      {alphabet.map((letter) => (
        <Button
          key={letter}
          size="icon"
          variant="ghost"
          onClick={() => handleSpeak(letter)}
        >
          {letter}
        </Button>
      ))}
    </div>
  )
}
