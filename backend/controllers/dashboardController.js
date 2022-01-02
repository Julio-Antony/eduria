import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Kelas from '../models/kelasModel.js'
import Online from '../models/onlineModel.js'

// @desc    Fetch all data status
// @route   GET /api/dashboard
// @access  Private

const getStatus = asyncHandler(async (req, res) => {

    const admin = await User.count({ level: "admin" })
    const siswa = await User.count({ level: "siswa" })
    const guru = await User.count({ level: "guru" })
    const kelas = await Kelas.count({})

    res.json({ admin, siswa, guru, kelas })
})

// @desc    Fetch online users
// @route   GET /api/dashboard/online
// @access  Private

const getOnline = asyncHandler(async (req, res) => {

    const online = await Online.find({})

    res.json({ online })
})

// @desc    Manipulate
// @route   GET /api/dashboard/online
// @access  Private

// const getOnline = asyncHandler(async (req, res) => {

//     const online = await Online.find({})

//     res.json({ online })
// })

export { getStatus, getOnline }