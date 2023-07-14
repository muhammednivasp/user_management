import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './admin.css'
import { setUserDetails } from '../redux/userSlice'
import { setUserId } from '../redux/adminSlice'

function AdminHome() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [cookies,removeCookie] = useCookies([])
    const [users,setUsers] = useState([])
    const [query,setQuery] = useState("")

    useEffect(()=>{

        const verifyAdmin = async () =>  {
            if(!cookies.adminjwt){
                navigate("/adminlogin")
            }else{
                const data = await axios.post("http://localhost:4000/admin",
                {},{withCredentials:true}).then(res => {

                    if(!res.data.status){
                        removeCookie("adminjwt")
                        navigate("/adminlogin")
                    }
                    console.log(res,55)}).catch(err =>
                    console.log(err))

            


               
            }
        }
        verifyAdmin()
        axios.get("http://localhost:4000/getallusers").then((response) => {
            console.log(response,559);
            setUsers(response.data.data)
        }).catch((err)=>{
            console.log(err);
        })

    },[cookies,navigate,removeCookie])

    const deleteUser = async (id) =>{
        console.log(id);
        axios.post(`http://localhost:4000/deleteuser/${id}`,{},{withCredentials:true}).then((res)=>{
            console.log(res);    
        if(res.data.deleted){
            setUsers(users.filter(user => user._id !== id))
               }
        })
    }
    const logOut = () =>{
        removeCookie("adminjwt")
        navigate("/adminlogin")
    }


  return (
    <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand" style={{ cursor: "pointer" }} >Admin Panel</span>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input
                            class="form-control mr-sm-2"
                            type="search" placeholder="Search"
                            aria-label="Search"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button onClick={() => navigate('/adminadduser')} class="btn btn-outline-success my-2 my-sm-0" type="submit">Add User</button>
                        <button onClick={logOut} class="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
                    </form>
                </div>
            </nav>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: "3rem" }}>
                <table class="table" style={{ width: "1000px" }}>
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            {/* <th scope="col">Name</th> */}
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.filter((user) => 
                            user.email.toLowerCase().includes(query))
                            .map((user,index) => {
                                // console.log(user.email);
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        {/* <td>Mark</td> */}
                                        <td>{user.email}</td>
                                        <td>
                                            <button className='btn btn-primary'
                                                onClick={() => {
                                                    dispatch(setUserId({id:user._id,email: user.email }))
                                                    navigate("/adminedituser")
                                                }}
                                                style={{ margin: "5px" }}
                                            > Edit</button>

                                            <button
                                                className='btn btn-danger'
                                                style={{ margin: "5px" }}
                                                onClick={() => deleteUser(user._id)}
                                            >DELETE</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>

    
  )
}

export default AdminHome