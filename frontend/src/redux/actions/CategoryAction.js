import axios from 'axios'
import swal from 'sweetalert'

// Fungsi ambil config dengan token
const getAuthConfig = () => {
  const token = localStorage.getItem('access_token')
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
}

// 🔁 List Semua Kategori
export const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: 'CATEGORY_LIST_REQUEST' })

    const { data } = await axios.get('/api/categories', getAuthConfig())

    dispatch({ type: 'CATEGORY_LIST_SUCCESS', payload: data })
  } catch (error) {
    const message = error.response?.data?.message || error.message

    dispatch({
      type: 'CATEGORY_LIST_FAIL',
      payload: message,
    })

    swal("Gagal!", message, "error")
  }
}

export const createCategory = (categoryData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('access_token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.post('/api/categories', categoryData, config)

    dispatch({ type: 'CATEGORY_CREATE_SUCCESS', payload: data })

    swal('Sukses', 'Kategori berhasil ditambahkan', 'success')
  } catch (error) {
    swal('Gagal', error.response?.data?.message || error.message, 'error')
  }
}

// ✏️ Update Kategori
export const updateCategory = (id, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: 'CATEGORY_UPDATE_REQUEST' })

    const { data } = await axios.put(`/api/categories/${id}`, categoryData, getAuthConfig())

    dispatch({ type: 'CATEGORY_UPDATE_SUCCESS', payload: data })

    swal("Berhasil!", data.message || "Kategori berhasil diperbarui", "success")
  } catch (error) {
    const message = error.response?.data?.message || error.message

    dispatch({
      type: 'CATEGORY_UPDATE_FAIL',
      payload: message,
    })

    swal("Gagal!", message, "error")
  }
}

export const deleteCategory = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('access_token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    await axios.delete(`/api/categories/${id}`, config)

    dispatch({ type: 'CATEGORY_DELETE_SUCCESS', payload: id })

    swal('Sukses', 'Kategori berhasil dihapus', 'success')
  } catch (error) {
    swal('Gagal', error.response?.data?.message || error.message, 'error')
  }
}
