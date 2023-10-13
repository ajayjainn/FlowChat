import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import MessageAlert from './components/Alert.jsx'
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCurrentUser } from './services/user';
import { setUser } from './reducers/authReducer';
import Profile from './pages/Profile';

const PrivateRoute = ({ redirectPath = '/login' }) => {
  const user = useSelector(state => state.auth.user)
  if ((redirectPath == '/login') ? !user : user) {
    return <Navigate to={redirectPath} replace />
  }
  return <Outlet />
}

function App() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  console.log('heyd')

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const res = await fetchCurrentUser(token)
          dispatch(setUser(res.data))
        } catch (err) {
          if (err.response.status === 401) {
            localStorage.removeItem('token')
          }
        }
      }
      setLoading(false)
    }

    verifyUser()
  }, [])

  if (loading) {
    return (
      <>
        <h4>Loading....</h4>
      </>
    )
  }


  return (
    <>
      <Navbar />

      <MessageAlert />
      <Routes>

        <Route element={<PrivateRoute redirectPath='/' />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>

        <Route element={<PrivateRoute redirectPath='/login' />}>

            <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
