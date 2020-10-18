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
              swal("Error",`Ups algo salio mal`,"error")
              isSubmitting= false
          }
      }
    return (
        <Container>
            <Row className="justify-content-md-center mt-5 mb-5">
                <Col md={4} sm={11}>
                <Form onSubmit={handleSubmit(onSubmit)}  noValidate>
                    <Form.Group >
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control ref={register} name="name" type="text" placeholder="Ingresa tu nombre"  className={ errors.name ? "is-invalid" : null}  />
                        { errors.name && <div className="error-message">{errors.name.message}</div>}
                    </Form.Group>                      
                    <Form.Group >
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control ref={register} name="email" type="text" placeholder="Ingresa tu Email"  className={ errors.email ? "is-invalid" : null}  />
                        { errors.email && <div className="error-message">{errors.email.message}</div>}
                    </Form.Group> 
                    <Form.Group >
                        <Form.Label>Numero Celular</Form.Label>
                        <Form.Control ref={register} name="phoneNumber" type="tel" placeholder="Ingresa tu Numero Celular" className={ errors.phoneNumber ? "is-invalid" : null}  />
                        { errors.phoneNumber && <div className="error-message">{errors.phoneNumber.message}</div>}
                    </Form.Group> 
                    <Form.Group >
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control ref={register} name="password" type="password" placeholder="Ingresa tu Contraseña" className={ errors.password ? "is-invalid" : null}  />
                        { errors.password && <div className="error-message">{errors.password.message}</div>}
                    </Form.Group> 
                    <Form.Group >
                        <Form.Label>Validar Contraseña</Form.Label>
                        <Form.Control ref={register} name="v_password" type="password" placeholder="Ingresa nuevamente tu Contraseña" className={ errors.v_password ? "is-invalid" : null}  />
                        { errors.v_password && <div className="error-message">{errors.v_password.message}</div>}
                    </Form.Group> 
                    {isSubmitting ? <Spinner animation="border" variant="warning" size="xl" /> : null}
                    <Form.Group className="text-center" >
                        <Button className="bg-primary m-3" size="md" type="submit">
                            Enviar
                        </Button>
                    </Form.Group>
                </Form>
                </Col>
            </Row>
        </Container>
        
    )
}