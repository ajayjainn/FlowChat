import Alert from 'react-bootstrap/Alert';

import {useSelector} from 'react-redux'

function ShowAlert() {

  const alertMessage = useSelector(state=>state.alert)

  if (!alertMessage.value){
    return null
  }

  return (
    <>
      <Alert dismissible className='container mt-2 w-50' variant={alertMessage.type}>
          {alertMessage.value}
      </Alert>
    </>
  );
}

export default ShowAlert;