import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import Header from './pages/Header';
import Home from './pages/Home';
import {Helmet} from 'react-helmet';
import Button from 'react-bootstrap/Button';
import {ChatText} from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar';
import ChatModal from './components/ChatModal';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Registro from './pages/Registro';
import User from './pages/User';

function PrivateRoute(props){
  const history = useHistory()
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      history.push("/login")
    }
  },[])
  return(
    <Route {...props}></Route>
  )
}


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
          <PrivateRoute exact path="/user" component={User} />
          <Route exact path="/registro" component={Registro} />
          <Route exact path="/login" component={Login} />
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
