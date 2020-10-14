import React, { useEffect, useRef, useState } from 'react';
import { Container, Card, Row, Button } from 'react-bootstrap';
import io from "socket.io-client";
import {ChatText} from 'react-bootstrap-icons';
import ModalAdminChat from './ModalAdminChat'

export default function ChatAdmin() {
    const [messages, setMessages] = useState([])
    const [show, setShow] = useState(false)
    const [yourId,setYourId] = useState()
    const [rooms, setRooms] = useState([])
    const socketRef = useRef()

    useEffect(()=>{
        socketRef.current = io.connect("http://localhost:8000/admin",{
            query:{
                admin: true
            }
        })
        socketRef.current.on("rooms", rooms => {
            setRooms(rooms)
        })
        socketRef.current.on("your id", socketId => {
            setYourId(socketId)
          })
        socketRef.current.on("message", message => {
              setMessages(prevMsjs => [...prevMsjs, message])
            })
    },[])

    const handleChat = (e) => {
        setShow(true)
        socketRef.current.emit("joinRoom", e.target.name)
    } 
    return (
        <Container>
            <ModalAdminChat
                messages={messages}
                yourId={yourId}
                adminSocket={socketRef.current}
                show={show}
                onHide={()=> setShow(false)} 
            />
            <Card className="bg-secondary p-3">
                {rooms.length > 0 ? 
                rooms.map(room =>{
                    return(<Row key={room} className="justify-content-center">
                            <Button name={room} onClick={handleChat} className=" bg-primary col-lg-5 m-3 ">{room} <ChatText/></Button>
                           </Row>)
                })
                :
                <h3>No hay chats abiertos</h3>
                }
            </Card>
        </Container>
    )
}