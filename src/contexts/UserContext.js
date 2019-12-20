import React from 'react';

export const UserStore = React.createContext({})

export function userReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return Object.assign({}, state, {
        self: action.payload
      });
    default:
      return state;
  }
}