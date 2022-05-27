export const generateRandomId = ({ text, length = 5 }: { text: string; length: number }, postfix?: string): string => {
  let currentText: string
  if (postfix && !text.endsWith('-')) {
    currentText = `${text}${postfix}`
  } else {
    currentText = text
  }
  const availableCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890'
  for (let i = 0; i < length; i++) {
    currentText += availableCharacters.charAt(Math.floor(Math.random() * availableCharacters.length))
  }
  return currentText
}
