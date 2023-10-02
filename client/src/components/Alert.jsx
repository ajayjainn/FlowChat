import Alert from 'react-bootstrap/Alert';

import {useSelector} from 'react-redux'

function MessageAlert() {

  const message = useSelector(state=>state.message)

  if(!message.value){
    return null
  }

  return (
    <>
      <Alert dismissible className='container mt-2 w-50' variant={message.type}>
          {message.value}
      </Alert>
    </>
  );
}

export default MessageAlert;