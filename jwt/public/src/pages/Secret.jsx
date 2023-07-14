import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'


function Secret() {
  const navigate = useNavigate()
  const [cookies,removeCookie] = useCookies([])
  useEffect(()=>{
    const verifyUser = async () =>{
      // console.log('sddfd');
      if(!cookies.jwt){
        // console.log('redireting to lgon');
        navigate("/login")
      }else{
        const {data} = await axios.post("http://localhost:4000",{},
        {withCredentials:true})
        // console.log(data);
        if(!data.status){
          removeCookie("jwt")
          navigate("/login")
        }else{
          toast(`HI ${data.user}`,{theme:"dark"})
        }
      }
    }
    verifyUser()
  },[cookies,navigate,removeCookie])

   const logOut = ()=>{
    removeCookie("jwt")
     navigate('/login')
   }

  return (
    <>
    <div className='private'>
      <h1>welcome !</h1>
      <button  className='button' onClick={() => navigate("/profile")}  type="submit">profile</button>

      <button className='button' onClick={logOut}>Log Out</button>
    </div>
      <ToastContainer/>
    </>
  )
}

export default Secret