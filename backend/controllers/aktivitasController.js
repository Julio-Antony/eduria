import asyncHandler from 'express-async-handler'
import Aktivitas from '../models/activityModel.js'

// @desc    Fetch all activity
// @route   GET /api/activity
// @access  Private/Admin

const getAllActivity = asyncHandler(async (req, res) => {
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

    const count = await Aktivitas.countDocuments({ ...keyword })
    const aktivtasCount = await Aktivitas.count({})
    const aktivitas = await Aktivitas.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ message: "ditemukan " + aktivtasCount + " Aktivitas", aktivitas, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Create a Activity
// @route   POST /api/activity
// @access  Private/Admin

const createActivity = asyncHandler(async (req, res) => {
    const aktivitas = new Aktivitas({
        nama_pengguna: req.body.nama_pengguna,
        nama_aktivitas: req.body.nama_aktivitas,
        status: req.body.status,
    })

    const createdActivity = await aktivitas.save()
    res.status(201).json({ message: "Aktivitas ditambahkan !", createdActivity })
})

export { getAllActivity, createActivity }