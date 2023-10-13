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
      const chat = state.data.find((ch)=>ch.users.some(user=>user.id===action.payload))
      if(chat){
        state.activeChat = chat
      }
    },
    appendMessage:(state,action)=>{
      state.data.find(ch=>ch.id===state.activeChat.id).messages.push(action.payload)
      state.activeChat.messages.push(action.payload)
    }
  }
})

export default chatroomSlice.reducer
export const {setUserChats,setActiveChat,appendMessage} = chatroomSlice.actions