import { app } from './app.js'
// connect to MongoDB
import connectDB from './config/db.js'

// connect to DB
connectDB()

// selecting port
const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
