import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const Register = () => {
  
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, conformPassword] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch({type: 'LOADING', payload: true});

    if(password !== confirmPassword) {
      toast.error('Passwords dont match!');
    }

    try {
      await axios.post('/api/users/register', {
        username,
        password
      });
      toast.success('Registration Successfully');
      dispatch({type: 'LOADING', payload: false});
      navigate('/login');
    } catch(error) {
      console.log(error);
      toast.error('Error, try again!');
      dispatch({type: 'LOADING', payload: false});
    }
  }

  useEffect(() => {
    if(localStorage.getItem('user')) {
      localStorage.getItem('user');
      navigate('/');
    }
  })

  return (
    <Layout>
      <div className='form-container'>
        <div className='form-groups'>
          <form className='form' onSubmit={submitHandler}>
            <h3 className='form-title'>Register</h3>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input type='text' onChange={(e) => setUsername(e.target.value)} className="input" id='username'required />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input type='password' onChange={(e) => setPassword(e.target.value)} className="input" id='password'required />
            </div>
            <div className='form-group'>
              <label htmlFor='re-password'>Repeat password</label>
              <input type='password' onChange={(e) => conformPassword(e.target.value)} className="input" id='re-password'required />
            </div>
            <div className='form-group'>
              <button className='rent-now'>Register</button>
            </div>
            <div className='form-group'>
              <p>Have an account? <a href='/login' className='form-link'>Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Register
