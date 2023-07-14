import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {setUserDetails} from '../redux/userSlice'
function Login() {
  
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch()
  const navigate = useNavigate();


  const generateError = (err) =>{
    // console.log('juh');
    toast.error(err,{ 
      position:'bottom-right'});

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(values);
      const { data } = await axios.post('http://localhost:4000/login',{...values}, {
        withCredentials: true,
      });
// console.log(data);
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) {
            generateError(email.toString());
          } else if (password) {
            generateError(password.toString());
          }
        } else {
          dispatch(
            setUserDetails({
              id:data.user._id,
              email:data.user.email,
              image:data.user?.image
          })
          )
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='top'>
    <div className='container'>
      <h2>Login Account</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input 
            className='input'
            type='email'
            name='email'
            placeholder='Email'
            value={values.email}
            onChange={(e) =>
              setValues({ ...values, email: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            className='input'
            type='password'
            name='password'
            placeholder='Password'
            value={values.password}
            onChange={(e) =>
              setValues({ ...values, password: e.target.value })
            }
          />
        </div>
        <button className='button' type='submit'>Submit</button>
        <span className='span'>
          Create a new account<Link to='/register'>Register</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
}

export default Login;
