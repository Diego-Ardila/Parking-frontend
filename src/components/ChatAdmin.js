import React, { useEffect, useRef, useState } from 'react';
import { Container, Card, Row, Button } from 'react-bootstrap';
import {ChatText} from 'react-bootstrap-icons';
import ModalAdminChat from './ModalAdminChat';
import {getChats} from '../utils/httpRequests';

export default function ChatAdmin() {
    const [show, setShow] = useState(false)
    const [chats, setChats] = useState([])
    const chatId = useRef()

    useEffect(()=>{
        const getSpaces= async ()=>{
            const dbChats = await getChats()
            setChats(dbChats)
        }
        getSpaces()
    },[])

    const handleChat = (e) => {
        setShow(true)
        chatId.current = e.target.name
    } 
    return (
        <Container>
            <ModalAdminChat
                chatId={chatId.current}
                show={show}
                onHide={()=>{setShow(false)}} 
            />
            <Card className="card mt-5 p-3">
                {chats.length > 0 ? 
                chats.map(chat =>{
                    return(<Row key={chat._id} className="justify-content-center">
                            <Button name={chat._id} onClick={handleChat} className=" bg-primary col-lg-5 m-3 ">{chat.name} <ChatText/></Button>
                           </Row>)
                })
                :
                <h3>No hay chats abiertos</h3>
                }
            </Card>
        </Container>
    )
}