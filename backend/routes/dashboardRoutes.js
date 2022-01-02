import express from 'express'
const router = express.Router()
import { getStatus, getOnline } from '../controllers/dashboardController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin, getStatus)
router.route('/online').get(protect, admin, getOnline)

export default router