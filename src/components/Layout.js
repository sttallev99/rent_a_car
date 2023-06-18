import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Layout = (props) => {

  const navigate = useNavigate();

  const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const logoutHandler = () => {
    localStorage.removeItem('user');
    toast.success('Successfully logout!');
    navigate('/login');
  }

  return (
    <>
        <div className='header'>
          <div className='col'>
            <a href='/' className='logo'>Rent a Car</a>
          </div>
          <div className='col'>
            <span className='name'>{userInfo?.username}</span>
            {userInfo ? (
              <span onClick={logoutHandler} className='logout'>Logout</span>
            ) : (
              <a href='/login' className='login'>Login</a>
            )}
          </div>
        </div>
        <div className='main'>
            {props.children}
        </div>
        <div className='footer'>
            <p>All rights reserved. Powered by Stalev&copy;</p>
        </div>
    </>
  )
}

export default Layout
