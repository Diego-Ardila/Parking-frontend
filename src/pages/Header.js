import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


function Header() {
  return (
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/home">
            <img
                alt="logo"
                src='https://res.cloudinary.com/sharedbox/image/upload/v1602101798/Parking%20Alarcon/LOGO_PARQUEADERO_AlARCON_agpwld.png'
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{'   '}
            Parqueadero Alarcon
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/registro">Nuevo Usuario</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default Header;
