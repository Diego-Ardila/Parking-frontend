import React, {useState, useRef, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import Header from './pages/Header';
import Home from './pages/Home';
import {Helmet} from 'react-helmet';
import Button from 'react-bootstrap/Button';
import {ChatText} from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar';
import ChatModal from './components/ChatModal';
import io from "socket.io-client";

function App() {
  const [yourId,setYourId] = useState("")
  const [show,setShow] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const socketRef = useRef()

  const handleChat = () =>{
    setShow(true)
    socketRef.current = io.connect("http://localhost:8000")
    socketRef.current.on("your id", socketId => {
      setYourId(socketId)
    })

    socketRef.current.on("message", message => {
      setMessages(prevMsjs => [...prevMsjs, message])
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const newObj = {
      body: message,
      id: yourId
    }
    setMessage("")
    socketRef.current.emit("send message", newObj)
  }
  return (
    <div>
      <Helmet>
        <style>{'body { background-color: #AFAFAF; }'}</style>
      </Helmet>
      <Router>
        <ChatModal
          message={message} 
          yourId={yourId}
          messages={messages} 
          setMessage={setMessage} 
          show={show} 
          onHide={()=>setShow(false)}
          handleSubmit={handleSubmit}
        />
        <Header/>
        <Switch>
          <Route exact path="/home" component={Home} />
      </Switch>
    </Router>
    <Navbar className="justify-content-end" fixed="bottom"><Button variant="primary" size="md" onClick={handleChat}>Chatea con nosotros  <ChatText/></Button></Navbar>
    </div>
  );
}

export default App;
