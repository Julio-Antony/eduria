import { combineReducers } from "redux"
import ThemeReducer from "./ThemeReducer"
import { categoryListReducer } from './categoryReducer'
import { courseReducer } from './CourseReducer'
import { userReducer } from "./UserReducer"

const rootReducer = combineReducers({
    ThemeReducer,
    categoryList: categoryListReducer,
    course: courseReducer,
    user: userReducer
})

export default rootReducer