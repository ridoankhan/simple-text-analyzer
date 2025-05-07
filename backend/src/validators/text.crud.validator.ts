import Joi from 'joi'

export const createTextValidation = Joi.object({
  content: Joi.string().required().min(1).messages({
    'string.empty': 'Content is required and must be a non-empty string.',
    'string.min': 'Content must be at least 1 character long.',
  }),
  createdBy: Joi.string().required().min(1).messages({
    'string.empty': 'CreatedBy is required and must be a non-empty string.',
    'string.min': 'CreatedBy must be at least 1 character long.',
  }),
})

export const updateTextValidation = Joi.object({
  content: Joi.string().required().min(1).messages({
    'string.empty': 'Content is required and must be a non-empty string.',
    'string.min': 'Content must be at least 1 character long.',
  }),
})

export const idValidation = Joi.object({
  id: Joi.string().uuid().messages({
    'string.guid': 'Invalid ID format. Must be a valid UUID.',
  }),
})

export const analyzeTextValidation = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.empty': 'ID is required.',
    'string.guid': 'Invalid ID format. Must be a valid UUID.',
  }),
})

export const getAllTextsValidation = Joi.object({})
