import React from 'react'
import confetti from 'canvas-confetti'
import { cn } from '../lib/utils'

type LetterButtonProps = {
  children?: React.ReactNode
  onClick: () => void
  isActive: boolean
}

export const LetterButton = ({ children, onClick, isActive }: LetterButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    confetti({
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
    })

    onClick()
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'text-2xl hover:scale-[4] transition-transform duration-300 outline-none',
        {
          'scale-[4]': isActive,
        }
      )}
    >
      <span className="text-green-500 [text-shadow:_1px_1px_0_#068532]">{children}</span>
    </button>
  )
}
