import React from 'react';
import swal from 'sweetalert';
import {  useHistory } from 'react-router-dom';


export default function Logout() {
  const history = useHistory(); 
  const logoutConfirmation = () => {
    swal({
      title: "Estas seguro ?", 
      text: "Estas a punto de cerrar sesion",
      buttons: {
        confirm: {
          text: "Aceptar",
          value: "confirm"
        },
        cancel: "Cancelar"        
      },
      dangerMode: true ,      
    }).then((value) => {
      switch(value){
        case "confirm":
          localStorage.removeItem('token');
          history.push('/home')
          swal("Tus sesion ha sido cerrada","Esperamos vuelvas pronto", "success")
          break;
        default:
          history.goBack();          
      }
    })
  }

  return (
    <div>
      { logoutConfirmation() }
    </div>
  );
};


