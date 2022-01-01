import express from 'express'
const router = express.Router()
import {
    getAllSubject,
    getSubjectById,
    createSubject,
    addChapter,
    updateSubject,
    deleteSubject
} from '../controllers/mapelController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getAllSubject).post(protect, admin, createSubject)
router.route('/:id/chapter').post(protect, admin, addChapter)
router
    .route('/:id')
    .get(getSubjectById)
    .delete(protect, admin, deleteSubject)
    .put(protect, admin, updateSubject)

export default router