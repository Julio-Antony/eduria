import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'
import path from 'path'
import fs from 'fs'

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Admin or Teacher)
export const createCourse = asyncHandler(async (req, res) => {
  const {
    fullname,
    shortname,
    description,
    summary,
    price,
    category,
    teacher,
    visible,
  } = req.body

  // sections dikirim sebagai JSON string karena multipart
  const sections = JSON.parse(req.body.sections || '[]')

  // Proses file modul
  if (req.files) {
    for (const field in req.files) {
      const [sectionIdx, moduleIdx] = field.split('_') // format: modulFile_0_1
      const file = req.files[field][0]
      const filePath = `/uploads/modul-files/${file.filename}`

      if (sections[sectionIdx] && sections[sectionIdx].modules[moduleIdx]) {
        sections[sectionIdx].modules[moduleIdx].file = filePath
      }
    }
  }

  const course = new Course({
    fullname,
    shortname,
    description,
    summary,
    price,
    category,
    thumbnail: req.body.thumbnail,
    teacher,
    visible,
    sections,
  })

  await course.save()
  res.status(201).json({ message: 'Kursus berhasil dibuat' })
})

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
  const {
    fullname,
    shortname,
    description,
    summary,
    price,
    category,
    teacher,
    visible,
  } = req.body

  const sections = JSON.parse(req.body.sections || '[]')

  // Proses file upload ke modul jika ada
  if (req.files && Array.isArray(req.files)) {
    for (const file of req.files) {
      // fieldname = 'modulFile_0_0'
      const [sectionIdx, moduleIdx] = file.fieldname.replace('modulFile_', '').split('_');
      const filePath = `/uploads/modul-files/${file.filename}`;

      if (sections[sectionIdx] && sections[sectionIdx].modules[moduleIdx]) {
        sections[sectionIdx].modules[moduleIdx].content = filePath;
      }
    }
  }

  const course = await Course.findById(req.params.id)

  if (!course) {
    res.status(404)
    throw new Error('Course not found')
  }

  course.fullname = fullname || course.fullname
  course.shortname = shortname || course.shortname
  course.description = description || course.description
  course.summary = summary || course.summary
  course.price = price ?? course.price
  course.category = category || course.category
  course.thumbnail = req.body.thumbnail || course.thumbnail
  course.teacher = teacher || course.teacher
  course.visible = visible ?? course.visible
  course.sections = sections || course.sections

  await course.save()

  res.json({ message: 'Kursus berhasil diubah' })
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
