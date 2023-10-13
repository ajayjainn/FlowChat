import { useDispatch, useSelector } from "react-redux"
import socket from '../socket.js'
import { appendMessage } from "../reducers/chatroomReducer.js"
import dayjs from 'dayjs'

const MessagesList = () => {

  const activeChat = useSelector(state => state.chatrooms.activeChat)
  const currentId = useSelector(state => state.auth.user.id)
  const users = useSelector(state=>state.users)

  const dispatch = useDispatch()

  socket.off('SendMessage')

  socket.on('SendMessage',(msg)=>{
    dispatch(appendMessage(msg))
  })  

  if (!activeChat) {
    return (
      <h2>
        No active chat
      </h2>
    )
  }

  const senderStyle = {
    textAlign: 'end',
    marginBottom: '5px',
  }

  const receiverStyle = {
    marginBottom: '5px',
  }

  const getNameFromId = (id)=>{
    return users.find(us=>us.id===id).name
  }

  return (
    <div id="messages" className="chat__messages">

      {activeChat.messages.map(message => {
        const value = dayjs(message.createdAt, "yyyy-MM-dd HH:mm:ss")
        return (
          <div key={message.id} className="message" style={message.from === currentId ? senderStyle : receiverStyle}>
            <span className="message__name">{message.from === currentId ? "You" : getNameFromId(message.from)}</span>
            <span className="message__meta">{value.format('MM/DD/YYYY h:mm a')}</span>
            <p>{message.text}</p>
          </div>
        )
      })}
    </div>
  )
}

export default MessagesList