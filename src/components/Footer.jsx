import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
   <>
   <div className='w-100 bg-dark p-5'>
    <Row>

      <Col>
      <h3 className='text-light mb-3'>  Project Fair</h3>
      <p className='text-light' style={{textAlign:'justify'}}>Phasellus eleifend leo at mi eleifend, vitae consequat ipsum cursus. Quisque metus turpis, lobortis sit amet ex sed, rutrum luctus orci. Ut mi turpis, feugiat in gravida vel, eleifend at lectus. Aenean rhoncus placerat nisi, id suscipit nisl hendrerit id. Nam viverra mauris odio. Vestibulum bibendum est eget imperdiet tempus. Cras id vulputate ex, pharetra imperdiet tortor. Vivamus id mi dapibus, feugiat elit non, eleifend metus. Proin et aliquam mauris. Etiam ultrices dictum eleifend. Morbi suscipit, felis a gravida faucibus, nisi nibh pellentesque velit, a mollis tellus erat eu sapien. Proin vulputate, lectus sit amet ornare eleifend, metus libero efficitur velit, eget tempus leo enim nec sem. Ut sollicitudin quam lacus, facilisis tincidunt dui tempus in. Ut nec neque pretium, egestas sapien interdum, efficitur nulla. Sed ullamcorper,
           nisl tincidunt rhoncus sollicitudin, erat velit rhoncus metus, pretium scelerisque arcu justo ac libero.</p>
      </Col>
      <Col className='d-flex flex-column '>
        <h3 className='d-flex flex-column justify-content-center align-items-center ' style={{color:'white'}}>Links</h3>
        <div className=' d-flex flex-column justify-content-center align-items-center '>
        <Link to={'/'}>Landing</Link>
       <Link to={'/log'}>Login</Link>
       <Link to={'/projects'}>Projects</Link>
        </div>
      
      </Col>

      <Col className='d-flex flex-column  ' >
      <h3 className='text-light mb-5'>References</h3>
      <a href="http://react.dev/" target='_blank'>React</a>
      <a href="http://react-bootstrap.netlify.app/">React-Bootstrap</a>
      </Col>

    </Row>
    <h4 className='text-light text-center mt-4'>Project Fair 2024 &copy; all rights reserved. </h4>
   </div>
   </>
  )
}

export default Footer