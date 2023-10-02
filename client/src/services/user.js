import axios from 'axios'

const url = 'http://localhost:3000'

const register =async (email,name,password)=>{
  const res = await axios.post(url+'/api/users',{email,name,password})
  return res
}

const login = async (email,password)=>{
  const res = await axios.post(url+'/login',{email,password})
  return res
}

const fetchUser = async (token)=>{
  const res = await axios.get(url+'/api/users',{headers:{authorization:`Bearer ${token}`}})
  return res
}

export {register,login,fetchUser}