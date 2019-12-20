import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import { UserStore, userReducer } from './contexts/UserContext';

function App() {
  const [loader, setLoader] = useState(0);
  const [user, userDispatch] = React.useReducer(userReducer);
  const production = true;
  
  const onLoaderFinished = () => setLoader(0);
  return (
    <UserStore.Provider
      value={{
        self: [],
        dispatch: userDispatch
      }}
    >
      <LoadingBar
        progress={loader}
        height={3}
        color='red'
        onLoaderFinished={() => onLoaderFinished()}
      />
      <Router basename={production ? "/NCUIM-SA-TOMCAT-DEV" : ""}>
        <Route exact path="/">
          <Redirect to={localStorage.getItem('token') ? "/dashboard" : "/login" } />
        </Route>
        <Route exact path="/login">
          <Login setLoader={setLoader} />
        </Route>
        <Route path="/dashboard">
          <Dashboard setLoader={setLoader} />
        </Route>
      </Router>
    </UserStore.Provider>
  );
}

export default App;
