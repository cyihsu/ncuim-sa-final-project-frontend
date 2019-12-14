import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { StatusContext } from "./store/Context";

import Login from './containers/Login';
import Dashboard from './containers/Dashboard';

function App() {
  return (
    <StatusContext.Provider value={{ sidebar: false }}>
      <Router basename='/NCUIM-SA-TOMCAT-DEV'>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Router>
    </StatusContext.Provider>
  );
}

export default App;
