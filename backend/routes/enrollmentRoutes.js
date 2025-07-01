import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { enrollCourse, getEnrolledCourses } from '../controllers/enrollmentController.js'

const router = express.Router()

router.post('/', protect, enrollCourse)
router.get('/my-courses', protect, getEnrolledCourses)

export default router