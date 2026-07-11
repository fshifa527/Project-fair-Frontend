import { useState } from 'react'
import './App.css'
import DashB from './pages/DashB'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Reg from './pages/Reg'
import Projects from './pages/Projects'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route,Routes } from 'react-router-dom'
import './bootstrap.min.css'
import Auth from './pages/Auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TokenAuthContext } from './Context_api/AuthContext'
import { useContext } from 'react'



function App() {
  const {authStatus,SetAuthStatus}=useContext(TokenAuthContext)
  

  return (
    <>
    
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/dash' element={authStatus?<DashB/>:<Landing/>}/>
        <Route path='/log' element={<Auth/>}/>
        {/* <Route path='/reg' element={<Reg/>}/> */}
        <Route path='/projects' element={authStatus?<Projects/>:<Landing/>}/>
      </Routes>
      <Footer/>
      <ToastContainer/>
    </>
  )
}

export default App
