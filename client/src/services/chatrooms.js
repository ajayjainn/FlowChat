import axios from 'axios'
const url = 'http://localhost:3000/room/chatrooms'

const get = async()=>{
  const res = await axios.get(url)
  return res.data
}
export default {
  get
}