const express = require('express')
const cors = require('cors')
require('dotenv').config()

// Import routes and middleware
const romanRoutes = require('./routes/roman')
const logger = require('./middleware/logger')
const connectDB = require('./config/db')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger)

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Roman to Integer API is running!' })
})

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.use('/api', romanRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
      console.log(`Health check: http://localhost:${PORT}/health`)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()
