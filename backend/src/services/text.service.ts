import Text from '../models/text.model'

// Analyze text content
export const analyzeText = (text: string) => {
  const paragraphs = text.split('\n').filter((p) => p.trim() !== '')
  const sentences = text.split(/[.!?]/).filter((s) => s.trim() !== '')
  const words = text.split(/\s+/).filter((w) => w.trim() !== '')

  const characters = text.replace(/[^\w]|_/g, '')

  const longestWords = paragraphs.map((paragraph) => {
    const cleaned = paragraph.replace(/[^\w\s]|_/g, '')
    const wordsInParagraph = cleaned.split(/\s+/)
    return wordsInParagraph.reduce((longest, word) => {
      return word.length > longest.length ? word : longest
    }, '')
  })

  return {
    wordCount: words.length,
    characterCount: characters.length,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    longestWords,
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
