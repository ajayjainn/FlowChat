import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import {setUser} from '../reducers/authReducer.js'

function BasicExample() {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const handleLogout = ()=>{
    dispatch(setUser(null))
    localStorage.removeItem('token')
    redirect('/login')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className=''><Link style={{textDecoration:'none',color:'inherit'}} to='/'>Chat App</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />


        {user ?
        <>
          <Navbar.Text>
            Signed in as: <Link to="/profile">{ user.name[0].toUpperCase() + user.name.slice(1) }</Link>
          <Button onClick={handleLogout} className='ms-3' variant="success">Logout</Button> 
          </Navbar.Text>
        </>:
          <Form className="d-flex">
            <Button className='me-2' variant="outline-success">
              <Link style={{ textDecoration: "none", color: "white" }} to='/register'> Register</Link>
            </Button>

            <Button className='me-2' variant="success">
              <Link style={{ textDecoration: "none", color: "white" }} to='/login'>Login </Link>
            </Button>

          </Form>
        }





      </Container>
    </Navbar>
  );
}

export default BasicExample;