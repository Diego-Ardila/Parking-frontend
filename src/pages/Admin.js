import React, { useState, useEffect }  from 'react';
import {useLocation} from 'react-router-dom'
import {Button, Container, Card, Row } from 'react-bootstrap';
import AdminMenu from '../components/AdminMenu';
import MensualidadesAdmin from '../components/MensualidadesAdmin';
import LavaderoAdmin from '../components/LavaderoAdmin';
import ChatAdmin from '../components/ChatAdmin';



export default function Admin ({showChat}) {
    const [subMenu, setSubMenu] = useState()

    useEffect(()=>{
        showChat(false)
    },[])

    const menuOption = (option) =>{
        switch(option){
            case 'chat' :{
                return <ChatAdmin></ChatAdmin>
            }
            case 'lavadero' :{
                return <LavaderoAdmin></LavaderoAdmin>
            }
            case 'Mensualidades' :{
                return <MensualidadesAdmin></MensualidadesAdmin>
            }
            default:
                 return <AdminMenu setSubMenu={setSubMenu} ></AdminMenu>
        }
    }

    return(
        <Container>
            {menuOption(subMenu)}
        </Container>
    )
}