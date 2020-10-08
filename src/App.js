import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import Header from './pages/Header';
import Home from './pages/Home';
import {Helmet} from 'react-helmet';

function App() {
  return (
    <div>
      <Helmet>
        <style>{'body { background-color: #AFAFAF; }'}</style>
      </Helmet>
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/home" component={Home} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
