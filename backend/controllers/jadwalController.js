import asyncHandler from 'express-async-handler'
import Jawdal from '../models/jadwalModel.js'

// @desc    Fetch all schedule
// @route   GET /api/schedule
// @access  Private/Admin

const getAllSchedule = asyncHandler(async (req, res) => {
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

    const count = await Jawdal.countDocuments({ ...keyword })
    const jadwal = await Jawdal.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ jadwal, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch schedule
// @route   GET /api/schedule/:class
// @access  Public
const getScheduleByClass = asyncHandler(async (req, res) => {
    const jadwal = await Jawdal.find({ kelas: req.params.class })

    if (jadwal) {
        res.json(jadwal)
    } else {
        res.status(404)
        throw new Error('Jadwal tidak ditemukan')
    }
})

// @desc    Create a schedule
// @route   POST /api/schedule
// @access  Private/Guru

const createSchedule = asyncHandler(async (req, res) => {
    const jadwal = new Jawdal({
        kelas: req.body.kelas,
        hari: req.body.hari,
        user: req.user._id,
    })

    const createdSchedule = await jadwal.save()
    res.status(201).json({ message: "Jadwal berhasi dibuat !", createdSchedule })
})

// @desc    Update a Schedule
// @route   PUT /api/schedule/:id
// @access  Private/Admin

const updateSchedule = asyncHandler(async (req, res) => {
    const {
        kelas,
        hari,
        penyunting,
    } = req.body

    const jadwal = await Jawdal.findById(req.params.id)

    if (jadwal) {
        jadwal.kelas = kelas
        jadwal.hari = hari
        jadwal.penyunting = penyunting

        const updatedSchedule = await jadwal.save()
        res.json({ message: "Jadwal berhasi diubah !", updatedSchedule })
    } else {
        res.status(404)
        throw new Error('Jadwal tidak ditemukan')
    }
})

// @desc    Create new comment
// @route   POST /api/posts/:id/komentar
// @access  Private
const createSession = asyncHandler(async (req, res) => {

    const jadwal = await Jawdal.findById(req.params.id)

    if (jadwal) {

        const session = {
            waktu: req.body.waktu,
            mapel: req.body.mapel,
            user: req.user._id,
        }

        jadwal.sesi.push(session)

        await jadwal.save()
        res.status(201).json({ message: 'Sesi ditambahkan', session })
    } else {
        res.status(404)
        throw new Error('Jadwal tidak di temukan')
    }
})

// @desc    Delete a schedule
// @route   DELETE /api/schedule/:id
// @access  Private/Admin
const deleteSchedule = asyncHandler(async (req, res) => {
    const jadwal = await Jawdal.findById(req.params.id)

    if (jadwal) {
        await jadwal.remove()
        res.json({ message: 'Jadwal dihapus' })
    } else {
        res.status(404)
        throw new Error('Jadwal tidak ditemukan')
    }
})

export { getAllSchedule, getScheduleByClass, createSchedule, createSession, updateSchedule, deleteSchedule }