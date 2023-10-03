import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { updateAvatar,sendVerificationLink } from '../services/user';
import { setMessage } from '../reducers/messageReducer.js'
import { setUser } from '../reducers/authReducer';

import Button from 'react-bootstrap/Button'
const Profile = () => {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    try {
      const res = await updateAvatar(localStorage.getItem('token'), formData)
      dispatch(setUser(res.data))
      dispatch(setMessage({ type: "success", value: 'Profile Updated successfully' }))
      setTimeout(() => dispatch(setMessage({ type: null, value: null })), 3000)
    } catch (err) {
      dispatch(setMessage({ type: "error", value: 'An error occured' }))
      setTimeout(() => dispatch(setMessage({ type: null, value: null })), 3000)
    }
  }

  if(user.avatarPhoto){
    const b64enc = btoa(String.fromCharCode.apply(null, user.avatarPhoto.data))
    var datajpg = "data:image/jpg;base64," + b64enc;
  }

  const verificationLinkHandler = async ()=>{
    try{
      await sendVerificationLink(localStorage.getItem('token'))
      dispatch(setMessage({type:"success",value:'Verification Link Sent'}))
      setTimeout(()=>dispatch(setMessage({type:null,value:null})),3000)
    }catch(err){
      dispatch(setMessage({type:"error",value:'Error'}))
      setTimeout(()=>dispatch(setMessage({type:null,value:null})),3000)
    }
  }


  return (
    <>
      {datajpg &&
        <Image style={{ margin: 'auto' }} src={datajpg} roundedCircle />
      }
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <input accept=".jpg,.jpeg,.png" type="file" name="avatar" />
        <input type="submit" value="submit" />
      </form>

      <InputGroup style={{ width: '30rem' }} className="mb-3 container w-40">
        <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
        <Form.Control
          disabled
          placeholder={user.email}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />

        {user.isVerified? 
          <><InputGroup.Text >Email verified</InputGroup.Text><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></>:
          <Button onClick={verificationLinkHandler}>Send Verification Link</Button>
    }
      </InputGroup>

      <InputGroup style={{ width: '30rem' }} className="mb-3 container w-40">
        <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
        <Form.Control
          disabled
          placeholder={user.name}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />

      </InputGroup>
    </>
  )
}

export default Profile