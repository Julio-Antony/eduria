const initialState = {
  paymentHistory: [],
  result: null,     // hasil pembuatan pembayaran (snap token)
  status: null,     // status transaksi dari Midtrans
  loading: false,
  loadingStatus: false,
  error: null,
  errorStatus: null,
  courseFromOrder: null,
  loadingCourse: false,
  errorCourse: null,
}

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    // === CREATE PAYMENT ===
    case 'PAYMENT_CREATE_REQUEST':
      return { ...state, loading: true }

    case 'PAYMENT_CREATE_SUCCESS':
      return { ...state, loading: false, result: action.payload }

    case 'PAYMENT_CREATE_FAIL':
      return { ...state, loading: false, error: action.payload }

    // === CHECK PAYMENT STATUS ===
    case 'PAYMENT_STATUS_REQUEST':
      return { ...state, loadingStatus: true }

    case 'PAYMENT_STATUS_SUCCESS':
      return { ...state, loadingStatus: false, status: action.payload }

    case 'PAYMENT_STATUS_FAIL':
      return { ...state, loadingStatus: false, errorStatus: action.payload }

    // === CHECK PAYMENT COURSE ===
    case 'PAYMENT_COURSE_REQUEST':
      return { ...state, loadingCourse: true }

    case 'PAYMENT_COURSE_SUCCESS':
      return {
        ...state,
        loadingCourse: false,
        courseFromOrder: action.payload,
      }

    case 'PAYMENT_COURSE_FAIL':
      return {
        ...state,
        loadingCourse: false,
        errorCourse: action.payload,
      }

    case 'PAYMENT_HISTORY_REQUEST':
      return { ...state, loading: true }
    case 'PAYMENT_HISTORY_SUCCESS':
      return { ...state, loading: false, paymentHistory: action.payload }
    case 'PAYMENT_HISTORY_FAIL':
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
