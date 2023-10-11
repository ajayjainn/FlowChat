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

const fetchCurrentUser = async (token)=>{
  const res = await axios.get(url+'/api/users',{headers:{authorization:`Bearer ${token}`}})
  return res
} 

const fetchUsers = async (token)=>{
  const res = await axios.get(url+'/api/users/all',{headers:{authorization:`Bearer ${token}`}})
  return res.data
}

const updateAvatar = async(token,formData)=>{
  const res = await axios.post(
    'http://localhost:3000/profile/avatar',
    formData,
    {headers:{
      'accept': 'application/json',
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      'authorization': `Bearer ${token}`
    }}
  )
  return res
}

const sendVerificationLink = async(token)=>{
  await axios.get(url+'/verify',{headers:{authorization:`Bearer ${token}`}})
}

export {register,login,fetchCurrentUser,fetchUsers,updateAvatar,sendVerificationLink}