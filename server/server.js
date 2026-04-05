import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import projectRoutes from './routes/projects.js'
import blogRoutes from './routes/blogs.js'
import skillRoutes from './routes/skills.js'
import contactRoutes from './routes/contact.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

app.use('/api/projects', projectRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/contact', contactRoutes)

app.get('/', (req, res) => res.send('Portfolio API running'))

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    )
  })
  .catch(err => console.error('DB connection error:', err))