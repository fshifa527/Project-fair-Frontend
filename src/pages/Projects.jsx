import React,{useState,useEffect} from 'react'
import ProjectCard from '../components/ProjectCard'
import Header from '../components/Header'
import { allProjects } from '../services/allApis'
import {Row,Col} from 'react-bootstrap'


function Projects() {

  const [projects,setProjects] = useState([])
  const[logStatus,setLogStatus]= useState(false)
  const [search,setSearch]=useState("")

  useEffect(()=>{
    if (sessionStorage.getItem('token')) {
      getData()
      setLogStatus(true)
    } else {
      toast.warning("Login First To View Your Projects")
      console.log("Login First")
      
    }
  },[search])
   console.log(projects)

   const getData=async()=>{
    const header={"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
    const result=await allProjects(header,search)
    // console.log(result);
    if (result.status==200) {
      setProjects(result.data)
    } else {
      console.log(result.response.data);
    }
   }

  return (
    <>
   <Header status={true}/>

   <div>
   <h2>All Projects</h2>
   <input type="text" name="" id="" className="form-control w-25" placeholder='Enter Language to Search' onChange={(e)=>{setSearch(e.target.value)}} />
   </div>



   <div className='p-5'>
     

     {
       logStatus ?
       <Row>
         {
           projects.length > 0 ?
           projects.map(item => (
             <Col>
             <ProjectCard project={item}/>
             </Col>
           ))
         
       
       :
       <h3 className='text-center text-warning'> No Projects Available </h3>
      }

      </Row>
      :
      <h2 className='text-center text-warning'> Please Login First To View Projects</h2>
     }
     
   </div>
    </>
   
  )
}

export default Projects