import express from 'express'
const router = express.Router()
import {
    getAllSchedule,
    getScheduleByClass,
    createSchedule,
    createSession,
    updateSchedule,
    deleteSchedule
} from '../controllers/jadwalController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getAllSchedule).post(protect, admin, createSchedule)
router.route('/:id/session').post(protect, admin, createSession)
router.route('/:class').get(protect, getScheduleByClass)
router
    .route('/:id')
    .delete(protect, admin, deleteSchedule)
    .put(protect, admin, updateSchedule)

export default router