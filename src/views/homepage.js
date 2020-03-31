import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Homepage = () => {
  return (
    <Navbar expand='lg' variant='light' bg='light'>
      <Container>
        <Navbar.Brand href='#'>Navbar</Navbar.Brand>
      </Container>
    </Navbar>
  );
};
export default Homepage;
