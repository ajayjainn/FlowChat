import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState:[],
  reducers: {
    setUsers: (state, action) => {
      return action.payload
    }
  }
})

export default usersSlice.reducer
export const {setUsers} = usersSlice.actions