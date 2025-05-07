import Text from '../models/text.model'

// Service to calculate word count
export const getWordCount = (text: string): number => {
  const words = text.split(/\s+/).filter((w) => w.trim() !== '')
  return words.length
}

// Service to calculate character count
export const getCharacterCount = (text: string): number => {
  const characters = text.replace(/[^\w]|_/g, '')
  return characters.length
}

// Service to calculate sentence count
export const getSentenceCount = (text: string): number => {
  const sentences = text.split(/[.!?]/).filter((s) => s.trim() !== '')
  return sentences.length
}

// Service to calculate paragraph count
export const getParagraphCount = (text: string): number => {
  const paragraphs = text.split('\n').filter((p) => p.trim() !== '')
  return paragraphs.length
}

// Service to calculate longest words in paragraphs
export const getLongestWords = (text: string): string[] => {
  const paragraphs = text.split('\n').filter((p) => p.trim() !== '')
  return paragraphs.map((paragraph) => {
    const cleaned = paragraph.replace(/[^\w\s]|_/g, '')
    const wordsInParagraph = cleaned.split(/\s+/)
    return wordsInParagraph.reduce((longest, word) => {
      return word.length > longest.length ? word : longest
    }, '')
  })
}

// Combine all metrics into a single analysis function
export const analyzeText = (text: string) => {
  return {
    wordCount: getWordCount(text),
    characterCount: getCharacterCount(text),
    sentenceCount: getSentenceCount(text),
    paragraphCount: getParagraphCount(text),
    longestWords: getLongestWords(text),
  }
}

// Create a new text entry
export const createText = async (content: string, createdBy: string) => {
  return await Text.create({ content, createdBy })
}

// Get all text entries
export const getAllTexts = async () => {
  return await Text.findAll()
}

// Get a single text entry by ID
export const getTextById = async (id: string) => {
  return await Text.findByPk(id)
}

// Update a text entry
export const updateText = async (id: string, content: string) => {
  const text = await Text.findByPk(id)
  if (!text) return null

  text.content = content
  await text.save()
  return text
}

// Delete a text entry
export const deleteText = async (id: string) => {
  const text = await Text.findByPk(id)
  if (!text) return null

  await text.destroy()
  return text
}
