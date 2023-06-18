import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'
import Layout from '../components/Layout'

const Login = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async(e) => {
    e.preventDefault();

    dispatch({type: 'LOADING', payload: true});

    try {
      const user = await axios.post('/api/users/login', {
        username,
        password
      });
      console.log(user)
      localStorage.setItem('user', JSON.stringify(user.data));
      toast.success('Login Successfully!');
      dispatch({type: 'LOADING', payload: false});
      navigate('/');
    } catch(error) {
      console.log(error);
      toast.error('Invalid username or password');
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
            <h3 className='form-title'>Login</h3>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input type='text' onChange={(e) => setUsername(e.target.value)} className="input" id='username'required />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input type='password' onChange={(e) => setPassword(e.target.value)} className="input" id='password'required />
            </div>
            <div className='form-group'>
              <button className='rent-now'>Login</button>
            </div>
            <div className='form-group'>
              <p>Dont have an account? <a href='/register' className='form-link'>Register</a></p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login
