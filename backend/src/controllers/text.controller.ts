import { Request, Response } from 'express'
import {
  createText as createTextService,
  getAllTexts,
  getTextById as getTextByIdService,
  updateText as updateTextService,
  deleteText as deleteTextService,
  getWordCount as getWordCountService,
  getCharacterCount as getCharacterCountService,
  getSentenceCount as getSentenceCountService,
  getParagraphCount as getParagraphCountService,
  getLongestWords as getLongestWordsService,
} from '../services/text.service'

// Create a new text entry
export const createText = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { content, createdBy } = req.body

  if (typeof content !== 'string' || typeof createdBy !== 'string') {
    res
      .status(400)
      .json({ message: 'Invalid data types for content or createdBy' })
    return
  }

  if (!content || !createdBy) {
    res.status(400).json({ message: 'Content and createdBy are required' })
    return
  }

  try {
    const text = await createTextService(content, createdBy)
    res.status(201).json(text)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create text', error })
  }
}

// Get all text entries
export const getTexts = async (req: Request, res: Response): Promise<void> => {
  try {
    const texts = await getAllTexts()
    res.status(200).json(texts)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch texts', error })
  }
}

// Get a single text entry by ID
export const getTextById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params

  if (!id || typeof id !== 'string') {
    res.status(400).json({ message: 'Invalid ID format' })
    return
  }

  try {
    const text = await getTextByIdService(id)
    if (!text) {
      res.status(404).json({ message: 'Text not found' })
      return
    }
    res.status(200).json(text)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch text', error })
  }
}

// Update a text entry
export const updateText = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { content } = req.body

  if (!id || typeof id !== 'string') {
    res.status(400).json({ message: 'Invalid ID format' })
    return
  }

  if (typeof content !== 'string') {
    res.status(400).json({ message: 'Invalid data type for content' })
    return
  }

  if (!content) {
    res.status(400).json({ message: 'Content is required' })
    return
  }

  try {
    const updatedText = await updateTextService(id, content)
    if (!updatedText) {
      res.status(404).json({ message: 'Text not found' })
      return
    }
    res.status(200).json(updatedText)
  } catch (error) {
    res.status(500).json({ message: 'Failed to update text', error })
  }
}

// Delete a text entry
export const deleteText = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params

  if (!id || typeof id !== 'string') {
    res.status(400).json({ message: 'Invalid ID format' })
    return
  }

  try {
    const deletedText = await deleteTextService(id)
    if (!deletedText) {
      res.status(404).json({ message: 'Text not found' })
      return
    }
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete text', error })
  }
}

// API to return the number of words
export const getWordCount = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params

  try {
    const text = await getTextByIdService(id)
    if (!text) {
      res.status(404).json({ message: 'Text not found' })
      return
    }

    const wordCount = getWordCountService(text.content)
    res.status(200).json({ wordCount })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch word count', error })
  }
}

// API to return the number of characters
export const getCharacterCount = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params

  try {
    const text = await getTextByIdService(id)
    if (!text) {
      res.status(404).json({ message: 'Text not found' })
      return
    }

    const characterCount = getCharacterCountService(text.content)
    res.status(200).json({ characterCount })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch character count', error })
  }
}

// API to return the number of sentences
export const getSentenceCount = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params

  try {
    const text = await getTextByIdService(id)
    if (!text) {
      res.status(404).json({ message: 'Text not found' })
      return
    }

    const sentenceCount = getSentenceCountService(text.content)
    res.status(200).json({ sentenceCount })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sentence count', error })
  }
}

// API to return the number of paragraphs
export const getParagraphCount = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params

  try {
    const text = await getTextByIdService(id)
    if (!text) {
      res.status(404).json({ message: 'Text not found' })
      return
    }

    const paragraphCount = getParagraphCountService(text.content)
    res.status(200).json({ paragraphCount })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch paragraph count', error })
  }
}

// API to return the longest words in paragraphs
export const getLongestWords = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params

  try {
    const text = await getTextByIdService(id)
    if (!text) {
      res.status(404).json({ message: 'Text not found' })
      return
    }

    const longestWords = getLongestWordsService(text.content)
    console.log(longestWords)
    res.status(200).json({ longestWords })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch longest words', error })
  }
}

// Analyze text content and return all metrics
export const analyzeTextContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  try {
    const text = await getTextByIdService(id)
    if (!text) {
      res.status(404).json({ message: 'Text not found' })
      return
    }

    const wordCount = getWordCountService(text.content)
    const characterCount = getCharacterCountService(text.content)
    const sentenceCount = getSentenceCountService(text.content)
    const paragraphCount = getParagraphCountService(text.content)
    const longestWords = getLongestWordsService(text.content)

    res.status(200).json({
      wordCount,
      characterCount,
      sentenceCount,
      paragraphCount,
      longestWords,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to analyze text', error })
  }
}
