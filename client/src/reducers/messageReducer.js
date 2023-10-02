import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    type:null,
    value: null
  },
  reducers: {
    setMessage: (state, action) => {
      state = action.payload
      return action.payload
    }
  }
})

export default messageSlice.reducer
export const {setMessage} = messageSlice.actions