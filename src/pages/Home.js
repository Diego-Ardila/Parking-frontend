import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';




function Home() {
  return (
    <Container fluid>
      <Row className="justify-content-md-center mt-4">
        <Col lg="8">
        <Carousel>
            <Carousel.Item>
                <img
                height="350"
                className="d-block w-100"
                src="https://res.cloudinary.com/sharedbox/image/upload/v1601927385/sharedBox/file_vndpri.jpg"
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                height="350"
                className="d-block w-100"
                src="https://res.cloudinary.com/sharedbox/image/upload/v1601927385/sharedBox/file_uu3j2l.jpg"
                alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                height="350"
                className="d-block w-100"
                src="https://res.cloudinary.com/sharedbox/image/upload/v1601927385/sharedBox/file_bm0qcf.jpg"
                alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
        </Col>
      </Row>
      <Row className="justify-content-md-center m-4">
         <Col className="bg-dark p-3 mb-4" lg="8">
             <h3 style={{color: "yellow", textAlign: "center"}}>¿Buscando donde parquear?</h3>
             <p style={{color: "white"}}>
                 En <span>Parqueadero Alarcon</span> queremos ofrecerte el mejor de los servicios,
                 por eso te traemos esta aplicacion, en la cual podras tener acceso a diferentes
                 servicios, desde la comodidad de tu dispositivo movil o computador, tales como: 
                 <ul>
                     <li>Pago de tu Mensualidad</li>
                     <li>Gestion de tu Mensualidad</li>
                     <li>Solicitud de Prorrogas de tu Mensualidad</li>
                     <li>Solicitud de Servicio de Valet Parking</li>
                     <li>Agendar servicios de lavado de tu vehiculo</li>
                </ul>
                Si no te has registrado te invitamos a hacerlo ya mismo, y empieza a disfrutar de nuestros
                servicios!!!
             </p>
            <Container className='text-center'>
                <Button className="bg-primary mr-3">Registro</Button>
                <Button className="bg-primary">login</Button>
            </Container>
        </Col>
        <Col className="mb-4" lg="4">
            <img
            height="350"
            className="d-block w-100"
            src="https://res.cloudinary.com/sharedbox/image/upload/v1602102306/Parking%20Alarcon/250920-pico-placa-actualidad_e5o0de.png"
            alt="Pico y Placa"
            />
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-4">
        <Col className="bg-dark p-3 mb-4" lg="8">
            
        </Col>
      </Row>
    </Container>
  );
}

export default Home;