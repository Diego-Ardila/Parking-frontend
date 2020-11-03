import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import Header from './pages/Header';
import Home from './pages/Home';
import Button from 'react-bootstrap/Button';
import {ChatText} from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar';
import ChatModal from './components/ChatModal';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Login from './pages/Login';
import Registro from './pages/Registro';
import User from './pages/User';
import Mensualidades from './components/Mensualidades';
import Lavadero from './components/Lavadero';
import Perfil from './components/Perfil';
import Response from './pages/Response';

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
    <div className='App'>
      <Router>
        <ChatModal
          show={show} 
          onHide={()=>setShow(false)}
        />
        <Header/>
        <Switch>
          <PrivateRoute exact path="/Lavadero" component={Lavadero}/>
          <PrivateRoute exact path="/response" component={Response}/>
          <PrivateRoute exact path="/Perfil" component={Perfil}/> 
          <PrivateRoute exact path="/Mensualidades" component={Mensualidades}/>
          <PrivateRoute exact path="/user" component={User} />
          <Route exact path="/registro" component={Registro} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/adminLogin" component={AdminLogin} />
          <Route exact path="/home" component={Home} />
          <PrivateRoute exact path="/admin" component={()=> <Admin showChat={setShowChat} />} />
          <Redirect from="*" to="/home" />
      </Switch>
    </Router>
    <Navbar style={showChat ? null : {display:"none"}} className="justify-content-end" fixed="bottom"><Button className="bg-chat" size="md" onClick={handleChat}>Chatea con nosotros  <ChatText/></Button></Navbar>
    </div>
  );
}

export default App;
