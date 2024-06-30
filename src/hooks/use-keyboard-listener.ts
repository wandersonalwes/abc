import { useEffect } from 'react'

export const useKeyboardListener = (onKeyPress: (key: string) => void) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase()
      onKeyPress(key)
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [onKeyPress])
}
