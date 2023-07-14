import React from 'react'
import {BrowserRouter , Routes,Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Secret from './pages/Secret'
import AdminLogin from './Admin/AdminLogin'
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile'
import AdminHome from './Admin/AdminHome'
import AdminAdd from './Admin/AdminAdd'
import EditUser from './Admin/EditUser'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element = {<Register/>}/>
        <Route exact path="/login" element = {<Login/>}/>

        <Route exact path="/" element = {<Secret/>}/>
        <Route exact path = "/profile" element={<Profile/>}/>
        <Route exact path = "/adminlogin" element={<AdminLogin/>}/>
        <Route exact path = "/admin" element={<AdminHome/>}/>
        <Route exact path = "/adminadduser" element={<AdminAdd/>}/>
        <Route exact path = "/adminedituser" element={<EditUser/>}/>






      </Routes>
    </BrowserRouter>
  )
}

export default App