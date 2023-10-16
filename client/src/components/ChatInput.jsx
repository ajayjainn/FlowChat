import { useSelector } from 'react-redux'
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
      const receiverId = activeChat.users.find(user => user.id !== currentId).id
      socket.emit('image', meta, base64, receiverId, activeChat.id);
    };
    reader.readAsDataURL(file);
    e.target.value = ''
  }


  if (!activeChat) {
    return
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const receiverId = activeChat.users.find(user => user.id !== currentId).id
    socket.emit('message', e.target.message.value, receiverId, activeChat.id)
    e.target.message.value = ''
  }

  return (
    <div className="compose">

      <form onSubmit={handleSubmit} id="message_form">
        <input className="border border-primary" name="message" placeholder="Enter message" required autoComplete="off" />
        <button className="btn btn-primary" type='submit'>Send</button>
      </form> 

      <label id="svg-container">
        <input accept="image/*" onChange={sendImage} type="file" name="file" />
        <svg id='svg' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
      </label>
      
    </div>
  )
}

export default ChatInput