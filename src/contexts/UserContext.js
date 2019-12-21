import React from 'react';
import { authenticate } from '../utils/dataUtils';
import { useHistory } from 'react-router-dom';

export const UserContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(userReducer, initUserState);
  const history = useHistory();
  if(localStorage.getItem('token') && !state.authenticated) {
    authenticate().then((res) => {
      if(res === false) {
        dispatch({
          type: 'LOGIN',
          payload: {
            authenticated: true,
            me: res.data
          }
        });
      }
      else {
        throw new Error("Token not authorized.");
      }
      
    }).catch((error) => {
      dispatch({
        type: 'LOGOUT'
      });
      localStorage.clear();
      history.push('/login');
    });
  }

  return (
    <UserContext.Provider
      value={ {
        ...state,
        dispatch: userReducer
      } }
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
        me: action.payload.data
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