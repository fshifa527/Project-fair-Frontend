import React, { useState, useEffect } from 'react'
import Header from '../components/Header';
import { Row, Col } from 'react-bootstrap'
import List from '../components/List';
import Profile from '../components/Profile';
import Add from '../components/Add';
import { usersProjects } from '../services/allApis';
import { useContext } from 'react'
import { addProjectResponseContext,deleteProjectResponseContext,editProjectResponseContext } from '../Context_api/ContextShare';


function DashB() {
  const { addResponse, setAddResponse } = useContext(addProjectResponseContext)
  
  const { editResponse, SetEditResponse } = useContext(editProjectResponseContext)
  const { deleteResponse, setDeleteResponse } = useContext(deleteProjectResponseContext)

  const [user, setUser] = useState("")
  const [projects, setProjects] = useState([])

  useEffect(() => {
    setUser(sessionStorage.getItem("username"))
    if (sessionStorage.getItem("token")) {
      getData()
    } else {
      console.log("Login First");
    }
  }, [addResponse,editResponse,deleteResponse])
  console.log(projects);

  const getData = async () => {
    const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
    const result = await usersProjects(header)
    if (result.status == 200) {
      setProjects(result.data)
    } else {
      console.log(result.response.data);
    }
  }


  return (
    <>
      <Header />
      <div className='p-4'>
        <h1>DashBoard</h1>
        <Row>
          <Col sm={12} md={8}>
            <Add />
            <div className='p-3 border border-3'>
              <List projects={projects} />
            </div>
          </Col>
          <Col sm={12} md={4}>
            <Profile />
          </Col>
        </Row>

      </div>
    </>
  )
}

export default DashB