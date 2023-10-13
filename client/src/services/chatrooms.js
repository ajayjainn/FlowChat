import axios from 'axios'
const url = 'http://localhost:3000/api/rooms'

const get = async (token) => {
  const res = await axios.get(url, { headers: { authorization: `Bearer ${token}` } })
  return res.data
}

const create = async (token, receiver) => {
  const res = await axios.post(url, {receiver},
    {
      headers: { authorization: `Bearer ${token}` }
    }
  )

  return res.data

}


export default {
  get,create
}