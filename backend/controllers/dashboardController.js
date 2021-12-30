import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc    Fetch all data status
// @route   GET /api/dashboard
// @access  Private

const getStatus = asyncHandler(async (req, res) => {

    const admin = await User.count({ level: "admin" })
    const siswa = await User.count({ level: "siswa" })
    const guru = await User.count({ level: "guru" })
    const kelas = await User.count({ level: "kelas" })

    res.json({ admin, siswa, guru, kelas })
})

export default getStatus