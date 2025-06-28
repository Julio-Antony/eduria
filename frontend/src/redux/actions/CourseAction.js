import axios from 'axios'
import swal from 'sweetalert'

const token = localStorage.getItem('access_token')
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}

// Get all courses
export const getAllCourses = () => async (dispatch) => {
  try {
    dispatch({ type: 'COURSE_LIST_REQUEST' })

    const { data } = await axios.get('/api/courses', config)

    dispatch({ type: 'COURSE_LIST_SUCCESS', payload: data })
  } catch (error) {
    swal('Gagal', error.response?.data?.message || error.message, 'error')
    dispatch({
      type: 'COURSE_LIST_FAIL',
      payload: error.response?.data?.message || error.message,
    })
  }
}

// Get course by ID
export const getCourseById = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'COURSE_DETAIL_REQUEST' })

    const { data } = await axios.get(`/api/courses/${id}`, config)

    dispatch({ type: 'COURSE_DETAIL_SUCCESS', payload: data })
  } catch (error) {
    swal('Gagal', error.response?.data?.message || error.message, 'error')
    dispatch({
      type: 'COURSE_DETAIL_FAIL',
      payload: error.response?.data?.message || error.message,
    })
  }
}

// Create course
export const createCourse = (courseData) => async (dispatch) => {
  try {
    dispatch({ type: 'COURSE_CREATE_REQUEST' })

    const { data } = await axios.post('/api/courses', courseData, config)

    swal('Berhasil', 'Kursus berhasil dibuat', 'success')
    dispatch({ type: 'COURSE_CREATE_SUCCESS', payload: data })
  } catch (error) {
    swal('Gagal', error.response?.data?.message || error.message, 'error')
    dispatch({
      type: 'COURSE_CREATE_FAIL',
      payload: error.response?.data?.message || error.message,
    })
  }
}

// Update course
export const updateCourse = (id, courseData) => async (dispatch) => {
  try {
    dispatch({ type: 'COURSE_UPDATE_REQUEST' })

    const { data } = await axios.put(`/api/courses/${id}`, courseData, config)

    swal('Berhasil', 'Kursus berhasil diperbarui', 'success')
    dispatch({ type: 'COURSE_UPDATE_SUCCESS', payload: data })
  } catch (error) {
    swal('Gagal', error.response?.data?.message || error.message, 'error')
    dispatch({
      type: 'COURSE_UPDATE_FAIL',
      payload: error.response?.data?.message || error.message,
    })
  }
}

// Delete course
export const deleteCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'COURSE_DELETE_REQUEST' })

    await axios.delete(`/api/courses/${id}`, config)

    swal('Berhasil', 'Kursus berhasil dihapus', 'success')
    dispatch({ type: 'COURSE_DELETE_SUCCESS', payload: id })
  } catch (error) {
    swal('Gagal', error.response?.data?.message || error.message, 'error')
    dispatch({
      type: 'COURSE_DELETE_FAIL',
      payload: error.response?.data?.message || error.message,
    })
  }
}
