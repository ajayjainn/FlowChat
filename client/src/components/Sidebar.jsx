import { useDispatch, useSelector } from "react-redux"
import { setActiveChat } from "../reducers/chatroomReducer.js"
import chatRoomService from '../services/chatrooms.js'
import socket from '../socket.js';

const Sidebar = () => {

  const dispatch = useDispatch()
  const chatRooms = useSelector(state => state.chatrooms.data)
  const currentEmail = useSelector(state => state.auth.user.email)
  const allUsers = useSelector(state=>state.users)
  const users = chatRooms.map(ch => ch.users[0].email === currentEmail ? ch.users[1] : ch.users[0])
  const handleOnClick = (event) => {
    dispatch(setActiveChat(event.target.id))
  }

  const newChatRoom =async (event) => {

    console.log(event.target.email.value)
    event.preventDefault()
    const res = await chatRoomService.create(
      localStorage.getItem('token'),
      allUsers.find(user=>user.email===event.target.email.value).id
    )
    console.log(res)
  }

  return (
    <>

      <div id="sidebar" className="chat__sidebar">
        <h2 className="room-title">Title</h2>
        <h3 className="listtitle">Users</h3>

        <ul onClick={handleOnClick} className="users">
          {users.map((user) => <li id={user.id} key={users.indexOf(user)}>{user.name}</li>)}
        </ul>

        <form onSubmit={newChatRoom} action="">
          <input type="text" name="email" placeholder="Email" />
          <button type="submit">Submit</button>
        </form>

      </div>
    </>
  )
}

export default Sidebar