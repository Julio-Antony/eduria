import express from 'express'
const router = express.Router()
import getStatus from '../controllers/dashboardController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin, getStatus)

export default router