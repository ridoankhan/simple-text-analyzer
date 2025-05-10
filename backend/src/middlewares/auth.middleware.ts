import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT secret is not configured' })
    }
    const decoded = jwt.verify(token, jwtSecret)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' })
  }
}
