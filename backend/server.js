import path from 'path'
// import { google } from 'googleapis'
// import fs from 'fs'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

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

// const CLIENT_ID = '942004389441-bahc9c6jabpdo2qe4hig8uo6qd5u90uu.apps.googleusercontent.com'
// const CLIENT_SECRET = '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'
// const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
// const REFRESH_TOKEN = '1//04ohZc1f2AxPDCgYIARAAGAQSNwF-L9Ir02cJBjPHHT54Bm4lW1OMJ6jOjoOhzUhVL1XzwOmH9vcEsAhN4iMqyWsiN9c0Z9uVfr0'

// const oauth2Client = new google.auth.OAuth2(
//   CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
// )

// oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

// const drive = google.drive({
//   version: 'v3',
//   auth: oauth2Client
// })

// const filePath = path.join(__dirname, 'controllers/anonim.jpg')

// async function uploadFile() {
//   try {
//     const response = await drive.files.create({
//       requestBody: {
//         name: 'anonim.jpg',
//         mimeType: 'image/jpg'
//       },
//       media: {
//         mimeType: 'image/jpg',
//         body: fs.createReadStream(filePath)
//       }
//     })
//     console.log(response.data)
//   } catch (error) {
//     console.log(error)
//   }
// }

// uploadFile()

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

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

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
