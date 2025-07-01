import { combineReducers } from "redux"
import ThemeReducer from "./ThemeReducer"
import { categoryListReducer } from './categoryReducer'
import { courseReducer } from './CourseReducer'
import { userReducer } from "./UserReducer"
import { paymentReducer } from "./PaymentReducer"
import { enrollmentReducer } from "./EnrollmentReducer"

const rootReducer = combineReducers({
    ThemeReducer,
    categoryList: categoryListReducer,
    course: courseReducer,
    payment: paymentReducer,
    enrollment: enrollmentReducer,
    user: userReducer
})

export default rootReducer