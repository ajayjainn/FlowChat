import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {login} from '../services/user.js'
import { setUser } from '../reducers/authReducer.js';
import { setMessage } from '../reducers/messageReducer.js';

function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit =async (e)=>{
    e.preventDefault()
    const formdata = new FormData(e.target)

    try{

      const res = await login(formdata.get('email'),formdata.get('password'))
      localStorage.setItem('token',res.data.token)
      dispatch(setUser(res.data.user))
      navigate('/')
    }catch (err){
      dispatch(setMessage({type:"error",value:err.response.data}))
      setTimeout(()=>dispatch(setMessage({type:null,value:null})),3000)
    }
  }


  return (
    <Form onSubmit={handleSubmit} className="mt-4 container w-50">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name='email' type="text" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <Button className='ms-3' variant="secondary">
        <Link style={{textDecoration:"none",color:"white"}} to='/register'>Register</Link>
      </Button>
    </Form>
  );
}

export default Login;