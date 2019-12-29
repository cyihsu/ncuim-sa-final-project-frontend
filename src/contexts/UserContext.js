import React from 'react';
import { authenticate } from '../utils/dataUtils';
import { useHistory, useRouteMatch } from 'react-router-dom';

export const UserContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(userReducer, initUserState);
  const history = useHistory();
  const match = useRouteMatch({
    path: '/login',
    strict: true,
    sensitive: true
  })

  React.useEffect(() => {
    if(localStorage.getItem("token") && !state.authenticated) {
      authenticate().then((res) => {
        if(!res.data.data.dismissed) {
          dispatch({
            type: 'LOGIN',
            payload: {
              authenticated: true,
              me: res.data.data
            }
          });
          if(match) {
            history.push('/dashboard');
          }
        }
      }).catch(() => {
        dispatch({
          type: 'LOGOUT'
        });
        localStorage.clear();
        history.push('/login');
      })
    }
  }, [history, match, state.authenticated])
  
  return (
    <UserContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export const UserContext = React.createContext({
  authenticated: false,
  me: []
})

export const initUserState = {
  authenticated: false,
  me: []
}

export function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: action.payload.authenticated,
        me: action.payload.me
      };
    case "LOGOUT":
      return {
        authenticated: false,
        me: []
      };
    default:
      return state;
  }
}