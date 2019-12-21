import React from 'react';
import { authenticate } from '../utils/dataUtils';
import { useHistory } from 'react-router-dom';

export const UserContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(userReducer, initUserState);
  const history = useHistory();
  if(localStorage.getItem('token') && !state.authenticated) {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        authenticate().then((res) => {
          if(!res.data.data.dismissed) {
            dispatch({
              type: 'LOGIN',
              payload: {
                authenticated: true,
                me: res.data.data
              }
            });
          }
          else {
            throw new Error('User has been removed.');
          }
        }).catch((error) => {
          dispatch({
            type: 'LOGOUT'
          });
          localStorage.clear();
          history.push('/login');
        });
      }, 1000)
    });
  }

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