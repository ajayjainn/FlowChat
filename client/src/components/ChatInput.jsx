import {useSelector } from "react-redux"
import socket from '../socket.js';

const ChatInput = () => {

  const activeChat = useSelector(state=>state.chatrooms.activeChat)
  const currentId = useSelector(state=>state.auth.user.id)
 

  if(!activeChat){
    return 
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    const receiverId = activeChat.users.find(user=>user.id!=currentId).id
    socket.emit('message',e.target.message.value,receiverId,activeChat.id)
    e.target.message.value = ''
  }



  return (
    <div className="compose">
      <form onSubmit={handleSubmit} action="" id="message_form">
        <input  name="message" placeholder="Enter message" required autoComplete="off" />
        <button type='submit'>Submit</button>
      </form>
      <button id="send_location">Send Location</button>
    </div>
  )
}

export default ChatInput