import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import './Login.css'

const Login = () => {
    const [userData, setUserData] = useState({email:"", password:""})
    const [iseLoginSuccess, setIsLoginSuccess] = useState(false)
    const handleFormSubmit = async (event) =>{
        event.preventDefault()
        try{
            const isSuccessLogin = await axios.post("http://localhost:5001/users/login", userData) 
            localStorage.setItem("notes-ms", JSON.stringify(isSuccessLogin.data.userData))
            localStorage.setItem("MS-notes", JSON.stringify([]));
            window.location.href = "/dashboard"
        }catch(err){
            setIsLoginSuccess(true)
        }
    }
  return (
    <div className='container mainHead'>
        <form>
            {iseLoginSuccess && <p className='text-danger'>Invalid Password</p>}
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" onChange={(event) => setUserData({...userData, email: event.target.value})} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={(event) => setUserData({...userData, password: event.target.value})} />
            </div>
            <div className='text-center'>
                <button type="submit" className="btn btn-primary" onClick={(event) => handleFormSubmit(event)}>Login</button>
            </div>
        </form>
    </div>
  )
}

export default Login