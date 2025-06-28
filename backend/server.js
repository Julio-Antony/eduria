import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import postRoutes from './routes/postRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import scheduleRoutes from './routes/jadwalRoutes.js'
import classRoutes from './routes/classRoutes.js'
import mapelRoutes from './routes/mapelRoutes.js'
import activityRoutes from './routes/activityRoutes.js'
import categoryRoutes from './routes/kategoriRoutes.js'
import courseRoutes from './routes/courseRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json({
  limit: '100mb'
}));
app.use(express.urlencoded({
  limit: '100mb'
}));

app.use('/api/posts', postRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/schedule', scheduleRoutes)
app.use('/api/class', classRoutes)
app.use('/api/subject', mapelRoutes)
app.use('/api/activity', activityRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/courses', courseRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 2400

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)