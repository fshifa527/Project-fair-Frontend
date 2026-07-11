import React from 'react'
import Edit from './Edit'
import { deleteProject } from '../services/allApis'
import { deleteProjectResponseContext } from '../Context_api/ContextShare'
import { useContext } from 'react'
import { toast } from 'react-toastify'

function List({projects}) {

  const {SetDeleteResponse}= useContext(deleteProjectResponseContext)

  const handleDelete=async(id)=>{
    const header={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${sessionStorage.getItem('token')}`
    }
    const result=await deleteProject(id,header)
    if (result.status==200) {
      toast.success("Project Deleted")
      SetDeleteResponse(result)
    } else {
      console.log(result.response.data)
      toast.error("Deletion Failed")
      
    }
  }

  return (
    <>

    <div>
      {
        projects.length > 0 ?
         projects.map(item=>(
          <div className='d-flex justify-content-between border shadow p-3 mb-3'>
        <h3>{item.title}</h3>
        <div>
            <a href=""> <i className="fa-brands fa-github fa-2x"></i></a>
            <Edit project={item}/>
            {/* <button className='btn ms-2' ><i className="fa-regular fa-pen-to-square fa-xl" style={{color:'black'}}></i></button> */}
            <button className='btn ms-2' onClick={()=>{handleDelete(item._id)}}
            ><i className="fa-solid fa-trash fa-xl" style={{color:'black'}}></i></button>
        </div>

         </div>

         ))
         :
         <h1 className='text-center text-danger'> No Projects Available !!</h1>

         
      }
    
    </div>
   
    </>
  )
}

export default List