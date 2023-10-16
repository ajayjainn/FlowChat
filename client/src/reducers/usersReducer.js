import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState:[],
  reducers: {
    setUsers: (state, action) => {
      return action.payload
    },
    resetUsers:() => {
      return []
    }
  }
})

export default usersSlice.reducer
export const {setUsers,resetUsers} = usersSlice.actions