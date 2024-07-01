import confetti from 'canvas-confetti'
import { useEffect, useState } from 'react'

import { cn } from './lib/utils'
import { alphabet } from './data/alphabet'
import { LetterButton } from './components/letter-button'
import { useSpeechSynthesis } from './hooks/use-speech-synthesis'
import { useKeyboardListener } from './hooks/use-keyboard-listener'

type LetterItem = {
  letter: string
  example: string
  emoji: string
}

export const App = () => {
  const { speak } = useSpeechSynthesis()
  const [currentLetter, setCurrentLetter] = useState<LetterItem | null>()

  const handleSpeak = (data: { letter: string; example: string; emoji: string }) => {
    speak(`${data.letter} de ${data.example}`)
    setCurrentLetter(data)
  }

  useKeyboardListener((key: string) => {
    const data = alphabet.find((letter) => letter.letter === key)

    if (!data) {
      return console.warn(`Key ${key} is not in the alphabet.`)
    }

    handleSpeak(data)
    confetti()
  })

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (currentLetter) {
      timeout = setTimeout(() => setCurrentLetter(null), 2000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [currentLetter])

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col gap-6 justify-center items-center bg-green-200'
      )}
    >
      {currentLetter && (
        <span className="text-5xl text-green-500 [text-shadow:_1px_1px_0_#068532]">
          {currentLetter.letter} = {currentLetter.emoji}
        </span>
      )}
      <div className="grid grid-cols-9 gap-6 shadow-custom rounded p-4 bg-board bg-green-50">
        {alphabet.map(({ letter, example, emoji }) => (
          <LetterButton
            key={letter}
            onClick={() => handleSpeak({ letter, example, emoji })}
            isActive={currentLetter?.letter === letter}
          >
            {letter}
          </LetterButton>
        ))}
      </div>
    </div>
  )
}
