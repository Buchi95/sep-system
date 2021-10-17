import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'

// error middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// route for user and auth
import userRoutes from './routes/userRoutes.js'
// route for new event request
import newEventRequestRoutes from './routes/newEventRequestRoutes.js'
// route for client
import clientRoutes from './routes/clientRoutes.js'
// route for new event
import newEventRoutes from './routes/newEventRoutes.js'
// request routes
import requestRoutes from './routes/requestRoutes.js'

const app = express()

// for env variables
dotenv.config()

// for attractive debugging purpose
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// for parsing requests
app.use(express.json())

// to check backend is up and running
app.get('/', (_req, res) => {
  res.send('API is running...')
})

app.use('/api/users', userRoutes)
app.use('/api/event', newEventRequestRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/detailedevent', newEventRoutes)
app.use('/api/request', requestRoutes)

// adding errormiddlewares
app.use(notFound)
app.use(errorHandler)

// export app
export { app }
