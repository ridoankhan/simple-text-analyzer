import { Request, Response } from 'express';
import Text from '../models/text.model';
import { analyzeText } from '../services/text.service';

// Create a new text entry
export const createText = async (req: Request, res: Response): Promise<void> => {
  const { content, createdBy } = req.body;

  if (!content || !createdBy) {
    res.status(400).json({ message: 'Content and createdBy are required' });
    return;
  }

  try {
    const text = await Text.create({ content, createdBy });
    res.status(201).json(text);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create text', error });
  }
};

// Get all text entries
export const getTexts = async (req: Request, res: Response): Promise<void> => {
  try {
    const texts = await Text.findAll();
    res.status(200).json(texts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch texts', error });
  }
};

// Get a single text entry by ID
export const getTextById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const text = await Text.findByPk(id);
    if (!text) {
      res.status(404).json({ message: 'Text not found' });
      return;
    }
    res.status(200).json(text);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch text', error });
  }
};

// Update a text entry
export const updateText = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const text = await Text.findByPk(id);
    if (!text) {
      res.status(404).json({ message: 'Text not found' });
      return;
    }

    text.content = content;
    await text.save();
    res.status(200).json(text);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update text', error });
  }
};

// Delete a text entry
export const deleteText = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const text = await Text.findByPk(id);
    if (!text) {
      res.status(404).json({ message: 'Text not found' });
      return;
    }

    await text.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete text', error });
  }
};

// Analyze a text entry
export const analyzeTextContent = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const text = await Text.findByPk(id);
    if (!text) {
      res.status(404).json({ message: 'Text not found' });
      return;
    }

    const analysis = analyzeText(text.content);
    res.status(200).json(analysis);
  } catch (error) {
    res.status(500).json({ message: 'Failed to analyze text', error });
  }
};