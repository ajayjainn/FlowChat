import { useSelector } from "react-redux"
import socket from '../socket.js';

const ChatInput = () => {
  const activeChat = useSelector(state => state.chatrooms.activeChat)
  const currentId = useSelector(state => state.auth.user.id)

  const sendImage = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0]
    const meta = {
      mimeType: file.type,
      size: file.size,
      name: file.name
    }
    console.log(meta)
    reader.onload = function () {
      const base64 = this.result.replace(/.*base64,/, '');
      const receiverId = activeChat.users.find(user => user.id != currentId).id
      socket.emit('image', meta, base64, receiverId,activeChat.id);
    };
    reader.readAsDataURL(file);
    e.target.value = ''
  }


  if (!activeChat) {
    return
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const receiverId = activeChat.users.find(user => user.id != currentId).id
    socket.emit('message', e.target.message.value, receiverId, activeChat.id)
    e.target.message.value = ''
  }

  return (
    <div className="compose">
      <form onSubmit={handleSubmit} action="" id="message_form">
        <input name="message" placeholder="Enter message" required autoComplete="off" />
        <button type='submit'>Submit</button>
        <button>Send File
        <input accept="image/*" onChange={sendImage} type="file" name="file" id="file" />
      </button>
      </form>

     
    </div>
  )
}

export default ChatInput