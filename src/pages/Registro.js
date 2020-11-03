import React,{ useState } from "react";
import {useHistory} from 'react-router-dom';
import * as Yup from "yup";
import { Container, Card, Form, Button, Col, Image, Spinner, Row } from "react-bootstrap";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import {createUser} from '../utils/httpRequests';
import swal from 'sweetalert';


const formSchema = Yup.object().shape({   
    name: Yup.string().required("Campo Requerido"),
    email: Yup.string().email("el E-mail no es valido").required("Campo Requerido"),
    phoneNumber: Yup.number().typeError('Debes ingresar solo numeros').test('len', 'Debes ingresar al menos 10 numeros', val => val && val.toString().length >= 10 ),
    password: Yup.string().required("Campo Requerido"),
    v_password: Yup.string().oneOf([Yup.ref('password')], "Las contraseñas deben coincidir").required("Campo Requerido")
})

export default function Registro() {
    const history = useHistory()
    let { register, handleSubmit, errors, formState:{isSubmitting} } = useForm({
        resolver: yupResolver(formSchema)
      });

      const onSubmit= async (data)=>{
          try{
            isSubmitting= true
            const {token} = await createUser(data)
            localStorage.setItem("token", token)
            swal("Registro Satisfactorio","Tu usuario fue creado satisfactoriamente","success")
            history.push("/user")
          }catch(err){
              swal("Error",`${err.response.data}`,"error")
              isSubmitting= false
          }
      }
    return (
        <Container>
            <Row className="justify-content-md-center mt-5 mb-5">
                <Col className="card" md={4} sm={11}>
                <Form onSubmit={handleSubmit(onSubmit)}  noValidate>
                    <Form.Group >
                        <Form.Label  style={{color: "white"}}>Nombre</Form.Label>
                        <Form.Control ref={register} name="name" type="text" placeholder="Ingresa tu nombre"  className={ errors.name ? "is-invalid" : null}  />
                        { errors.name && <div className="error-message">{errors.name.message}</div>}
                    </Form.Group>                      
                    <Form.Group >
                        <Form.Label  style={{color: "white"}}>E-mail</Form.Label>
                        <Form.Control ref={register} name="email" type="text" placeholder="Ingresa tu Email"  className={ errors.email ? "is-invalid" : null}  />
                        { errors.email && <div className="error-message">{errors.email.message}</div>}
                    </Form.Group> 
                    <Form.Group >
                        <Form.Label  style={{color: "white"}}>Numero Celular</Form.Label>
                        <Form.Control ref={register} name="phoneNumber" type="tel" placeholder="Ingresa tu Numero Celular" className={ errors.phoneNumber ? "is-invalid" : null}  />
                        { errors.phoneNumber && <div className="error-message">{errors.phoneNumber.message}</div>}
                    </Form.Group> 
                    <Form.Group >
                        <Form.Label  style={{color: "white"}}>Contraseña</Form.Label>
                        <Form.Control ref={register} name="password" type="password" placeholder="Ingresa tu Contraseña" className={ errors.password ? "is-invalid" : null}  />
                        { errors.password && <div className="error-message">{errors.password.message}</div>}
                    </Form.Group> 
                    <Form.Group >
                        <Form.Label  style={{color: "white"}}>Validar Contraseña</Form.Label>
                        <Form.Control ref={register} name="v_password" type="password" placeholder="Ingresa nuevamente tu Contraseña" className={ errors.v_password ? "is-invalid" : null}  />
                        { errors.v_password && <div className="error-message">{errors.v_password.message}</div>}
                    </Form.Group> 
                    <Form.Row className="justify-content-center mt-3">
                    <Col className="col-lg-6 text-center">
                    {isSubmitting ? <Col className="col-lg-6 text-center"><Spinner animation="border" variant="warning" size="xl" /></Col>  : null}
                        <Button disabled={isSubmitting} className="bg-primary" type="submit">
                         {!isSubmitting ? "Enviar" : "...Cargando"}
                        </Button>
                    </Col>
                </Form.Row>
                </Form>
                </Col>
            </Row>
        </Container>
        
    )
}