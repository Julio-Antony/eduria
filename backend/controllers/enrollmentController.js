import Enrollment from '../models/enrollmentModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Ambil kursus yang diikuti user
// @route   GET /api/enrollments/my-courses
// @access  Private
export const getEnrolledCourses = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.user._id }).populate({
    path: 'course',
    populate: { path: 'category', model: 'Kategori' },
  })

  const courses = enrollments.map((e) => e.course)
  res.json(courses)
})

// @desc Enroll user ke kursus
// @route POST /api/enroll
// @access Private
export const enrollCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.body

  const exists = await Enrollment.findOne({
    user: req.user._id,
    course: courseId,
  })

  if (exists) {
    return res.status(400).json({ message: 'Kamu sudah terdaftar di kursus ini' })
  }

  const enroll = await Enrollment.create({
    user: req.user._id,
    course: courseId,
  })

  res.status(201).json(enroll)
})
