const initialState = {
  loading: false,
  courses: [],
  error: null,
}

export const enrollmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MY_COURSES_REQUEST':
      return { ...state, loading: true }

    case 'MY_COURSES_SUCCESS':
      return { loading: false, courses: action.payload, error: null }

    case 'MY_COURSES_FAIL':
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
