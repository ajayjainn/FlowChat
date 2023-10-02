import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name:'auth',
  initialState:{user:null},
  reducers:{
    setUser(state,action){
      state.user = action.payload
    },
    removeUser(state){
      state.user=null
    }
  }
})

export default authSlice.reducer
export const {setUser,removeUser} = authSlice.actions