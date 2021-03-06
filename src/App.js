import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import { UserContextProvider } from './contexts/UserContext';

toast.configure({
  autoClose: 3000,
  draggable: false,
});

function App() {
  const [loader, setLoader] = useState(0);
  const production = true;
  const onLoaderFinished = () => setLoader(0);
  return (
    <Router basename={production ? '/NCU_MIS_SA_Group23' : ''}>
      <UserContextProvider>
        <LoadingBar
          progress={loader}
          height={3}
          color="red"
          onLoaderFinished={() => onLoaderFinished()}
        />
        <Route exact path="/">
          <Redirect to={localStorage.getItem('token') ? '/dashboard' : '/login'} />
        </Route>
        <Route exact path="/login">
          <Login setLoader={setLoader} />
        </Route>
        <Route path="/dashboard">
          <Dashboard setLoader={setLoader} />
        </Route>
      </UserContextProvider>
    </Router>
  );
}

export default App;
