import express from 'express'
import multer from 'multer'
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})

const upload = multer({storage});

router.route('/').get(getAllSubject).post(protect, admin, createSubject)
router.route('/:id/chapter').post(protect, upload.single("attachment"), addChapter)
router
    .route('/:id')
    .get(getSubjectById)
    .delete(protect, admin, deleteSubject)
    .put(protect, admin, updateSubject)

export default router