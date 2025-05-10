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
import { getCache, setCache, delCache } from '../utils/cache'

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
    // Invalidate user's texts cache
    await delCache(`texts:${createdBy}`)
    res.status(201).json(text)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create text', error })
  }
}

// Get all text entries (cache per user)
export const getTexts = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user.id
  const cacheKey = `texts:${userId}`

  const cached = await getCache(cacheKey)
  if (cached) return res.json(cached)

  const texts = await getAllTexts({ where: { createdBy: userId } })
  await setCache(cacheKey, texts)
  res.json(texts)
}

// Get a single text entry by ID (cache per user and text)
export const getTextById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const userId = req.user.id
  const cacheKey = `text:${userId}:${id}`

  const cached = await getCache(cacheKey)
  if (cached) return res.json(cached)

  const text = await getTextByIdService(id)
  if (!text || text.createdBy !== userId)
    return res.status(404).json({ message: 'Not found' })

  await setCache(cacheKey, text)
  res.json(text)
}

// Update a text entry and invalidate all related caches
export const updateText = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const userId = req.user.id
  const text = await getTextByIdService(id)
  if (!text || text.createdBy !== userId)
    return res.status(403).json({ message: 'Forbidden' })

  const updated = await updateTextService(id, req.body.content)
  await delCache([
    `text:${userId}:${id}`,
    `texts:${userId}`,
    `analysis:${userId}:${id}`,
    `wordCount:${userId}:${id}`,
    `characterCount:${userId}:${id}`,
    `sentenceCount:${userId}:${id}`,
    `paragraphCount:${userId}:${id}`,
    `longestWords:${userId}:${id}`,
  ])
  res.json(updated)
}

// Delete a text entry and invalidate all related caches
export const deleteText = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const userId = req.user.id
  const text = await getTextByIdService(id)
  if (!text || text.createdBy !== userId)
    return res.status(403).json({ message: 'Forbidden' })

  await deleteTextService(id)
  await delCache([
    `text:${userId}:${id}`,
    `texts:${userId}`,
    `analysis:${userId}:${id}`,
    `wordCount:${userId}:${id}`,
    `characterCount:${userId}:${id}`,
    `sentenceCount:${userId}:${id}`,
    `paragraphCount:${userId}:${id}`,
    `longestWords:${userId}:${id}`,
  ])
  res.status(204).send()
}

// API to return the number of words (cache per user and text)
export const getWordCount = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const userId = req.user.id
  const cacheKey = `wordCount:${userId}:${id}`

  const cached = await getCache(cacheKey)
  if (cached) return res.json({ wordCount: cached })

  const text = await getTextByIdService(id)
  if (!text || text.createdBy !== userId) {
    res.status(404).json({ message: 'Text not found' })
    return
  }

  const wordCount = getWordCountService(text.content)
  await setCache(cacheKey, wordCount)
  res.status(200).json({ wordCount })
}

// API to return the number of characters (cache per user and text)
export const getCharacterCount = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const userId = req.user.id
  const cacheKey = `characterCount:${userId}:${id}`

  const cached = await getCache(cacheKey)
  if (cached) return res.json({ characterCount: cached })

  const text = await getTextByIdService(id)
  if (!text || text.createdBy !== userId) {
    res.status(404).json({ message: 'Text not found' })
    return
  }

  const characterCount = getCharacterCountService(text.content)
  await setCache(cacheKey, characterCount)
  res.status(200).json({ characterCount })
}

// API to return the number of sentences (cache per user and text)
export const getSentenceCount = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const userId = req.user.id
  const cacheKey = `sentenceCount:${userId}:${id}`

  const cached = await getCache(cacheKey)
  if (cached) return res.json({ sentenceCount: cached })

  const text = await getTextByIdService(id)
  if (!text || text.createdBy !== userId) {
    res.status(404).json({ message: 'Text not found' })
    return
  }

  const sentenceCount = getSentenceCountService(text.content)
  await setCache(cacheKey, sentenceCount)
  res.status(200).json({ sentenceCount })
}

// API to return the number of paragraphs (cache per user and text)
export const getParagraphCount = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const userId = req.user.id
  const cacheKey = `paragraphCount:${userId}:${id}`

  const cached = await getCache(cacheKey)
  if (cached) return res.json({ paragraphCount: cached })

  const text = await getTextByIdService(id)
  if (!text || text.createdBy !== userId) {
    res.status(404).json({ message: 'Text not found' })
    return
  }

  const paragraphCount = getParagraphCountService(text.content)
  await setCache(cacheKey, paragraphCount)
  res.status(200).json({ paragraphCount })
}

// API to return the longest words in paragraphs (cache per user and text)
export const getLongestWords = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const userId = req.user.id
  const cacheKey = `longestWords:${userId}:${id}`

  const cached = await getCache(cacheKey)
  if (cached) return res.json({ longestWords: cached })

  const text = await getTextByIdService(id)
  if (!text || text.createdBy !== userId) {
    res.status(404).json({ message: 'Text not found' })
    return
  }

  const longestWords = getLongestWordsService(text.content)
  await setCache(cacheKey, longestWords)
  res.status(200).json({ longestWords })
}

// Analyze text content and return all metrics (cache per user and text)
export const analyzeTextContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const userId = req.user.id
  const cacheKey = `analysis:${userId}:${id}`

  const cached = await getCache(cacheKey)
  if (cached) return res.json(cached)

  const text = await getTextByIdService(id)
  if (!text || text.createdBy !== userId) {
    res.status(404).json({ message: 'Text not found' })
    return
  }

  const wordCount = getWordCountService(text.content)
  const characterCount = getCharacterCountService(text.content)
  const sentenceCount = getSentenceCountService(text.content)
  const paragraphCount = getParagraphCountService(text.content)
  const longestWords = getLongestWordsService(text.content)

  const result = {
    wordCount,
    characterCount,
    sentenceCount,
    paragraphCount,
    longestWords,
  }

  await setCache(cacheKey, result)
  res.status(200).json(result)
}
