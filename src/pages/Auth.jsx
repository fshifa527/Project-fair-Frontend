import React,{useContext, useState} from 'react'
import {Row,Col} from 'react-bootstrap';
import  Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { userLogin, userRegister } from '../services/allApis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../Context_api/AuthContext';




function Auth() {
    
    const {authStatus,setAuthStatus}=useContext(TokenAuthContext)
    const [status,setStatus]=useState(true)
    const [data,setData]=useState
    ({username:"",password:"",email:""})
     
     const navigate=useNavigate()

    const changeStatus =()=>{
        setStatus(!status)
    }
    console.log(data);

    const handleRegister=async()=>{
      console.log(data)
      const {username,password,email}=data
      if (!username || !password || !email) 
      {toast.warning("Invalid Input !! Enter Valid Data")
        } 
        else {
          const result=await userRegister(data)
          console.log(result);
          if (result.status==200) {
            toast.success("Registration Successful")
            setData({username:"",password:"",email:""})
            
          } else {
            toast.error(result.response.data)
            
          }

     
      }
    }

    const handleLogin = async () => {
      const {email,password} = data
      if (!email||!password) {
       toast.warning("Invalid Input !! Enter Valid Data")
      } else {
       
       const result =await userLogin({email,password})
       console.log(result)
       if (result.status==200) {
        toast.success("Login Successful")
        sessionStorage.setItem("token",result.data.token)
        sessionStorage.setItem("username",result.data.user)

        sessionStorage.setItem("userDetails",JSON.stringify(result.data.userDetails))
        setAuthStatus(true)
        navigate('/')
        
       } else {
        toast.error(result.response.data)
       }
      } 
     }


  return (
    <>
    <div className='w-100 d-flex justify-content-center align-items-center' style={{height:'90vh',color:'#1dd5e2'}}>
        <div className='w-50 bg-light border shadow' >
           <Row>
            <Col className='p-5'>
                <img className='img-fluid'   src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" alt="img" />
            </Col>
            <Col className='p-5'>
                {
                 status ?
                 <h3 className='mb-3'>Login</h3>   
                 :
                 <h3 className='mb-3'>Register</h3>
                }
                <div>
                    {
                        !status &&
                    <FloatingLabel
                      controlId="floatingInput"
                      label="UserName"
                      className="mb-3"
                       >
                    <Form.Control type="text" placeholder="Username"
                    on onChange={(e)=>{setData({...data,username:e.target.value})}} />
                       </FloatingLabel>
                    }
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email address"
                     className="mb-3"
                    >
                   <Form.Control type="email" placeholder="name@example.com" onChange={(e)=>{setData({...data,email:e.target.value})}}/>
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" onChange={(e)=>{setData({...data,password:e.target.value})}}/>
                    </FloatingLabel>

                    <div className='mt-3 d-flex justify-content-content-between'>
                          {
                            status?
                            <button className='btn btn-outline-dark'onClick={handleLogin}>Login</button>
                            :
                            <button className='btn btn-outline-dark'onClick={handleRegister}>Register</button>
                          }

                          <button className='btn btn-link text-light' onClick={changeStatus}>
                            {
                                status ?
                                <span style={{color:'#1dd5e2'}}>New User ?</span>
                                :
                                <span style={{color:'#1dd5e2'}}>Already a User ?</span>
                            }
                          </button>
                    </div>
                </div>
            </Col>
           </Row>
        </div>

    </div>
    </>
  )
}

export default Auth