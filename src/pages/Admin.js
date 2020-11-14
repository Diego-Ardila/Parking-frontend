import React, { useState, useEffect }  from 'react';
import {useHistory} from 'react-router-dom'
import { Container } from 'react-bootstrap';
import AdminMenu from '../components/AdminMenu';
import MensualidadesAdmin from '../components/MensualidadesAdmin';
import LavaderoAdmin from '../components/LavaderoAdmin';
import ChatAdmin from '../components/ChatAdmin';
import { validateAdmin } from '../utils/httpRequests'
import swal from 'sweetalert'



export default function Admin ({showChat}) {
    const [subMenu, setSubMenu] = useState()
    const history = useHistory()

    useEffect(()=>{
        const getData= async()=>{
          try{
            const token = localStorage.getItem("token")
            await validateAdmin(token)
          }catch(err){
            swal("No estas autorizado",`Debes registrarte como Administrador para acceder aqui`,"error")
            history.push("/adminLogin")
          }
        }
        getData()
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