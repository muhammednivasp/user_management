import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

function AdminLogin() {
  const navigate = useNavigate()
  // const dispatch = useDispatch()

  const [value, setValue] = useState({
    email: ""
    ,
    password: ""
  })

  const errorGenerator = (err) => toast.error(err, { position: 'bottom-right' })
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:4000/adminlogin", { ...value }, { withCredentials: true }
      )
      if (data.message) {
        errorGenerator(data.message)
      } else {
        navigate("/admin")
      }
    } catch (error) {
      // errorGenerator(data.message)
    }

  }

  return (
    <div className='top'>
      <div className="container">
        <h2>Login to your Account</h2>
        <br></br>


        <form className='form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className='input'
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setValue({ ...value, [e.target.name]: e.target.value })
              }}
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              className='input'
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => {
                setValue({ ...value, [e.target.name]: e.target.value })
              }}
            />
          </div>

          <button className='button' type="submit">Login</button>
          {/* <span className='span'>
          Don't have an account ?<Link to="/register"> Register </Link>
        </span> */}
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AdminLogin