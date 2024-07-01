export const useSpeechSynthesis = (lang: string = 'pt-BR') => {
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis

      synth.cancel()

      const utterThis = new SpeechSynthesisUtterance(text)

      utterThis.lang = lang
      utterThis.onstart = () => {
        console.log(`[STATING TO SPEAK]: ${text}`)
      }
      utterThis.onend = () => {
        console.log(`[FINISH SPEAKING]: ${text}`)
      }
      utterThis.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror', event)
      }

      synth.speak(utterThis)
    } else {
      alert('A síntese de fala não é suportada neste navegador.')
    }
  }

  return { speak }
}
