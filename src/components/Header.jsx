import React,{useContext} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../Context_api/AuthContext';

function Header({status}) {

  const {authStatus,SetAuthStatus}=useContext(TokenAuthContext)
  const navigate=useNavigate()
  const logOut=()=>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    navigate('/')
    SetAuthStatus(false)
  }




  return (
    <Navbar className="bg-body-tertiary d-flex justify-content-between">
    
      <Navbar.Brand className='ms-3' href="#home">
      <i className="fa-brands fa-square-pied-piper fa-beat-fade fa-xl" style={{color: '#000000'}}></i>
       
        {' '}
       Project Fair
      </Navbar.Brand>
      {
        !status  &&
        <button className='btn btn-info me-4 rounded' onClick={logOut}>Logout <i className="fa-solid fa-right-from-bracket" style={{color:' #000000'}}></i></button>
      }
    
   
  </Navbar>
  )
}

export default Header 