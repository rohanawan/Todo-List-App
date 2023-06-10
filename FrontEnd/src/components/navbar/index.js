import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

function navbar () {
  return (
    <Navbar className='navbar' expand="lg">
      <Container className=' d-flex justify-content-center' style={{ paddingRight: '50px' }}>
            <h2>WELCOME TO TODO LIST APP</h2>
      </Container>
    </Navbar>
  )
}

export default navbar
