import express from 'express'
const router = express.Router()
import {
    getAllActivity,
    createActivity,
} from '../controllers/aktivitasController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin, getAllActivity).post(createActivity)

export default router