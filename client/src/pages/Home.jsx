import { useEffect, useState } from 'react'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import {setUserChats} from '../reducers/chatroomReducer.js'
import chatRoomService from '../services/chatrooms.js'
import {fetchUsers} from '../services/user.js'
import { setUsers } from '../reducers/usersReducer'
import Sidebar from '../components/Sidebar'
import MessagesList from '../components/MessagesList'
import ChatInput from '../components/ChatInput'


const Home = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchData = async ()=>{
      const userChats = await chatRoomService.get()
      const users = await fetchUsers(localStorage.getItem('token'))
      dispatch(setUsers(users))
      dispatch(setUserChats(userChats))
    }
    fetchData()
  },[])

  return (
    <>
      <div style={{height:'90vh'}} className="chat">
        <Sidebar/>      
        <div className="chat__main">
          <MessagesList />
          <ChatInput />
        </div>
      </div>
    </>
  )
}

export default Home