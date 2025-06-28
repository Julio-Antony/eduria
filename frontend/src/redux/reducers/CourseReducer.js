const initialState = {
  courses: [],
  courseDetail: {},
  loading: false,
  error: null,
}

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COURSE_LIST_REQUEST':
    case 'COURSE_DETAIL_REQUEST':
    case 'COURSE_CREATE_REQUEST':
    case 'COURSE_UPDATE_REQUEST':
    case 'COURSE_DELETE_REQUEST':
      return { ...state, loading: true }

    case 'COURSE_LIST_SUCCESS':
      return { ...state, loading: false, courses: action.payload }

    case 'COURSE_DETAIL_SUCCESS':
      return { ...state, loading: false, courseDetail: action.payload }

    case 'COURSE_CREATE_SUCCESS':
      return {
        ...state,
        loading: false,
        courses: [...state.courses, action.payload],
      }

    case 'COURSE_UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
        courses: state.courses.map((course) =>
          course._id === action.payload._id ? action.payload : course
        ),
      }

    case 'COURSE_DELETE_SUCCESS':
      return {
        ...state,
        loading: false,
        courses: state.courses.filter((course) => course._id !== action.payload),
      }

    case 'COURSE_LIST_FAIL':
    case 'COURSE_DETAIL_FAIL':
    case 'COURSE_CREATE_FAIL':
    case 'COURSE_UPDATE_FAIL':
    case 'COURSE_DELETE_FAIL':
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
