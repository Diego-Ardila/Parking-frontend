import React, { useState, useRef } from 'react';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import LavaderoModal from "./LavaderoModal"

export default function Lavadero() {
    const [subMenu, setSubMenu] = useState("default")
    const [show, setShow] = useState(false)
    const message = {}
    const myRef = useRef()
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop) 

    switch(subMenu){
        case "basico":
            message.header = "Lavado Basico";
            message.body = "Incluye lavado exterior con hidrolavadora a presion, limpieza del interior, con aspirado y encerado de tablero y parte interior de las puertas"
            message.price = "$15.000";
            break;
        case "cogineria":
            message.header = "Lavado Interior";
            message.body = "Incluye Lavado de todas las partes interiores del vehiculo como tapiceria, pisos,techo, carteras, etc."
            message.price = "$70.000";
            break;
        case "motor":
            message.header = "Lavado del Motor";
            message.body = "Lavado del Motor y piezas en general ubicadas dentro del capo, totalmente en seco para preservar las piezas mas delicadas, utilizando productos desengrasantes biodegradables";
            message.price = "$25.000";
            break;
        case "ecologico":
            message.header = "Lavado en Seco";
            message.body = "Lavado total del vehiculo sin gastar agua; utilizando productos EcoBless, que son totalmente biodegradables, fucionan con nanotecnologia preservando la integridad de la pintura del vehiculo";
            message.price = "$15.000";
            break;
        case "motocicleta":
            message.header = "Lavado de Motocicleta";
            message.body = "Lavado total de motocicleta con hidrolavadora, desengrasante y siliconado de llantas";
            message.price = "$10.000"
            break;
        default:
            break;
    }

    return (
        <Container>
            <Row>
                <Col sm={12} md={6}>
                    <Card className="card mt-5 p-3">
                    <Card.Title className="text-center">
                        <h4 style={{color:"yellow"}}>Elige el servicio de lavado que prefieres</h4>
                    </Card.Title>
                    <Row className="justify-content-center">
                        <Button className=" bg-primary col-lg-5 m-3 " onClick={()=>{setSubMenu('basico'); scrollToRef(myRef)}} >Basico</Button>
                    </Row>
                    <Row className="justify-content-center">
                        <Button className="bg-primary col-lg-5 m-3" onClick={() => {setSubMenu('cogineria'); scrollToRef(myRef)}}>Cogineria/Interior</Button>
                    </Row>
                    <Row className="justify-content-center">
                        <Button className="bg-primary col-lg-5 m-3" onClick={() =>{ setSubMenu('motor'); scrollToRef(myRef)}}>Motor</Button>
                    </Row>
                    <Row className="justify-content-center">
                        <Button className="bg-primary col-lg-5 m-3" onClick={() => {setSubMenu('ecologico'); scrollToRef(myRef)}}>Ecologico</Button>
                    </Row>
                    <Row className="justify-content-center">
                        <Button className="bg-primary col-lg-5 m-3" onClick={() => {setSubMenu('motocicleta'); scrollToRef(myRef)}}>Motocicleta</Button>
                    </Row>
                    </Card>
                </Col>
                <Col ref={myRef} sm={12} md={6}>
                    {subMenu==="default" ?
                    <Card className="card text-center mt-5 p-3">
                        <Card.Img variant="top" src="park6.jpg" />
                    </Card>
                    :
                    <Card className="card text-center mt-5 p-3">
                        <Card.Body>
                            <Card.Title style={{color:"white"}}>{message.header}</Card.Title>
                            <Card.Text style={{color:"white"}}>{message.body}</Card.Text>
                            <Card.Text style={{color:"white"}}>Precio: {message.price}</Card.Text>
                            <Button className="bg-primary" onClick={()=>setShow(true)}>Agendalo aca</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">Estaremos atentos a atender tu servicio</Card.Footer>
                    </Card>
                    }
                </Col>
            </Row>
            <LavaderoModal show={show} onHide={()=>setShow(false)}></LavaderoModal>
        </Container>
    )
}