import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user || bcrypt.compareSync(password, user.passwordHash)) {
    res.json({
      email:user.email,
      nama: user.nama,
      level: user.level,
      kelas: user.kelas || "",
      foto: user.foto || "",
      token: generateToken(user._id),
    })
  } else {
    res.status(401).json({ password: bcrypt.hashSync(password, 10) })
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { nama, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User sudah dipakai !')
  }

  const user = await User.create({
    nama,
    email,
    password: bcrypt.hashSync(password, 10),
    level: "siswa",
    isVerified: true,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      nama: user.nama,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      data: user
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
        ? {
            email: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}

    const count = await User.countDocuments({ ...keyword })
    const users = await User.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ users, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.nama = req.body.nama || user.nama
    user.kelas = req.body.kelas || user.kelas
    user.email = req.body.email || user.email
    user.level = req.body.level || user.level
    user.foto = req.body.foto || user.foto
    user.identitas.no_induk = req.body.no_induk || user.identitas.no_induk
    user.identitas.jenis_kelamin = req.body.jenis_kelamin || user.identitas.jenis_kelamin
    user.identitas.agama = req.body.agama || user.identitas.agama
    user.identitas.tempat_lahir = req.body.tempat_lahir || user.identitas.tempat_lahir
    user.identitas.tanggal_lahir = req.body.tanggal_lahir || user.identitas.tanggal_lahir
    user.identitas.no_telepon = req.body.no_telepon || user.identitas.no_telepon
    user.identitas.alamat = req.body.alamat || user.identitas.alamat

    const updatedUser = await user.save()

    res.json({
      data:
      {
        updatedUser
      }
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
