import express from 'express'
import { handleNotification } from '../controllers/paymentController.js'

const router = express.Router()

router.post('/webhook', express.json({ type: '*/*' }), handleNotification)

export default router
