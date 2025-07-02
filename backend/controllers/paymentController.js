import axios from 'axios'
import asyncHandler from 'express-async-handler'
import Payment from '../models/paymentModel.js'
import User from '../models/userModel.js'

// @desc    Create Snap payment token
// @route   POST /api/payments/create
// @access  Private (user must be logged in)
export const createSnapToken = asyncHandler(async (req, res) => {
  const { orderId, amount, fullname, email, courseId } = req.body

  if (!orderId || !amount || !fullname || !email || !courseId) {
    res.status(400)
    throw new Error('Data pembayaran tidak lengkap')
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY
  const base64Key = Buffer.from(serverKey + ':').toString('base64')

  const payload = {
    transaction_details: {
      order_id: orderId,
      gross_amount: amount,
    },
    customer_details: {
      first_name: fullname,
      email: email,
    },
  }

  await Payment.create({
    order_id: orderId,
    user: req.user._id,
    course: courseId, // pastikan dikirim dari frontend
    amount,
    transaction_status: 'pending',
  })

  const { data } = await axios.post(
    'https://app.sandbox.midtrans.com/snap/v1/transactions',
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64Key}`,
      },
    }
  )

  res.json({ token: data.token })
})

// @desc    Cek status pembayaran dari Midtrans
// @route   GET /api/payments/status/:orderId
// @access  Private
export const checkPaymentStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params

  const serverKey = process.env.MIDTRANS_SERVER_KEY
  const base64Key = Buffer.from(serverKey + ':').toString('base64')

  const { data } = await axios.get(
    `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
    {
      headers: {
        Authorization: `Basic ${base64Key}`,
      },
    }
  )

  // Update DB jika ada status settlement
  const payment = await Payment.findOne({ order_id: orderId })
  if (payment && data.transaction_status === 'settlement') {
    payment.transaction_status = 'settlement'
    payment.paid_at = new Date()
    await payment.save()

    // 🚀 Auto-enroll ke kursus
    // Tambahkan logika enroll di sini
  }

  res.json(data)
})

// @desc    Ambil detail kursus berdasarkan order_id pembayaran
// @route   GET /api/payments/course/:orderId
// @access  Private
export const getCourseByOrderId = asyncHandler(async (req, res) => {
  const { orderId } = req.params

  const payment = await Payment.findOne({ order_id: orderId }).populate('course')

  if (!payment) {
    res.status(404)
    throw new Error('Pembayaran tidak ditemukan')
  }

  if (!payment.course) {
    res.status(404)
    throw new Error('Kursus tidak ditemukan')
  }

  res.json(payment.course)
})

// @desc    Ambil riwayat pembayaran user
// @route   GET /api/payments/history
// @access  Private
export const getPaymentHistory = asyncHandler(async (req, res) => {
  // Cari user lengkap berdasarkan _id dari token
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error('User tidak ditemukan')
  }

  let payments

  if (user.level === 'admin') {
    // Admin: semua pembayaran
    payments = await Payment.find()
      .populate('user', 'username email')
      .populate('course', 'fullname')
      .sort({ createdAt: -1 })
  } else {
    // Siswa/guru: hanya pembayaran milik sendiri
    payments = await Payment.find({ user: req.user._id })
      .populate('course', 'fullname')
      .sort({ createdAt: -1 })
  }

  res.json(payments)
})