import React, { useEffect, useState } from 'react';
import { Container, Modal, Button, Card, Form, Row, Col, Carousel, Jumbotron } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import Calendar from 'react-calendar';
import { createMensualidad, updateMensualidad } from '../utils/httpRequests';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

export default function Mensualidades(props) {
    const [update, setUpdate] = useState(null)
    const [index, setIndex] = useState(0)
    const [mensualidades, setMensualidades] = useState([])
    const [user, setUser] = useState()
    const [show, setShow] = useState(false)
    const { register, handleSubmit, control, errors } = useForm();
    const history = useHistory()

    useEffect(()=>{
      if(!props.history.location.user) return history.goBack()
      setUser(props.history.location.user)
      setMensualidades( props.history.location.user.mensualidades )
    },[])

    const onSubmit = async (data) => {
        try{
          if(!update){
            const mensualidad = await createMensualidad(data)
            setMensualidades(prev => [...prev, mensualidad] )
            swal("Mensualidad Creada",`tu mensualidad fue creada satisfactoriamente y quedo vigente hasta ${mensualidad.finDate}`,"success")
          }else{
            const mensualidad = await updateMensualidad(data)
            const newMensualidades = mensualidades.filter(m => {
                                        return m._id !== mensualidad._id
                                      }).concat(mensualidad)
            setMensualidades(newMensualidades)
            swal("Mensualidad Actualizada",`tu mensualidad quedo vigente hasta ${mensualidad.finDate}`,"success")
          }
        }catch(err){
            console.log(err)
        }
        setShow(false)
    }

    return (
        <Container>
          <Row className="justify-content-center mt-4 mb-5">
            <Col md={8} lg={10} className="text-center">
            <Carousel activeIndex={index} onSelect={(selectedIndex,e)=> setIndex(selectedIndex) } interval={null}>
                  {mensualidades.length === 0 ?
                    <Carousel.Item>
                        <Jumbotron className="bg-dark">
                            <h3 style={{color:"whitesmoke"}}>Aun no tienes mensualidades</h3>
                            <p style={{color:"whitesmoke"}}>Te invitamos a que pulses el boton de abajo e inicies una nueva mensualidad con nosotros</p>
                        </Jumbotron>
                    </Carousel.Item> :
                    mensualidades.map(mensualidad => {
                    if(new Date(mensualidad.finDate.split("/").reverse().join(",")).getTime() > new Date().getTime()){
                      return(<Carousel.Item>
                                <Jumbotron className="bg-dark">
                                    <h5 style={{color:"whitesmoke"}}>Tienes una mensualiadad activa desde {mensualidad.inDate} hasta {mensualidad.finDate} del vehiculo de placas {mensualidad.badge} </h5>
                                    <p style={{color:"whitesmoke"}}>Aqui puedes renovarla cuando quieras</p>
                                    <Button onClick={()=>{setShow(true);setUpdate(mensualidad)}} className="bg-primary m-3">Renovar Mensualidad</Button>
                                </Jumbotron>
                            </Carousel.Item>)
                    }else{
                      return(<Carousel.Item>
                                <Jumbotron className="bg-dark">
                                    <h3 style={{color:"whitesmoke"}}>Tu mensualidad se vencio el {mensualidad.finDate}</h3>
                                    <p style={{color:"whitesmoke"}}>Aqui puedes renovarla</p>
                                    <Button onClick={()=>{setShow(true);setUpdate(mensualidad)}} className="bg-primary m-3">Renovar Mensualidad</Button>
                                </Jumbotron>
                            </Carousel.Item>)
                    }
                    })
                    }
              </Carousel>
            </Col>
          </Row>
          <Row className="justify-content-center mt-2 mb-5">
              <Col className="text-center">
                <Button size="lg" className="bg-primary" onClick={()=>{ setUpdate(null); setShow(true) }}> Nueva Mensualidad </Button>
              </Col>
          </Row>
          <Modal size="lg" show={show} onHide={()=>{ setShow(false) }}>
            <Modal.Header closeButton>
              <Modal.Title>Iniciar Nueva Mensualidad</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
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
            <Modal.Footer>
              <Button className="bg-primary" onClick={()=>{ setShow(false) }}>
                  Cerrar
              </Button>
              <Button type="submit" className="bg-primary">
                  {update ? "Actualizar" : "Crear"}
              </Button>
            </Modal.Footer>
          </Form>
          </Modal>
        </Container>
    )
}