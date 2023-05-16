import {  combineReducers,createStore} from "redux"
import CourseReducer from "./reducers/CourseReducer"
const mainReducer= combineReducers({
    CourseReducer
})

const store=createStore(mainReducer)

export default store


