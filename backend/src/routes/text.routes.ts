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
import { isAuthenticated } from '../middlewares/auth.middleware'

const router = express.Router()

// CRUD routes
router.post(
  '/',
  validate(createTextValidation, 'body'),
  isAuthenticated,
  createText
)
router.get(
  '/',
  validate(getAllTextsValidation, 'body'),
  isAuthenticated,
  getTexts
)
router.get(
  '/:id',
  validate(idValidation, 'params'),
  isAuthenticated,
  getTextById
)
router.put(
  '/:id',
  validate(idValidation, 'params'),
  validate(updateTextValidation, 'body'),
  isAuthenticated,
  updateText
)
router.delete(
  '/:id',
  validate(idValidation, 'params'),
  isAuthenticated,
  deleteText
)

// Text analysis routes
router.get(
  '/:id/analyze',
  validate(analyzeTextValidation, 'params'),
  isAuthenticated,
  analyzeTextContent
)
router.get(
  '/:id/word-count',
  validate(analyzeTextValidation, 'params'),
  isAuthenticated,
  getWordCount
)
router.get(
  '/:id/character-count',
  validate(analyzeTextValidation, 'params'),
  isAuthenticated,
  getCharacterCount
)
router.get(
  '/:id/sentence-count',
  validate(analyzeTextValidation, 'params'),
  isAuthenticated,
  getSentenceCount
)
router.get(
  '/:id/paragraph-count',
  validate(analyzeTextValidation, 'params'),
  isAuthenticated,
  getParagraphCount
)
router.get(
  '/:id/longest-words',
  validate(analyzeTextValidation, 'params'),
  isAuthenticated,
  getLongestWords
)

export default router
