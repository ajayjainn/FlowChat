import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer.js'
import alertReducer from './reducers/alertReducer.js'
import chatroomReducer from './reducers/chatroomReducer.js'
import usersReducer from './reducers/usersReducer.js'

export default configureStore({
  reducer:{
    alert:alertReducer,
    auth:authReducer,
    chatrooms:chatroomReducer,
    users:usersReducer
  }
})
