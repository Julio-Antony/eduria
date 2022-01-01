import express from 'express'
const router = express.Router()
import {
    getAllClass,
    createClass,
    addStudent,
    updateClass,
    deleteClass,
    getClassById,
} from '../controllers/classController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getAllClass).post(protect, admin, createClass)
router.route('/:id/student').post(protect, admin, addStudent)
router
    .route('/:id')
    .get(protect, admin, getClassById)
    .delete(protect, admin, deleteClass)
    .put(protect, admin, updateClass)

export default router