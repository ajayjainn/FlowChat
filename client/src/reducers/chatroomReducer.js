import { createSlice } from '@reduxjs/toolkit'

const chatroomSlice = createSlice({
  name: 'chatrooms',
  initialState:{
    data:[],
    activeChat:null
  },
  reducers: {
    setUserChats: (state, action) => {
      state.data=action.payload
    },
    setActiveChat: (state,action) => {
      const chat = state.data.find((ch)=>ch.users.some(user=>user._id===action.payload))
      if(chat){
        state.activeChat = chat
      }
    }
  }
})

export default chatroomSlice.reducer
export const {setUserChats,setActiveChat} = chatroomSlice.actions