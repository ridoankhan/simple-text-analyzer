import express from 'express'
import * as dotenv from 'dotenv'
import { initializeDatabase } from './config/database'
import textRoutes from './routes/routes.text'

const app = express()

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Initialize database connection
initializeDatabase()

app.use('/api/v1/texts', textRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to the text analyzer API')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

export default app
