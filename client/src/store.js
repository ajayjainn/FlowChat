import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './reducers/messageReducer.js'
import authReducer from './reducers/authReducer.js'

export default configureStore({
  reducer:{
    message:messageReducer,
    auth:authReducer
  }
})
