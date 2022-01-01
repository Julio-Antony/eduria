import asyncHandler from 'express-async-handler'
import Kelas from '../models/kelasModel.js'

// @desc    Fetch all class
// @route   GET /api/class
// @access  Private/Admin

const getAllClass = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}

    const count = await Kelas.countDocuments({ ...keyword })
    const kelasCount = await Kelas.count({})
    const kelas = await Kelas.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ message: "ditemukan " + kelasCount + " kelas", kelas, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single class
// @route   GET /api/class/:id
// @access  Public
const getClassById = asyncHandler(async (req, res) => {
    const kelas = await Kelas.findById(req.params.id)

    if (kelas) {
        res.json(kelas)
    } else {
        res.status(404)
        throw new Error('Kelas tidak ditemukan')
    }
})

// @desc    Create a class
// @route   POST /api/class
// @access  Private/Admin

const createClass = asyncHandler(async (req, res) => {
    const kelas = new Kelas({
        nama_kelas: req.body.nama_kelas,
        wali_kelas: req.body.wali_kelas,
        user: req.user._id,
    })

    const createdClass = await kelas.save()
    res.status(201).json({ message: "Kelas berhasi dibuat !", createdClass })
})

// @desc    Update a Class
// @route   PUT /api/class/:id
// @access  Private/Admin

const updateClass = asyncHandler(async (req, res) => {
    const {
        nama_kelas,
        wali_kelas,
        jurusan,
        penyunting,
    } = req.body

    const kelas = await Kelas.findById(req.params.id)

    if (kelas) {
        kelas.nama_kelas = nama_kelas
        kelas.wali_kelas = wali_kelas
        kelas.jurusan = jurusan
        kelas.penyunting = penyunting

        const updatedClass = await kelas.save()
        res.json({ message: "Kelas berhasi diubah !", updatedClass })
    } else {
        res.status(404)
        throw new Error('Kelas tidak ditemukan')
    }
})

// @desc    Add a student to class
// @route   POST /api/posts/:id/student
// @access  Private
const addStudent = asyncHandler(async (req, res) => {

    const kelas = await Kelas.findById(req.params.id)

    if (kelas) {

        const student = {
            nama_siswa: req.body.nama_siswa,
            id: req.body.id,
        }

        kelas.daftar_siswa.push(student)

        await kelas.save()
        res.status(201).json({ message: 'Siswa ditambahkan', student })
    } else {
        res.status(404)
        throw new Error('Kelas tidak ditemukan')
    }
})

// @desc    Delete a class
// @route   DELETE /api/class/:id
// @access  Private/Admin
const deleteClass = asyncHandler(async (req, res) => {
    const kelas = await Kelas.findById(req.params.id)

    if (kelas) {
        await kelas.remove()
        res.json({ message: 'Kelas dihapus' })
    } else {
        res.status(404)
        throw new Error('Kelas tidak ditemukan')
    }
})

export { getAllClass, getClassById, createClass, addStudent, updateClass, deleteClass }