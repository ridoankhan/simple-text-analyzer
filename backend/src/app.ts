import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import './config/passport'
import textRoutes from './routes/text.routes'
import authRoutes from './routes/auth.routes'
import { apiRateLimiter } from './middlewares/rateLimiter'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

// Apply rate limiter globally
app.use(apiRateLimiter)

app.use('/api/v1/texts', textRoutes)
app.use('/api/v1/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to the text analyzer API')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
