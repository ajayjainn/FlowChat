import { useSelector } from "react-redux"

const MessagesList = () => {

  const activeChat = useSelector(state => state.chatrooms.activeChat)
  const currentEmail = useSelector(state => state.auth.user.email)

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

  return (
    <div id="messages" className="chat__messages">

      {activeChat.messages.map(message => {
        return (
          <div key={message._id} className="message" style={message.from === currentEmail ? senderStyle : receiverStyle}>
            <span className="message__name">username</span>
            <span className="message__meta">createdAt</span>
            <p>{message.text}</p>
          </div>
        )
      })}
    </div>
  )
}

export default MessagesList