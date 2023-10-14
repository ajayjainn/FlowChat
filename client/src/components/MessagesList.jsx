import { useDispatch, useSelector } from "react-redux"
import socket from '../socket.js'
import { appendMessage } from "../reducers/chatroomReducer.js"
import dayjs from 'dayjs'
import './MessageList.css'

const MessagesList = () => {

  const activeChat = useSelector(state => state.chatrooms.activeChat)
  const currentId = useSelector(state => state.auth.user.id)
  const users = useSelector(state => state.users)

  const dispatch = useDispatch()

  socket.off('SendMessage')

  socket.on('SendMessage', (msg) => {
    dispatch(appendMessage(msg))
    setTimeout(scrollToBottom, 0)
  })

  if (!activeChat) {
    return (
      <h2>
        No active chat
      </h2>
    )
  }

  const scrollToBottom = () => {
    var element = document.querySelector('#messages');
    if (element) {
      element.scrollTo({ top: element.scrollHeight + element.offsetHeight + 1000, behavior: 'smooth' })
    }
  }

  setTimeout(scrollToBottom, 0)

  const senderStyle = {
    textAlign: 'end',
    marginBottom: '5px',
  }

  const receiverStyle = {
    marginBottom: '5px',
  }
  const imageStyle = {
    width: '100%',
    height: 'auto',
    display: 'inline-block',

  }

  const getNameFromId = (id) => {
    return users.find(us => us.id === id).name
  }

  return (
    <div id="messages" className="chat__messages">

      {activeChat.messages.map(message => {
        const value = dayjs(message.createdAt, "yyyy-MM-dd HH:mm:ss")
        return (
          <div id='message' key={message.id} className="message" style={message.from === currentId ? senderStyle : receiverStyle}>
            <span className="message__name">{message.from === currentId ? "You" : getNameFromId(message.from)}</span>
            <span className="message__meta">{value.format('MM/DD/YYYY h:mm a')}</span>

            {message.text ?
              <p>{message.text}</p>
              :
              <div className="container">
                <a download={message.file.name} href={message.file.tempUrl}>
                  <img style={imageStyle} src={message.file.tempUrl} alt="Avatar" className="image" />
                  <div className="middle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" /></svg>
                  </div>
                </a>
              </div>
            }
          </div>
        )
      })}
    </div>
  )
}

export default MessagesList