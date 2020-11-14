import React from 'react';
import { Modal, Col, Form, Row, Button } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import Calendar from 'react-calendar';
import { createLavado } from '../utils/httpRequests';
import swal from 'sweetalert';

export default function LavaderoModal(props){
    const { register, handleSubmit, control, errors } = useForm();

    const onSubmit = (data)=>{
      const handleCreate = async () => {
        try{
          const lavado = await createLavado(data)
          swal("success",`Tu lavado para ${lavado.date} quedo agendado`,"success")
          props.onHide()
        }catch(err){
          swal("Error",`${err.response.data}`,"error")
        }
      }
      handleCreate()
    }
    return(
        <Modal {...props} className="card" >
        <Modal.Header className="bg-dark" closeButton>
          <Modal.Title style={{color:"whitesmoke"}}>Agenda tu servicio de Lavado</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="card">
        <Row>
            <Col className="justify-content-center">
              <Form.Group>
                <Form.Label><h5>Placa</h5></Form.Label>
                <Form.Control name="badge" ref={register({required: true})} type="text" placeholder="escribe la placa de tu vehiculo" />
                {errors.badge && <p style={{color:"red"}}>Campo requerido/Ingresar maximo 6 caracteres</p>}
              </Form.Group>
            </Col>
        </Row>
        <h4>selecciona la fecha de tu servicio</h4>
        <Row className="text-center">
          <Col lg={2} sm={12}></Col>
          <Col lg={8}>
            <Controller
                defaultValue={new Date()}
                control={control}
                name="date"
                rules={{ required: true }}
                render={({ onChange, value}) => (
                <Calendar
                    onChange={(date)=> onChange(date)}
                    value={value}
                    maxDetail="month"
                    minDate={new Date()}
                />
                )}
            />
            </Col>
        </Row>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button className="bg-secondary" onClick={props.onHide}>
              Cerrar
          </Button>
          <Button type="submit" className="bg-primary">
              Agendar
          </Button>
        </Modal.Footer>
      </Form>
      </Modal>
    )
}