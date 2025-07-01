import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

// Define constant lokal
const PAYMENT_REQUEST = 'PAYMENT_REQUEST'
const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS'
const PAYMENT_FAIL = 'PAYMENT_FAIL'

// Action creator
export const payForCourse = (course) => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_REQUEST })

    // Ambil token dari localStorage
    const token = localStorage.getItem('access_token')
    if (!token) throw new Error('Kamu belum login')

    // Decode untuk ambil data user
    const decoded = jwtDecode(token)

    // Buat payload
    const body = {
      orderId: `ORDER-${Date.now()}`,
      amount: course.price,
      fullname: decoded.nama || decoded.username || 'User', // atau bisa pakai 'nama' jika tersedia
      email: decoded.email || 'noemail@example.com',
      courseId: course._id,
    }

    const response = await fetch('/api/payments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    // Panggil Snap
    window.snap.pay(data.token, {
      onSuccess: (result) => {
        dispatch({ type: PAYMENT_SUCCESS, payload: result })
        alert('Pembayaran berhasil!')
      },
      onPending: (result) => {
        console.log('Menunggu pembayaran...', result)
      },
      onError: (error) => {
        console.error('Gagal:', error)
        dispatch({ type: PAYMENT_FAIL, payload: error.message })
        alert('Gagal saat pembayaran.')
      },
      onClose: () => {
        console.log('Pembayaran ditutup sebelum selesai.')
      },
    })
  } catch (error) {
    dispatch({
      type: PAYMENT_FAIL,
      payload: error.message,
    })
  }
}

export const checkPaymentStatus = (orderId, token) => async (dispatch) => {
  try {
    dispatch({ type: 'PAYMENT_STATUS_REQUEST' })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`/api/payments/status/${orderId}`, config)

    dispatch({
      type: 'PAYMENT_STATUS_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'PAYMENT_STATUS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCourseByOrderId = (orderId, token) => async (dispatch) => {
  try {
    dispatch({ type: 'PAYMENT_COURSE_REQUEST' })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`/api/payments/course/${orderId}`, config)

    dispatch({
      type: 'PAYMENT_COURSE_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'PAYMENT_COURSE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

