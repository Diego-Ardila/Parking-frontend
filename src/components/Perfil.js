import React,{ useEffect, useState } from "react";
import * as Yup from "yup";
import { Container, Form, Button, Col, Spinner, Row } from "react-bootstrap";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { updateUser, getUser } from '../utils/httpRequests';
import swal from 'sweetalert';

const formSchema = Yup.object().shape({   
    name: Yup.string().required("Campo Requerido"),
    email: Yup.string().email("el E-mail no es valido").required("Campo Requerido"),
    phoneNumber: Yup.number().typeError('Debes ingresar solo numeros').test('len', 'Debes ingresar al menos 10 numeros', val => val && val.toString().length >= 10 )
})

export default function Perfil() {
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState(false)
    const token = localStorage.getItem("token")
    let { register, handleSubmit, errors, formState:{isSubmitting} } = useForm({
        resolver: yupResolver(formSchema)
    });

    useEffect(()=>{
        const fetchUser = async ()=>{
            const userDb = await getUser(token)
            setUser(userDb)
        }
        fetchUser()
    },[])

    const onSubmit= async (data)=>{
        console.log(data)
        try{
          const userDb = await updateUser(data)
          setUser(userDb)
          swal("Edicion Realizada","Tu usuario fue editado satisfactoriamente","success")
          setEdit(false)
        }catch(err){
            swal("Error",`${err.response.data}`,"error")
        }
    }

    return (
        <Container>
            <Row className="text-center mt-5 mb-5">
                <Col className="card p-5" md={4} sm={11}>
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Form.Group >
                        <Form.Label  style={{color: "white"}}>Nombre</Form.Label>
                        { !edit ?
                        <Form.Control style={{color: "white"}} className="bg-dark" defaultValue={user.name} name="name" type="text"  readOnly  /> :
                        <Form.Control ref={register} name="name" type="text" defaultValue={user.name}  className={ errors.name ? "is-invalid" : null}  />}
                        { errors.name && <div className="error-message">{errors.name.message}</div>}
                    </Form.Group>
                    <Form.Group >
                        <Form.Label  style={{color: "white"}}>E-mail</Form.Label>
                        { !edit ?
                        <Form.Control style={{color: "white"}} className="bg-dark" defaultValue={user.email} name="email" type="text"  readOnly  /> :
                        <Form.Control ref={register} name="email" defaultValue={user.email} type="text" className={ errors.email ? "is-invalid" : null}  />}
                        { errors.email && <div className="error-message">{errors.email.message}</div>}
                    </Form.Group> 
                    <Form.Group >
                        <Form.Label  style={{color: "white"}}>Numero Celular</Form.Label>
                        { !edit ? 
                        <Form.Control style={{color: "white"}} className="bg-dark" defaultValue={user.phoneNumber} name="phoneNumber" type="tel" readOnly  /> :
                        <Form.Control ref={register} name="phoneNumber" defaultValue={user.phoneNumber} type="tel" className={ errors.phoneNumber ? "is-invalid" : null}  />}
                        { errors.phoneNumber && <div className="error-message">{errors.phoneNumber.message}</div>}
                    </Form.Group>
                    <Form.Row className="justify-content-center mt-3">
                    <Col className="col-lg-6 text-center">
                    {isSubmitting ? <Col className="col-lg-6 text-center"><Spinner animation="border" variant="warning" size="xl" /></Col>  : null}
                        { edit &&
                        <Button type="submit" className="bg-primary mt-3" >
                         {!isSubmitting ? "Enviar" : "...Cargando"}
                        </Button>}
                    </Col>
                   </Form.Row>
                </Form>
                    <Col className="col-lg-6 text-center">{!edit && <Button type="button" onClick={()=>setEdit(true)} className="bg-primary mt-3">
                            Editar
                        </Button> }
                    </Col>
                </Col>
            </Row>
        </Container>
    )
}