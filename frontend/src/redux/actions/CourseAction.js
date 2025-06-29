import axios from 'axios'
import swal from 'sweetalert'

const token = localStorage.getItem('access_token')
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}

const buildCourseFormData = (data) => {
  const formData = new FormData()

  formData.append('fullname', data.fullname)
  formData.append('shortname', data.shortname)
  formData.append('description', data.description || '')
  formData.append('summary', data.summary || '')
  formData.append('price', data.price || 0)
  formData.append('category', data.category)
  formData.append('teacher', data.teacher)
  formData.append('visible', data.visibility ? 'true' : 'false')
  formData.append('thumbnail', data.thumbnail || '')

  // Tambah sections
  formData.append('sections', JSON.stringify(data.sections))

  // Upload file jika ada
  data.sections?.forEach((section, sIdx) => {
    section.modules?.forEach((mod, mIdx) => {
      if (mod.type === 'file' && mod.file instanceof File) {
        formData.append(`modulFile_${sIdx}_${mIdx}`, mod.file)
      }
    })
  })

  return formData
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

// CREATE COURSE
export const createCourse = (courseData) => async (dispatch) => {
  try {
    dispatch({ type: 'COURSE_CREATE_REQUEST' })

    const token = localStorage.getItem('access_token')
    const formData = buildCourseFormData(courseData)

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.post('/api/courses', formData, config)

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

    const token = localStorage.getItem('access_token')
    const formData = buildCourseFormData(courseData)

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.put(`/api/courses/${id}`, formData, config)

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
