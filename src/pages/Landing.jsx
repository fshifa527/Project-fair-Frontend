import React,{useEffect, useState} from 'react';
import { Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { homeProjects } from '../services/allApis';

function Landing() {

const [logStatus, setLogStatus] = useState(false)

const [projects,setProjects] = useState([])

useEffect(() =>{
  getData()
  if (sessionStorage.getItem("token")) {
    setLogStatus(true)
    
  } else {
    setLogStatus(false)
  }
},[])
console.log(projects)

const getData=async()=>{
  const result=await homeProjects()
  console.log(result)
  if (result.status==200) {
    setProjects(result.data)
    
  } else {
    console.log(result.response.data)
    
  }

}

  return (
   <>
    <div className='w-100 d-flex justify-content-center align-items-center' style={{height:'100vh',backgroundColor:'hsla(52, 52%, 67%, 1)'}}>
       <Row>
        <Col className='p-5' sm={12} md={6}>
          <div>
          <h2>Project Fair</h2>
          <p style={{textAlign:'justify'}}>Phasellus eleifend leo at mi eleifend, vitae consequat ipsum cursus. Quisque metus turpis, lobortis sit amet ex sed, rutrum luctus orci. Ut mi turpis, feugiat in gravida vel, eleifend at lectus. Aenean rhoncus placerat nisi, id suscipit nisl hendrerit id. Nam viverra mauris odio. Vestibulum bibendum est eget imperdiet tempus. Cras id vulputate ex, pharetra imperdiet tortor. Vivamus id mi dapibus, feugiat elit non, eleifend metus. Proin et aliquam mauris. Etiam ultrices dictum eleifend. Morbi suscipit, felis a gravida faucibus, nisi nibh pellentesque velit, a mollis tellus erat eu sapien. Proin vulputate, lectus sit amet ornare eleifend, metus libero efficitur velit, eget tempus leo enim nec sem. Ut sollicitudin quam lacus, facilisis tincidunt dui tempus in. Ut nec neque pretium, egestas sapien interdum, efficitur nulla. Sed ullamcorper,
           nisl tincidunt rhoncus sollicitudin, erat velit rhoncus metus, pretium scelerisque arcu justo ac libero.</p>
            

            {
              logStatus ?
              <Link to={'/dash'} className='btn btn-success'>Manage your Projects</Link>
              :
              <Link className='btn btn-warning'to={'/log'}>Explore For More..</Link>
            }
            
          </div>

          </Col>
          <Col className='p-3' sm={12} md={6}>
            <img src="https://cdn-icons-png.flaticon.com/512/1118/1118929.png" alt="" style={{height:'80%',width:'80%'}} />
          </Col >

          
       </Row>
    </div>
    <div className=''p-5>

            <h3 className='text-center'>Few Projects For You...</h3>
            <marquee behavior="" direction="left">
              <div className='d-flex justify-content-evenly mt-3'>
              
              {
                projects.length>0 ?
                projects.map(item=>(
                  <ProjectCard project={item}/>
                ))
                :
                <h3 className='text-center text-danger'>No Projects</h3>
              }
              
               
               
              </div>
            </marquee>
            <div className='text-center'style={{}}>
              <Link to={'/projects'}>See More..</Link>

            </div>
          </div>

   </>
  )
}

export default Landing