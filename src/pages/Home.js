import React from 'react';
import {useHistory} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';




function Home() {
  const history = useHistory()

  return (
    <Container fluid>
      <Row className="justify-content-md-center mt-5">
         <Col className="card p-3 mb-4" lg="8">
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
                <Button onClick={()=> history.push('/registro')} className="bg-primary mr-3">Registro</Button>
                <Button onClick={()=> history.push('/login')} className="bg-primary">login</Button>
            </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;