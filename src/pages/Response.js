import React, { useEffect, useState } from 'react';
import { GetPaymentInfoByReference, paidMensualidad } from '../utils/httpRequests';
import queryString from 'query-string'
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Response({location}){
    const history = useHistory()
    const [response, setResponse] = useState({})
    useEffect(()=>{
        const parsed = queryString.parse(location.search);
        const getResponse = async () => {
            const response = await GetPaymentInfoByReference(parsed.ref_payco)
            console.log(response)
            if(response.data.x_cod_response === 1) await paidMensualidad(response.data.x_extra4)
            setResponse(response.data)
        }
        getResponse()
    },[])
    return(
        <Container >
                <Card className="text-center bg-dark mt-5 mb-5">
                    <Card.Header style={{color:"yellow"}}>Comprobante de Compra</Card.Header>
                    <Card.Body style={{color:"white"}}>
                        <Card.Title> <h5 style={{color:"yellow"}}>Estado de la transaccion:</h5> {response.x_transaction_state} </Card.Title>
                        <Row className="mt-5">
                            <Col sm={12} md={6}>
                                <Card.Text> <h5 style={{color:"yellow"}}> Referencia de pago: </h5> {response.x_transaction_id} </Card.Text>
                                <Card.Text> <h5 style={{color:"yellow"}}> Valor: </h5> ${response.x_amount}</Card.Text>
                            </Col>
                            <Col sm={12} md={6}>
                                <Card.Text> <h5 style={{color:"yellow"}}> Fecha: </h5> {response.x_fecha_transaccion}</Card.Text>
                                <Card.Text> <h5 style={{color:"yellow"}}> Para Mensualidad </h5> {response.x_extra2} {response.x_extra3} </Card.Text>
                            </Col>
                        </Row>
                        <Button onClick={()=>history.push("/user")} className="bg-primary mt-5">Finalizar</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Payments processed by <img src="https://res.cloudinary.com/sharedbox/image/upload/v1603386505/Parking%20Alarcon/epayco_elyho0.png"/></Card.Footer>
                </Card>
        </Container>
    )
}