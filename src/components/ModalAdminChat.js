import React, {useState, useRef, useEffect} from 'react';
import {Modal, Col, Button, Card, Form} from "react-bootstrap";
import styled from "styled-components";
import io from "socket.io-client";

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


export default function ChatModal ({ chatId, onHide, show }) {
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])
  const socketRef = useRef()


  useEffect(()=>{
    if(show){
      socketRef.current = io.connect(`${process.env.REACT_APP_SERVER_URL}admin`, {
        query:{
          admin: true
        }
      })
      console.log(chatId)
      socketRef.current.emit("join room admin", chatId)
      socketRef.current.on("messages", msjs => {
        console.log(msjs)
        setMessages(msjs)
      })
    }else{
      socketRef.current && socketRef.current.close()
    }
  },[show])

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
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
            <Card className="bg-dark" style={{ height: '18rem', overflow:"auto" }}>
              <Card.Body>
              {messages.map((message, index) => {
                if (message.origin === "admin") {
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
          </Modal.Body>
          <Modal.Footer className="justify-content-md-center bg-secondary">
            <Form  onSubmit={handleSubmit}>
              <Form.Control value={text} onChange={handleChange} type="text" rows={2} />
              <Form.Text className="text-muted m-2">
                Cualquier duda o solicitud que tengas sera atendida por este Chat
              </Form.Text>
              <Button className="bg-primary" type="submit" >Enviar</Button>
            </Form>
          </Modal.Footer>
        </Modal>)
} 