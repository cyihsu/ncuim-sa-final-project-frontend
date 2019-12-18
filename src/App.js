import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

import Login from './containers/Login';
import Dashboard from './containers/Dashboard';

function App() {
  const [loader, setLoader] = useState(0);

  const onLoaderFinished = () => setLoader(0);
  return (
    <React.Fragment>
      <LoadingBar
        progress={loader}
        height={3}
        color='red'
        onLoaderFinished={() => onLoaderFinished()}
      />
      <Router>
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
    </React.Fragment>
  );
}

export default App;
