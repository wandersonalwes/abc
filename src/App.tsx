import { cn } from './lib/utils'
import { alphabet } from './data/alphabet'
import { useSpeechSynthesis } from './hooks/use-speech-synthesis'
import { useKeyboardListener } from './hooks/use-keyboard-listener'

export const App = () => {
  const { speak } = useSpeechSynthesis()

  const handleSpeak = (data: { letter: string; example: string }) => {
    speak(`${data.letter} de ${data.example}`)
  }

  useKeyboardListener((key: string) => {
    const data = alphabet.find((letter) => letter.letter === key)

    if (!data) {
      return console.warn(`Key ${key} is not in the alphabet.`)
    }

    handleSpeak(data)
  })

  return (
    <div className={cn('min-h-screen flex justify-center items-center bg-green-200')}>
      <div className="grid grid-cols-9 gap-6 shadow-custom rounded p-4 bg-board bg-green-50">
        {alphabet.map(({ letter, example }) => (
          <button
            key={letter}
            onClick={() => handleSpeak({ letter, example })}
            className="text-2xl hover:scale-[4] transition-transform duration-300 outline-none"
          >
            <span className="text-green-500 [text-shadow:_1px_1px_0_#068532]">
              {letter}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
