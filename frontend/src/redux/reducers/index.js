import { combineReducers } from "redux"
import ThemeReducer from "./ThemeReducer"
import { categoryListReducer } from './categoryReducer'

const rootReducer = combineReducers({
    ThemeReducer,
    categoryList: categoryListReducer,
})

export default rootReducer