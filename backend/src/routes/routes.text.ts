import express from 'express'
import {
  createText,
  getTexts,
  getTextById,
  updateText,
  deleteText,
  analyzeTextContent,
  getWordCount,
  getCharacterCount,
  getSentenceCount,
  getParagraphCount,
  getLongestWords,
} from '../controllers/text.controller'
import { validate } from '../middlewares/validator'
import {
  createTextValidation,
  updateTextValidation,
  idValidation,
  getAllTextsValidation,
} from '../validators/text.crud.validator'
import { analyzeTextValidation } from '../validators/text.crud.validator'

const router = express.Router()

// CRUD routes
router.post('/', validate(createTextValidation, 'body'), createText)
router.get('/', validate(getAllTextsValidation, 'body'), getTexts)
router.get('/:id', validate(idValidation, 'params'), getTextById)
router.put(
  '/:id',
  validate(idValidation, 'params'),
  validate(updateTextValidation, 'body'),
  updateText
)
router.delete('/:id', validate(idValidation, 'params'), deleteText)

// Text analysis routes
router.get(
  '/:id/analyze',
  validate(analyzeTextValidation, 'params'),
  analyzeTextContent
)
router.get(
  '/:id/word-count',
  validate(analyzeTextValidation, 'params'),
  getWordCount
)
router.get(
  '/:id/character-count',
  validate(analyzeTextValidation, 'params'),
  getCharacterCount
)
router.get(
  '/:id/sentence-count',
  validate(analyzeTextValidation, 'params'),
  getSentenceCount
)
router.get(
  '/:id/paragraph-count',
  validate(analyzeTextValidation, 'params'),
  getParagraphCount
)
router.get(
  '/:id/longest-words',
  validate(analyzeTextValidation, 'params'),
  getLongestWords
)

export default router
