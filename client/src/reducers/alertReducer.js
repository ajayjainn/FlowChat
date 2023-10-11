import { createSlice } from '@reduxjs/toolkit'

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    type:null,
    value: null
  },
  reducers: {
    setAlert: (state, action) => {
      state = action.payload
      return action.payload
    }
  }
})

export default alertSlice.reducer
export const {setAlert} = alertSlice.actions