import React, { useState, useEffect }  from 'react';
import { useHistory } from 'react-router-dom'
import {Button, Container, Card, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import { getUser } from '../utils/httpRequests'



export default function User () {

    let [user,setUser] = useState("")
    const history = useHistory()

    useEffect(()=>{
        const getData= async()=>{
          try{
            const token = localStorage.getItem("token")
            const newUser = await getUser(token)
            
            setUser(newUser)
              }catch(err){
            swal("No estas autorizado",`Debes registrarte para acceder aqui`,"error")
            history.push("/login")
          }
        }
        getData()
    },[])



    return(
    <Container className="text-center p-3">
        <h3 style={{color:"whitesmoke"}}>Bienvenido(a) {user && user.name}</h3>
        <Card className="card mt-5 p-3">
            <Row className="justify-content-center">
                <Button className=" bg-primary col-lg-5 m-3 " onClick={()=>{ history.push({pathname:'/perfil', state: user}) }} >Perfil Personal</Button>
            </Row>
            <Row className="justify-content-center">
                <Button className="bg-primary col-lg-5 m-3" onClick={() => history.push({pathname:'/mensualidades', user})}>Gestionar mis Mensualidades</Button>
            </Row>
            <Row className="justify-content-center">
                <Button className="bg-primary col-lg-5 m-3" onClick={() => history.push({pathname:'/lavadero', user})}>Lavadero</Button>
            </Row>
        </Card>
    </Container>
    )
}