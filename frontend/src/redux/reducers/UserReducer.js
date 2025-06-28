const initialState = {
  users: [],
  userDetail: {},
  teachers: [],
  loading: false,
  error: null,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LIST_REQUEST':
    case 'USER_DETAIL_REQUEST':
    case 'USER_CREATE_REQUEST':
    case 'USER_UPDATE_REQUEST':
    case 'USER_DELETE_REQUEST':
    case 'TEACHER_LIST_REQUEST':
      return { ...state, loading: true }

    case 'USER_LIST_SUCCESS':
      return { ...state, loading: false, users: action.payload }

    case 'USER_DETAIL_SUCCESS':
      return { ...state, loading: false, userDetail: action.payload }

    case 'USER_CREATE_SUCCESS':
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
      }

    case 'USER_UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      }

    case 'USER_DELETE_SUCCESS':
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user._id !== action.payload),
      }

    case 'TEACHER_LIST_SUCCESS':
      return {
        ...state,
        loading: false,
        teachers: action.payload,
      }


    case 'USER_LIST_FAIL':
    case 'USER_DETAIL_FAIL':
    case 'USER_CREATE_FAIL':
    case 'USER_UPDATE_FAIL':
    case 'USER_DELETE_FAIL':
    case 'TEACHER_LIST_FAIL':
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
