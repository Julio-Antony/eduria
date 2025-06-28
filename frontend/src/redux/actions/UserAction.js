import axios from 'axios'
import swal from 'sweetalert'

const token = localStorage.getItem('access_token')
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}

// Get all users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LIST_REQUEST' })

    const { data } = await axios.get('/api/users', config)

    dispatch({ type: 'USER_LIST_SUCCESS', payload: data })
  } catch (error) {
    swal('Gagal', error.response?.data?.message || error.message, 'error')
    dispatch({
      type: 'USER_LIST_FAIL',
      payload: error.response?.data?.message || error.message,
    })
  }
}

// Get user by ID
export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_DETAIL_REQUEST' })

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({ type: 'USER_DETAIL_SUCCESS', payload: data })
  } catch (error) {
    swal('Gagal', error.response?.data?.message || error.message, 'error')
    dispatch({
      type: 'USER_DETAIL_FAIL',
      payload: error.response?.data?.message || error.message,
    })
  }
}

// Create user
export const createUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_CREATE_REQUEST' })

    const { data } = await axios.post('/api/users', userData, config)

    swal('Berhasil', 'Pengguna berhasil ditambahkan', 'success')
    dispatch({ type: 'USER_CREATE_SUCCESS', payload: data })
  } catch (error) {
    swal('Gagal', error.response?.data?.message || error.message, 'error')
    dispatch({
      type: 'USER_CREATE_FAIL',
      payload: error.response?.data?.message || error.message,
    })
  }
}

// Update user
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_UPDATE_REQUEST' })

    const { data } = await axios.put(`/api/users/${id}`, userData, config)

    swal('Berhasil', 'Pengguna berhasil diperbarui', 'success')
    dispatch({ type: 'USER_UPDATE_SUCCESS', payload: data })
  } catch (error) {
    swal('Gagal', error.response?.data?.message || error.message, 'error')
    dispatch({
      type: 'USER_UPDATE_FAIL',
      payload: error.response?.data?.message || error.message,
    })
  }
}

// Delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_DELETE_REQUEST' })

    await axios.delete(`/api/users/${id}`, config)

    swal('Berhasil', 'Pengguna berhasil dihapus', 'success')
    dispatch({ type: 'USER_DELETE_SUCCESS', payload: id })
  } catch (error) {
    swal('Gagal', error.response?.data?.message || error.message, 'error')
    dispatch({
      type: 'USER_DELETE_FAIL',
      payload: error.response?.data?.message || error.message,
    })
  }
}

export const getAllTeachers = () => async (dispatch) => {
  try {
    dispatch({ type: 'TEACHER_LIST_REQUEST' })

    const token = localStorage.getItem('access_token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get('/api/users/teachers', config)

    dispatch({
      type: 'TEACHER_LIST_SUCCESS',
      payload: data.teachers, // sesuai struktur { teachers, count, ... }
    })
  } catch (error) {
    swal('Gagal', error.response?.data?.message || error.message, 'error')
    dispatch({
      type: 'TEACHER_LIST_FAIL',
      payload: error.response?.data?.message || error.message,
    })
  }
}
