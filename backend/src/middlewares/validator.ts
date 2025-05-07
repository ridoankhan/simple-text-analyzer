import { Schema } from 'joi'
import { Request, Response, NextFunction } from 'express'

export const validate = (schema: Schema, source: 'body' | 'params') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = req[source]
    const { error } = schema.validate(data, { abortEarly: false })

    if (error) {
      const messages = error.details.map((detail) => detail.message)
      res.status(400).json({ message: messages })
      return
    }

    next()
  }
}
