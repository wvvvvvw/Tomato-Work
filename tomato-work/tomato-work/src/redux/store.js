import {configureStore} from '@reduxjs/toolkit'
// 引入 reducer
import todoReducer from './features/todoSlice'
import actReducer from './features/actSlice'
import rmdReducer from './features/reminderSlice'
import focusReducer from './features/focusSlice'

export default configureStore({
    reducer:{
        todo:todoReducer,
        activity:actReducer,
        reminder:rmdReducer,
        focus:focusReducer
    }
})