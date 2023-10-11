import { useSelector } from "react-redux"

const ChatInput = () => {

  const activeChat = useSelector(state=>state.chatrooms.activeChat)

  if(!activeChat){
    return 
  }

  return (
    <div className="compose">
      <form action="" id="message_form">
        <input name="message" placeholder="Enter message" required autoComplete="off" />
        <button>Submit</button>
      </form>
      <button id="send_location">Send Location</button>
    </div>
  )
}

export default ChatInput