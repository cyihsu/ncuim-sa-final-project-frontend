import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { authenticate } from '../utils/dataUtils';

export const UserContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(userReducer, initUserState);
  const history = useHistory();
  const match = useRouteMatch({
    path: '/login',
    strict: true,
    sensitive: true,
  });

  React.useEffect(() => {
    if (localStorage.getItem('token') && !state.authenticated) {
      authenticate().then((res) => {
        if (!res.data.data.dismissed) {
          dispatch({
            type: 'LOGIN',
            payload: {
              authenticated: true,
              me: res.data.data.user,
              count: parseInt(res.data.data.count)
            },
          });
          if (match) {
            history.push('/dashboard');
          }
        }
      }).catch(() => {
        dispatch({
          type: 'LOGOUT',
        });
        localStorage.clear();
        history.push('/login');
      });
    }
    else if(!localStorage.getItem('token') && !match) {
      history.push('/login');
    }
  }, [history, match, state.authenticated]);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const UserContext = React.createContext({
  authenticated: false,
  me: [],
  count: 0,
});

export const initUserState = {
  authenticated: false,
  me: [],
  count: 0,
};

export function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        authenticated: action.payload.authenticated,
        me: action.payload.me,
        count: action.payload.count,
      };
    case 'LOGOUT':
      return {
        authenticated: false,
        me: [],
      };
    default:
      return state;
  }
}
