import express from 'express'
import { upload } from '../middleware/uploadMiddleware.js'
const router = express.Router()
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js'

import { protect, admin, teacher } from '../middleware/authMiddleware.js'

// Get all courses
router.route('/').get(getCourses)

// Create new course (admin atau pengajar)
router.route('/').post(protect, upload.any(), createCourse)

// Get, update, and delete course by ID
router
  .route('/:id')
  .get(getCourseById)
  .put(protect, upload.any(), updateCourse)
  .delete(protect, admin, deleteCourse)

export default router
