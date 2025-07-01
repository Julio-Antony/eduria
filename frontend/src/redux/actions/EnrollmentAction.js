import axios from 'axios'

export const getMyCourses = (token) => async (dispatch) => {
  try {
    dispatch({ type: 'MY_COURSES_REQUEST' })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get('/api/enrollments/my-courses', config)

    dispatch({
      type: 'MY_COURSES_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'MY_COURSES_FAIL',
      payload:
        error.response?.data?.message || error.message,
    })
  }
}
