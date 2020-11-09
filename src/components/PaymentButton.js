import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BagCheck } from "react-bootstrap-icons";
import swal from "sweetalert";
import { createMensualidad, updateMensualidad } from '../utils/httpRequests';

export default function PayButton ({data, userName, update}) {
    const [mensualidad, setMensualidad] = useState()

    useEffect(()=>{
        const handleMensualidad = async () => {
            let newMensualidad
            try{
                if(!update){
                    newMensualidad = await createMensualidad(data)
                }else if(update === "direct pay"){
                    newMensualidad = data
                }else{
                    newMensualidad = await updateMensualidad(data)
                }
              }catch(err){
                swal("Error",`${err.response.data}`,"error")
              }
              setMensualidad( newMensualidad )
        }
        handleMensualidad()
    },[])

    const handlePayment= () => {
        const paymentHandler = window.ePayco.checkout.configure({
        key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY,
        test: true
        })
        paymentHandler.open({
            class: "epayco-button",
            external: 'false',
            amount: data.price,
            name: 'Parking Alarcon',
            description: "mensualidad",
            currency: 'cop',
            country: 'CO',
            lang: 'es',
            extra1: userName,
            extra2: `Desde : ${mensualidad.inDate}`,
            extra3: `Hasta : ${mensualidad.finDate}`,
            extra4: mensualidad._id,
            response: `${process.env.REACT_APP_FRONT_URL}/response`,
            autoclick: 'false',
            type_doc_billing: 'cc',
        })
    }
    return (
        <Button onClick={handlePayment}>Pagar<BagCheck></BagCheck></Button>
    )

}