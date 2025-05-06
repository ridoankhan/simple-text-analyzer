import express from 'express'
import * as dotenv from 'dotenv'

const app = express()

dotenv.config()

app.get('/', (req, res) => {
  res.send('Welcome to the text analyzer API')
})

const port = process.env.PORT || 3000

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

export default app
