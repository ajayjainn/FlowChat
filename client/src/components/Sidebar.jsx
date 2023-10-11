import { useDispatch, useSelector } from "react-redux"
import { setActiveChat } from "../reducers/chatroomReducer"

const Sidebar = () => {

  const dispatch = useDispatch()
  const chatRooms = useSelector(state=>state.chatrooms.data)
  const currentEmail = useSelector(state=>state.auth.user.email)
  const users = chatRooms.map(ch=>ch.users[0].email===currentEmail?ch.users[1]:ch.users[0])

  const handleOnClick = (event)=>{
    dispatch(setActiveChat(event.target.id))
  }

  return (
    <>
      <div id="sidebar" className="chat__sidebar">
        <h2 className="room-title">Title</h2>
        <h3 className="listtitle">Users</h3>

        <ul onClick={handleOnClick} className="users">
          {users.map((user) => <li id={user._id} key={users.indexOf(user)}>{user.email}</li>)}
        </ul>

      </div>
    </>
  )
}

export default Sidebar