import { useState } from 'react'
import { Button } from './components/ui/button'
import { alphabet } from './data/alphabet'
import { useSpeechSynthesis } from './hooks/use-speech-synthesis'
import { cn } from './lib/utils'
import { useKeyboardListener } from './hooks/use-keyboard-listener'

const BG_COLORS = [
  'bg-yellow-900',
  'bg-red-900',
  'bg-green-900',
  'bg-pink-900',
  'bg-orange-900',
  'bg-purple-900',
  'bg-indigo-900',
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

  useKeyboardListener((key: string) => {
    if (alphabet.includes(key)) {
      handleSpeak(key)
    } else {
      console.warn(`Key ${key} is not in the alphabet.`)
    }
  })

  return (
    <div className={cn('min-h-screen flex justify-center items-center', bgColor)}>
      {alphabet.map((letter) => (
        <Button
          key={letter}
          size="icon"
          variant="ghost"
          onClick={() => handleSpeak(letter)}
          className="text-2xl hover:text-3xl"
        >
          {letter}
        </Button>
      ))}
    </div>
  )
}
