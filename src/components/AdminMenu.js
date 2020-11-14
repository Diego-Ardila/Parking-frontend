import React, { useState }  from 'react';
import {Button, Container, Card, Row } from 'react-bootstrap';

export default function Menu ({setSubMenu}) {

return(
    <Container className="text-center mt-4 p-3">
        <h3 style={{color:"whitesmoke"}}>Admin Area</h3>
        <Card className="card mt-5 p-3">
            <Row className="justify-content-center">
                <Button className=" bg-primary col-lg-5 m-3 " onClick={()=>{setSubMenu('chat')}} >Chats en vivo</Button>
            </Row>
            <Row className="justify-content-center">
                <Button className="bg-primary col-lg-5 m-3" onClick={() => setSubMenu('mensualidades')}>Mensualidades</Button>
            </Row>
            <Row className="justify-content-center">
                <Button className="bg-primary col-lg-5 m-3" onClick={() => setSubMenu('lavadero')}>Lavadero</Button>
            </Row>
        </Card>
    </Container>
)
}