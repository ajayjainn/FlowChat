import { createSlice } from '@reduxjs/toolkit'

const chatroomSlice = createSlice({
  name: 'chatrooms',
  initialState: {
    data: [],
    activeChat: null
  },
  reducers: {
    setUserChats: (state, action) => {
      state.data = action.payload
    },
    setActiveChat: (state, action) => {
      const chat = state.data.find((ch) => ch.users.some(user => user.id === action.payload))
      if (chat) {
        state.activeChat = chat
      }
    },
    appendMessage: (state, action) => {
      const chatRoomId = action.payload.chatRoomId
      console.log(action.payload)
      const chatRoomClient = state.data.find(ch => ch.id === chatRoomId)

      if (chatRoomClient) {
        const msg = {...action.payload,from:action.payload.from}
        state.data.find(ch => ch.id === chatRoomId).messages.push(msg)
        const activeChatId = state.activeChat.id
        if (chatRoomId === activeChatId) {
          state.activeChat = state.data.find(ch => ch.id === activeChatId)
        }
      }

    }
  }
})

export default chatroomSlice.reducer
export const { setUserChats, setActiveChat, appendMessage } = chatroomSlice.actions