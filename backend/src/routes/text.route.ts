import express from 'express';
import {
  createText,
  getTexts,
  getTextById,
  updateText,
  deleteText,
  analyzeTextContent,
} from '../controllers/text.controller';

const router = express.Router();

// CRUD routes
router.post('/', createText);
router.get('/', getTexts);
router.get('/:id', getTextById);
router.put('/:id', updateText);
router.delete('/:id', deleteText);

// Text analysis route
router.get('/:id/analyze', analyzeTextContent);

export default router;