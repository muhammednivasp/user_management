import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'

import axios from 'axios'

function Register() {
  const navigate = useNavigate()
  const [values,setValues] = useState({
    email:"",
    password:"",
  })

  const generateError = (err)=> toast.error(err,{
    position:"bottom-right"
  })

  const handleSubmit = async(e)=>{
     e.preventDefault()
     try {
      const {data} = await axios.post("http://localhost:4000/register",{
        ...values,
      },{
        withCredentials:true
      })
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
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className='top'>
    <div className='container'>
      <h2 className='h2'>Register Account</h2>
      <form className='form' onSubmit={(e)=>handleSubmit(e)}>
        <div>
        <label htmlFor='email'>Email</label>
        
        <input className='input' type='email' name='email' placeholder='Email' onChange={(e)=>{
            setValues({...values,[e.target.name]:e.target.value})
        }}
        />
        </div>
        <div>
        <label htmlFor='password'></label>
        <input className='input' type='password' name='password' placeholder='Paswword' onChange={(e)=>{
            setValues({...values,[e.target.name]:e.target.value})
        }}/>
        </div>
        <button className='button' type='submit'>Submit</button>
        <span className='span'>Already have an account?<Link to='/login'>Login</Link></span>
      </form>
      <ToastContainer/>
    </div>
    </div>
  )
}

export default Register