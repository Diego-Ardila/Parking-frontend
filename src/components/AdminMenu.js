import React, { useState }  from 'react';
import {Button, Container, Card, Row } from 'react-bootstrap';

export default function Menu ({setSubMenu}) {

return(
    <Container className="bg-dark p-3">
        <Card className="bg-secondary p-3">
            <Row className="justify-content-center">
                <Button className=" bg-primary col-lg-5 m-3 " onClick={()=>{setSubMenu('chat')}} >Chats en vivo</Button>
            </Row>
            <Row className="justify-content-center">
                <Button className="bg-primary col-lg-5 m-3" onClick={() => setSubMenu('mensualidades')}>Mensualidades</Button>
            </Row>
            <Row className="justify-content-center">
                <Button className="bg-primary col-lg-5 m-3" onClick={() => setSubMenu('lavadero')}>Lavadero</Button>
            </Row>
            <Row className="justify-content-center">
                <Button className="bg-primary col-lg-5 m-3" onClick= {()=>setSubMenu('picoyplaca')}>Actualizar Pico y Placa</Button>
            </Row>
        </Card>
    </Container>
)
}