import React, { useEffect, useState } from 'react';
import { Container, Modal, Button, Card, Form, Row, Col, Carousel, Jumbotron } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import Calendar from 'react-calendar';
import { useHistory } from 'react-router-dom';
import PaymentButton from '../components/PaymentButton';

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

export default function Mensualidades(props) {
    let [dataDb, setDataDb] = useState(null)
    const [update, setUpdate] = useState(null)
    const [index, setIndex] = useState(0)
    const [mensualidades, setMensualidades] = useState([])
    const [user, setUser] = useState(null)
    const [show, setShow] = useState(false)
    const [showPay, setShowPay] = useState(false)
    const { register, handleSubmit, control, errors } = useForm();
    const history = useHistory()

    useEffect(()=>{
      if(!props.history.location.user) return history.goBack()
      setUser(props.history.location.user)
      setMensualidades( props.history.location.user.mensualidades )
    },[])

    const onSubmit = async (data) => {
      switch(data.vehicle){
        case "moto" : data.price = 36000;
        break;
        default: data.price = 110000;
      }
      setDataDb(data)
      setShowPay(true)
    }

    return (
        <Container>
          <Row className="justify-content-center mt-4 mb-5">
            <Col className="text-center">
            <Card className="align-content-center">
              <Card.Header style={{color:"whitesmoke"}}><h4>Deseas iniciar una nueva mensualidad con nosotros?</h4></Card.Header>
              <Card.Body>
                <Card.Title style={{color:"whitesmoke"}}>Moto: $36.000 <br/> Carro/Camioneta: $110.000</Card.Title>
                <Button size="lg" className="bg-primary mt-4" onClick={()=>{ setUpdate(null); setShow(true) }}> Nueva Mensualidad </Button>
              </Card.Body>
            </Card>
            </Col>
          </Row>
          <Row className="justify-content-center mt-4 mb-5">
            <Col md={8} lg={10} className="text-center">
            <Carousel className="card" activeIndex={index} onSelect={(selectedIndex,e)=> setIndex(selectedIndex) } interval={null}>
                  {mensualidades.length === 0 ?
                    <Carousel.Item>
                        <Jumbotron className="card text-center">
                            <h3 style={{color:"whitesmoke"}}>Hola {user && user.name} aun no tienes mensualidades</h3>
                            <p style={{color:"whitesmoke"}}>Te invitamos a que pulses el boton de arriba e inicies una nueva mensualidad con nosotros</p>
                        </Jumbotron>
                    </Carousel.Item> :
                    mensualidades.map((mensualidad) => {
                    if(new Date(mensualidad.finDate.split("/").reverse().join(",")).getTime() > new Date().getTime()){
                      return(<Carousel.Item key={mensualidad._id} >
                                <Jumbotron className="card text-center">
                                  <Row className="text-center">
                                    <Col md={3}></Col>
                                    <Col md={6} >{mensualidad.paid ? <h4 style={{color:"#00FF00"}}>Esta Mensualidad esta Activa</h4> : <h4 style={{color:"#FF3333"}}>Esta Mensualidad aun no esta pagada</h4>}</Col>
                                    <Col md={3}></Col>
                                  </Row>
                                    <Row className="justify-content-center m-4">
                                      <Col style={{color:"whitesmoke"}}> <h5>Fecha Inicial: {mensualidad.inDate}</h5></Col>
                                      <Col style={{color:"whitesmoke"}}><h5>Fecha Final: {mensualidad.finDate}</h5></Col>
                                    </Row>
                                    <Row className="justify-content-center m-4">
                                    <Col style={{color:"whitesmoke"}}> <h5>Placas del Vehiculo: {mensualidad.badge}</h5></Col>
                                      <Col style={{color:"whitesmoke"}}><h5>Tipo de Vehiculo: {mensualidad.vehicle}</h5></Col>
                                    </Row>
                                    <Row className="mt-4">
                                      <Col>
                                        <p style={{color:"whitesmoke"}}>Aqui puedes renovarla cuando quieras</p>
                                        {mensualidad.paid ? 
                                        <Button onClick={()=>{setShow(true);setUpdate(mensualidad)}} className="bg-primary">Renovar Mensualidad</Button> : 
                                        <PaymentButton 
                                          data={mensualidad}
                                          userName={user && user.name}
                                          update= {"direct pay"} />}
                                      </Col>
                                    </Row>
                                </Jumbotron>
                            </Carousel.Item>)
                    }else{
                      return(<Carousel.Item key={mensualidad._id}>
                                <Jumbotron className="card text-center">
                                  <h4 style={{color:"#FF3333"}}>Esta Mensualidad esta Vencida</h4>
                                    <Row className="justify-content-center m-4">
                                      <Col style={{color:"whitesmoke"}}> <h5>Fecha Vencimiento: {mensualidad.finDate}</h5></Col>
                                    </Row>
                                    <Row className="justify-content-center m-4">
                                      <Col style={{color:"whitesmoke"}}> <h5>Placas del Vehiculo: {mensualidad.badge}</h5></Col>
                                      <Col style={{color:"whitesmoke"}}><h5>Tipo de Vehiculo: {mensualidad.vehicle}</h5></Col>
                                    </Row>
                                    <Row className="mt-4">
                                      <Col>
                                        <p style={{color:"whitesmoke"}}>Aqui puedes renovarla cuando quieras</p>
                                        <Button onClick={()=>{setShow(true);setUpdate(mensualidad)}} className="bg-primary">Renovar Mensualidad</Button>
                                      </Col>
                                    </Row>
                                </Jumbotron>
                            </Carousel.Item>)
                    }
                    })
                    }
              </Carousel>
            </Col>
          </Row>
          <Modal className="card" size="lg" show={show} onHide={()=>{ setShow(false) }}>
            <Modal.Header className="bg-dark" closeButton>
              <Modal.Title style={{color:"whitesmoke"}}>Iniciar Nueva Mensualidad</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body className="card">
            <Row>
                <Col md={12} lg={6}>
                  <Form.Group>
                    <Form.Label>Elige el tipo de Vehiculo</Form.Label>
                    {update ? 
                    <Form.Control name="vehicle" value={update.vehicle} ref={register({required: true})} readOnly /> :
                    <Form.Control name="vehicle" ref={register({required: true})} as="select">
                      <option value="carro">Carro</option>
                      <option value="moto">Moto</option>
                      <option value="camioneta">Camioneta</option>
                    </Form.Control>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Cedula</Form.Label>
                    {update ?
                    <Form.Control name="cedula" ref={register({required: true})} readOnly defaultValue={update.cedula} /> :
                    <Form.Control name="cedula" ref={register({required: true})} type="number" placeholder="escribe tu numero de cedula" />
                    }     
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Empresa</Form.Label>
                    {update ?
                    <Form.Control name="company" ref={register({required: true})} readOnly defaultValue={update.company} /> :
                    <Form.Control name="company" ref={register({required: true})} type="text" placeholder="ESSA/Fiscalia otras..." />
                    }
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Placa del Vehiculo</Form.Label>
                    {update ?
                    <Form.Control name="badge" ref={register({required: true, maxLength: 6})} readOnly defaultValue={update.badge} /> :
                    <Form.Control name="badge" ref={register({required: true, maxLength: 6})} type="text" placeholder="escribe la placa de tu Vehiculo" />
                    }
                    {errors.badge && <p>Ingresar maximo 6 caracteres</p>}
                  </Form.Group>
                </Col>
                <Col md={12} lg={6} className="text-center">
                <h4>selecciona la fecha de inicio de tu mensualidad</h4>
                <Controller
                    defaultValue={update ? new Date(update.finDate.split("/").reverse().join(",")) : new Date()}
                    control={control}
                    name="date"
                    rules={{ required: true }}
                    render={({ onChange, value}) => (
                    <Calendar
                        onChange={(date)=> onChange(date)}
                        value={value}
                        maxDetail="month"
                        minDate={update ? new Date(update.finDate.split("/").reverse().join(",")) : new Date()}
                    />
                    )}
                />
                </Col>
            </Row>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
              <Button className="bg-secondary" onClick={()=>{ setShow(false) }}>
                  Cerrar
              </Button>
              <Button type="submit" className="bg-primary">
                  {update ? "Actualizar" : "Crear"}
              </Button>
            </Modal.Footer>
          </Form>
          </Modal>
          <Modal  show={showPay} backdrop="static" onHide={()=>{setShowPay(false)}}>
            <Modal.Header className="bg-dark" closeButton>
              <Modal.Title style={{color:"whitesmoke"}}>Estas a un paso de {update ? "renovar" : "iniciar"} tu mensualidad </Modal.Title>
            </Modal.Header>
            <Modal.Body className="card">Confirmas el pago de {dataDb && dataDb.price} por tu mensualidad de {dataDb && dataDb.vehicle} por el mes de {dataDb && months[dataDb.date.getMonth()]} </Modal.Body>
            <Modal.Footer className="bg-dark">
              <Button variant="secondary" onClick={async ()=>{setShowPay(false)}}>
                Cancelar
              </Button>
              <PaymentButton
                data={dataDb}
                userName={user && user.name}
                update= {update} />
            </Modal.Footer>
          </Modal>
        </Container>
    )
}