import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {Row,Col} from 'react-bootstrap' 
import { addProject } from '../services/allApis';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import {addProjectResponseContext} from '../Context_api/ContextShare'



function Add() {
    const {addResponse,setAddResponse}=useContext(addProjectResponseContext)


    const [show, setShow] = useState(false);
    const[project,setProject] = useState({title:"",overview:"",languages:"",demo:"",image:"",github:""})
    const [imageStatus,setImageStatus]=useState(false)
    const[preview,SetPreview]=useState("")
    console.log(project)
    useEffect(()=>{
      if (project.image) {
        if (project.image.type=="image/jpg" || project.image.type=="image/jpeg" || project.image.type=="image/png") {
          setImageStatus(false)
          SetPreview(URL.createObjectURL(project.image))
          // console.log(URL.createObjectURL(project.image))
        } else {
          setImageStatus(true)
          SetPreview("")
          setProject({title:"",overview:"",languages:"",demo:"",image:"",github:""})
        }
        
      } 
    },[project.image])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddProject=async()=>{

      const {title,overview,languages,github,demo,image}=project
      if ( !title || !overview || !languages || !github || !demo || !image) {
        console.log("Invalid Input")
        console.log(project);
       } 
       else {
        const formData=new FormData()
        formData.append("title",title)
        formData.append("overview",overview)
        formData.append("languages",languages)
        formData.append("github",github)
        formData.append("demo",demo)
        formData.append("image",image)

        const header={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${sessionStorage.getItem("token")}`
        }

        const result=await addProject(formData,header)
        console.log(result)     
        if (result.status==200) {
          toast.success("Project Added Successfully")
          setProject({title:"",overview:"",languages:"",demo:"",github:"",image:""})
          SetPreview("")
          handleClose()
          setAddResponse(result)
          
        } else {
          toast.error(result.response.data)
        } 
      }
    }
  
  return (
    <>
    <button className='btn btn-primary bb-5' onClick={handleShow}>
        Add Projects
    </button>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
            <label >
              <input type="file" onChange={e=>setProject({...project,image:e.target.files[0]})} id='img' style={{display:'none'}}/>
              <img src={preview?preview:"https://static.vecteezy.com/system/resources/thumbnails/009/591/862/small/add-flat-icon-free-png.png"} alt="" />
            
            </label>
            {
              imageStatus &&
              <p className='text-danger'>Uploaded Image File Format Not Supported.
              Add either jpeg/png/jpg files.</p>
            }
            </Col>
            <Col>
            <FloatingLabel controlId="title" label="Project Title " className='mb-3'>
        <Form.Control type="text" placeholder="Title" onChange={e=>setProject({...project,title:e.target.value})} />
      </FloatingLabel>
      <FloatingLabel controlId="title" label="Project OverView " className='mb-3'>
        <Form.Control type="text" placeholder="OverView" onChange={e=>setProject({...project,overview:e.target.value})} />
      </FloatingLabel>
      <FloatingLabel controlId="title" label="Used Languages " className='mb-3'>
        <Form.Control type="text" placeholder="Languages" onChange={e=>setProject({...project,languages:e.target.value})}/>
      </FloatingLabel>
      <FloatingLabel controlId="title" label="Project Demo URL " className='mb-3'>
        <Form.Control type="text" placeholder="Demp Url" onChange={e=>setProject({...project,demo:e.target.value})} />
      </FloatingLabel>
 </Col>
    
      <FloatingLabel controlId="title" label="Project Github Url " className='mb-3 '>
        <Form.Control   type="text" placeholder="Github Url" onChange={e=>{setProject({...project,github:e.target.value})}}/>
      </FloatingLabel>
    
    
            
           
    
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProject}>
            Save</Button>
        </Modal.Footer>
      </Modal>
    
    </>
  )
}

export default Add