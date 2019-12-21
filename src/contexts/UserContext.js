import React from 'react';
export const UserStore = React.createContext({
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
    default:
      return state;
  }
}