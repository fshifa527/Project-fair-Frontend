import React,{useEffect, useState} from 'react'
import server_url from '../services/server_url'

function Profile() {
  const[open,setOpen]=useState(false)
  const [user,setUser] =useState({
    id:"",email:"",username:"",password:"",github:"",linkdin:"",profile:""
   })
   const [preview,setPreview]=useState("")
   const [existingProfile,setExistingProfile]=useState("")
   useEffect(()=>{
    if (sessionStorage.getItem('token')) {
      const userDetails = JSON.parse(sessionStorage.getItem('userDetails'))
      setUser({
        id: userDetails._id , email: userDetails.email , username : userDetails.username , password : userDetails.password ,github: userDetails.github,
        linkdin: userDetails.linkdin
      })
      setExistingProfile(userDetails.profile)
      
    } else {
      
    }
    },[open])

    useEffect(()=>{
      if (user.profile) {
        setPreview(URL.createObjectURL(user.profile))
        
      } else {
        setPreview("")
      }
    },[user.profile])

    const handleProfileUpdate=async()=>{

    console.log(user);

    const {username,email,password,github,linkdin}=user

    if(!username || !email || !password ||!github || !linkdin){
      toast.warning("Invalid Inputs!!")
    }
    else{
      const formData=new FormData()
      formData.append("username",username)
      formData.append("password",password)
      formData.append("email",email)
      formData.append("github",github)
      formData.append("linkdin",linkdin)
      formData.append("profile",preview?user.profile:existingProfile)
    

    const header={
      "Authorization":`Bearer ${sessionStorage.getItem('token')}`,
      "Content-Type":preview?"multipart/form-data":"application/json"
    }

    const result = await updateProfile(header,formData)
    if (result.status == 200) {
      toast.success("Profile Updated Succesfully")
      setOpen(!open)
      sessionStorage.setItem('userDetails',JSON.stringify(result.data))
      
    } else {
      console.log(result);
      toast.error(result.response.data)
    }
  }
}


    return (
    <>
    <div className='m-1 p-3 border shadow'>
      <div className='d-flex justify-content-between'>
      <h3>Profile</h3>
      <button className='btn' onClick={() => setOpen(!open)}>
         <i className='fa-solid fa-down-long' style={{color:"black"}}></i>
      </button>
      </div>
       { 
          open &&
             <div className='p-5' style={{ backgroundColor:"lightgray"}}>
             <label >
               <input type="file"onChange={(e)=>setUser({...user,profile:e.target.files[0]})} name='' style={{display:'none'}} id='pp' />

               {

                existingProfile == "" ?
                <img  width={'180px'} src={preview?preview:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }className='img-fluid' alt="img" />
                :
                <img  width={'180px'} src={preview?preview:`${server_url}/uploads/${existingProfile}`} className='img-fluid' alt="" />
               }
               
             </label>
             <input type="text" name='' id='' placeholder='Username' className='form-control mt-3' />
             <input type="text" name='' id='' placeholder='LinkdIn Id' className='form-control mt-3' />
             <input type="text" name='' id='' placeholder='Github Id' className='form-control mt-3' />
             <div>
               <button className='btn btn-warning btn-block' onClick={handleProfileUpdate}>UPDATE INFO</button>
             </div>
           </div>
        }
    </div>
    
    </>
  )
}

export default Profile