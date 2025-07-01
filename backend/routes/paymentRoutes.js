import express from 'express'
import { checkPaymentStatus, createSnapToken, getCourseByOrderId } from '../controllers/paymentController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/create', protect, createSnapToken)
router.get('/course/:orderId', protect, getCourseByOrderId)
router.get('/status/:orderId', protect, checkPaymentStatus)

export default router
