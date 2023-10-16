import { useDispatch, useSelector } from 'react-redux'
import { setActiveChat } from '../reducers/chatroomReducer.js'
import chatRoomService from '../services/chatrooms.js'

const Sidebar = () => {

  const dispatch = useDispatch()
  const chatRooms = useSelector(state => state.chatrooms.data)
  const currentEmail = useSelector(state => state.auth.user.email)
  const allUsers = useSelector(state => state.users)
  const users = chatRooms.map(ch => ch.users[0].email === currentEmail ? ch.users[1] : ch.users[0])
  const handleOnClick = (event) => {
    dispatch(setActiveChat(event.target.id))
  }

  const newChatRoom = async (event) => {
    event.preventDefault()

    const receiver = allUsers.find(user => user.email === event.target.email.value)
    if (!receiver) {
      alert('User not found')
      return
    }

    await chatRoomService.create(
      localStorage.getItem('token'),
      receiver.id
    )
  }

  const inputStyle = {
    borderRadius: '5px',
    height: '30px',
    display: 'block',
    width: '80%',
    margin: 'auto'
  }

  return (
    <>

      <div id="sidebar" className="chat__sidebar">
        <h3 className="listtitle ms-5 mt-3">Users</h3>

        <ul onClick={handleOnClick} className="users">
          {users.map((user) => <li style={{ fontSize: '19px', cursor: 'pointer', marginBottom: '15px' }} id={user.id} key={users.indexOf(user)}>{user.name}</li>)}
        </ul>

        <hr />

        <form onSubmit={newChatRoom} action="">
          <input style={inputStyle} type="text" name="email" placeholder="Email" />
          <button style={{ display: 'block', width: '80%', margin: 'auto' }} className="container w-80 m-auto mt-3 btn btn-primary btn-sm" type="submit">Create new Chat</button>
        </form>

      </div>
    </>
  )
}

export default Sidebar