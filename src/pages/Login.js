import React,{ useState } from "react";
import * as Yup from "yup";
import { Container, Card, Form, Button, Col, Image, Spinner } from "react-bootstrap";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import {login} from '../utils/httpRequests';
import swal from 'sweetalert';
import {useHistory} from 'react-router-dom';


const logo= "https://res.cloudinary.com/sharedbox/image/upload/v1602101798/Parking%20Alarcon/LOGO_PARQUEADERO_AlARCON_agpwld.png"

const formSchema = Yup.object().shape({
    email: Yup.string().required("campo requerido"),
    password: Yup.string().required("campo requerido")
})

export default function Login() {
    const history = useHistory()
    let { register, handleSubmit, errors, formState:{isSubmitting} } = useForm({
        resolver: yupResolver(formSchema)
      });
    const onSubmit = async (data)=>{
        try{
        const {token} = await login(data)
        localStorage.setItem("token", token)
        swal("Registro Satisfactorio","Tu usuario fue creado satisfactoriamente","success")
        history.push('/user')
        }catch(err){
            swal("Error",`${err.response.data}`,"error")
        }
      }
    return(
        <Container>
            <Card className="bg-dark p-3 mt-5">
            <Form onSubmit={handleSubmit(onSubmit)} className="justify-content-center mt-3">
                <Form.Row className="justify-content-center">
                    <Col sm={6} md={4} className="text-center">
                        <Image style= {{width: 130}} src={logo} alt="logo"></Image>
                    </Col>
                </Form.Row>
                <Form.Row className="justify-content-center mt-3">
                    <Col className="col-lg-6" >
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{color:"white"}} >Email</Form.Label>
                        <Form.Control name="email" ref={register} type="email" placeholder="Escriba su email" className={ errors.email ? "is-invalid" : null}/>
                        { errors.email && <div className="error-message">{errors.email.message}</div>}
                        <Form.Text className="text-muted">
                        Nunca compartiremos tu correo con nadie.
                        </Form.Text>
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
                        <Button className="bg-primary" type="submit">
                        Enviar
                        </Button>
                    </Col>
                </Form.Row>
                </Form>
            </Card>
        </Container>
    )
}