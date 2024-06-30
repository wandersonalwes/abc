import { Button } from './components/ui/button'
import { alphabet } from './data/alphabet'
import { useSpeechSynthesis } from './hooks/use-speech-synthesis'

export const App = () => {
  const { speak } = useSpeechSynthesis()

  return (
    <div>
      {alphabet.map((letter) => (
        <Button key={letter} size="icon" variant="ghost" onClick={() => speak(letter)}>
          {letter}
        </Button>
      ))}
    </div>
  )
}
