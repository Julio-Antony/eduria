import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Admin or Teacher)
export const createCourse = asyncHandler(async (req, res) => {
  const {
    shortname,
    fullname,
    description,
    price,
    category,
    thumbnail,
    visibility,
    teacher,
  } = req.body;

  const course = new Course({
    shortname,
    fullname,
    description,
    price,
    category,
    thumbnail,
    visibility,
    teacher,
  });

  await course.save();
  res.status(201).json({message: "Kursus berhasil dibuat"});
});

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find()
    .populate('teacher', 'nama email')
    .populate('category', 'name')

  res.json(courses)
})

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
export const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate('teacher', 'nama email')
    .populate('category', 'name')

  if (course) {
    res.json(course)
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Admin or Owner)
export const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    course.title = req.body.title || course.title
    course.description = req.body.description || course.description
    course.price = req.body.price || course.price
    course.category = req.body.category || course.category
    course.teacher = req.body.teacher || course.teacher
    course.thumbnail = req.body.thumbnail || course.thumbnail
    course.visibility = req.body.visibility !== undefined ? req.body.visibility : course.visibility

    await course.save()
    res.json({message: "Kursus berhasil diubah"})
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Admin or Owner)
export const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    await course.remove()
    res.json({ message: 'Course dihapus' })
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})
