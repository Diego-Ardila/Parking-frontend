import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom";
import Header from './pages/Header';
import Home from './pages/Home';
import {Helmet} from 'react-helmet';
import Button from 'react-bootstrap/Button';
import {ChatText} from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar';
import ChatModal from './components/ChatModal';
import Admin from './pages/Admin';



function App() {

  const [show,setShow] = useState(false)
  const [showChat,setShowChat] = useState(true)


  const handleChat = () =>{
    setShow(true)
  }

  return (
    <div>
      <Helmet>
        <style>{'body { background-color: #AFAFAF; }'}</style>
      </Helmet>
      <Router>
        <ChatModal
          show={show} 
          onHide={()=>setShow(false)}
        />
        <Header/>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/admin" component={()=> <Admin showChat={setShowChat} />} />
          <Redirect from="*" to="/home" />
      </Switch>
    </Router>
    <Navbar style={showChat ? null : {display:"none"}} className="justify-content-end" fixed="bottom"><Button variant="primary" size="md" onClick={handleChat}>Chatea con nosotros  <ChatText/></Button></Navbar>
    </div>
  );
}

export default App;
