import {  combineReducers,createStore} from "redux"
import CourseReducer from "./reducers/CourseReducer"
import { persistStore,persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
const persistConfig ={
    "key":'mazhar',
    storage
} 
const CourseReducer1=persistReducer(persistConfig,CourseReducer)
const mainReducer= combineReducers({
    CourseReducer1
})

const store=createStore(mainReducer)
const  persistStorage =persistStore(store)
export default store
export {persistStorage}

