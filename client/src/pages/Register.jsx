import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/user';

import {setMessage} from '../reducers/messageReducer.js'
import { useDispatch } from 'react-redux';
import {setUser} from '../reducers/authReducer.js'

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    try{
      const res = await register(
        formData.get('email'),
        formData.get('name'),
        formData.get('password'),
      )
      localStorage.setItem('token',res.data.token)
      dispatch(setUser(res.data.user))
      dispatch(setMessage({type:"success",value:"Account created successfully"}))
      setTimeout(()=>dispatch(setMessage({type:null,value:null})),3000)
      navigate('/')
    }catch(err){
      dispatch(setMessage({type:"danger",value:err.response.data}))
      setTimeout(()=>dispatch(setMessage({type:null,value:null})),3000)
    }
  }

  return (
    <Form onSubmit={handleSubmit} className='mt-4 container w-50'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name='email' type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control name='name' type="text" placeholder="Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
      <Button className='ms-3' variant="secondary">
        <Link style={{ textDecoration: "none", color: "white" }} to='/login'>Login</Link>
      </Button>
    </Form>
  );
}

export default Register;