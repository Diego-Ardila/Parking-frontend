import React,{ useState } from "react";
import * as Yup from "yup";
import { Container, Form, Button, Col, Image, Spinner } from "react-bootstrap";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import {adminLogin} from '../utils/httpRequests';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';


const logo= "https://res.cloudinary.com/sharedbox/image/upload/v1602101798/Parking%20Alarcon/LOGO_PARQUEADERO_AlARCON_agpwld.png"

const formSchema = Yup.object().shape({
    name: Yup.string().required("campo requerido"),
    password: Yup.string().required("campo requerido")
})

export default function Login() {
    const history = useHistory()
    let { register, handleSubmit, errors, formState:{isSubmitting} } = useForm({
        resolver: yupResolver(formSchema)
      });
    const onSubmit = async (data)=>{
        try{
        isSubmitting = true
        const token = await adminLogin(data)
        localStorage.setItem("token", token)
        history.push('/admin')
        }catch(err){
            swal("Error",`${err.response.data}`,"error")
        }
      }
    return(
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)} className="card justify-content-center mt-3">
                <Form.Row className="justify-content-center">
                    <Col sm={6} md={4} className="text-center">
                        <Image style= {{width: 130}} src={logo} alt="logo"></Image>
                    </Col>
                </Form.Row>
                <Form.Row className="justify-content-center">
                    <Col sm={6} md={4} className="text-center">
                        <h4 style={{color: "yellow"}}>Area Administrativa</h4>
                    </Col>
                </Form.Row>
                <Form.Row className="justify-content-center mt-3">
                    <Col className="col-lg-6" >
                      <Form.Group controlId="formBasicName">
                        <Form.Label style={{color:"white"}} >Nombre del Admin</Form.Label>
                        <Form.Control name="name" ref={register} type="text" placeholder="Escriba su nombre" className={ errors.name ? "is-invalid" : null}/>
                        { errors.name && <div className="error-message">{errors.name.message}</div>}
                      </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row className="justify-content-center mt-3">
                    <Col className="col-lg-6">
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label style={{color:"white"}}>Contraseña</Form.Label>
                        <Form.Control name="password" ref={register} type="password" placeholder="XXXXXX" className={ errors.password ? "is-invalid" : null} />
                        { errors.password && <div className="error-message">{errors.password.message}</div>}
                      </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row className="justify-content-center mt-3">
                    <Col className="col-lg-6 text-center">
                        {isSubmitting ? <Col className="col-lg-6 text-center"><Spinner animation="border" variant="warning" size="xl" /></Col>  : null}
                        <Button disabled={isSubmitting} className="bg-primary" type="submit">
                         {!isSubmitting ? "Entrar" : "...Cargando"}
                        </Button>
                    </Col>
                </Form.Row>
                </Form>
        </Container>
    )
}