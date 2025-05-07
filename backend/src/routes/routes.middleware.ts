import express from 'express'
import {
  createText,
  getTexts,
  getTextById,
  updateText,
  deleteText,
  analyzeTextContent,
} from '../controllers/text.controller'
import { validate } from '../middlewares/validator'
import {
  createTextValidation,
  updateTextValidation,
  idValidation,
  getAllTextsValidation,
} from '../validators/text.crud.validator'

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

// Text analysis route
router.get('/:id/analyze', validate(idValidation, 'params'), analyzeTextContent)

export default router
