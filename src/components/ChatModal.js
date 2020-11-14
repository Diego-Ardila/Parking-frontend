import React, {useEffect, useState, useRef} from 'react';
import {Modal, Col, Button, Card, Form} from "react-bootstrap";
import styled from "styled-components";
import io from "socket.io-client";
import { useForm } from "react-hook-form";

const MyRow = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
margin-top: 10px;
`;

const MyMessage = styled.div`
width: 45%;
background-color: #c7d40a;
color: #46516e;
padding: 10px;
margin-right: 5px;
text-align: center;
border-top-right-radius: 10%;
border-bottom-right-radius: 10%;
`;

const PartnerRow = styled(MyRow)`
justify-content: flex-start;
`;

const PartnerMessage = styled.div`
width: 45%;
background-color: transparent;
color: lightgray;
border: 1px solid lightgray;
padding: 10px;
margin-left: 5px;
text-align: center;
border-top-left-radius: 10%;
border-bottom-left-radius: 10%;
`;


export default function ChatModal ({onHide, show}) {

  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])
  const socketRef = useRef()
  const [isRegistered, setIsRegistered] = useState(false)
  //const [name, setName] = useState("")
  const [chatId, setChatId] = useState()
  const { register, handleSubmit, errors } = useForm();

  useEffect(()=>{
    if(!show){
      setIsRegistered(false)
      setMessages([])
      console.log(socketRef.current)
      socketRef.current && socketRef.current.emit("user disconnected",chatId)
    }
  },[show])

  const handleChange = (e) => {
    setText(e.target.value)
  }

  /* const handleNameChange = (e) => {
    setName(e.target.value)
  } */

  const handleNameSubmit = (data) => {
    //e.preventDefault()
    console.log(data.name)
    setIsRegistered(true)
    socketRef.current = io.connect(`${process.env.REACT_APP_SERVER_URL}admin`, {
      query:{
        admin: false
      }
    })
    socketRef.current.emit("join room user", data.name)
    socketRef.current.on("chat id", id => {
      setChatId(id)
    })
    socketRef.current.on("messages", msjs => {
      setMessages(msjs)
      console.log(msjs)
    })
  }

  const handleChatSubmit = (e) => {
    e.preventDefault()
    const newObj = {
      chatId,
      text
    }
    setText("")
    socketRef.current.emit("send message", newObj)
  }

    return (
        <Modal  show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header className="bg-secondary" closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Chat
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-secondary">
          {isRegistered ? 
            <Card className="bg-dark" style={{ height: '18rem', overflow:"auto" }}>
              <Card.Body>
              {messages.map((message, index) => {
                if (message.origin === "user") {
                  return (
                    <MyRow key={index}>
                      <MyMessage>
                        {message.text}
                      </MyMessage>
                    </MyRow>
                  )
                }
                return (
                  <PartnerRow key={index}>
                    <PartnerMessage>
                      {message.text}
                    </PartnerMessage>
                  </PartnerRow>
                )
              })}
              </Card.Body>
            </Card>
          :
          <Form onSubmit={handleSubmit(handleNameSubmit)}>
            <Form.Group>
              <Form.Label>Escribe tu nombre completo</Form.Label>
              <Form.Control  name="name" ref={register({ required: true, minLength: 2 })} />
              {errors.name && "se requiere que el nombre tenga al menos 2 caracteres"}
            </Form.Group>
            <Button type="submit" >Iniciar Chat</Button>
          </Form> }
          </Modal.Body> 
          {isRegistered &&
          <Modal.Footer className="justify-content-md-center bg-secondary">
            <Form onSubmit={handleChatSubmit}>
              <Form.Control minlength="3" value={text} onChange={handleChange} type="text" rows={2} />
              <Form.Text style={{color: "white"}} className="m-2">
                Cualquier duda o solicitud que tengas sera atendida por este Chat
              </Form.Text>
              <Button className="bg-primary" type="submit" >Enviar</Button>
            </Form>
          </Modal.Footer>
          }
        </Modal>
      );
}
