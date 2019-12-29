import React from 'react';

export const UIContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(UIReducer, initUserState);
  return (
    <UIContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
}

export const UIContext = React.createContext({
  toggleNotification: false,
  currentMessage: "",
  currentMessageType: 0,
})

export const initUserState = {
  toggleNotification: false,
  currentMessage: "",
  currentMessageType: 0,
}

export function UIReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_MESSAGE":
      return {
        ...state,
        toggleModal: true,
        currentModal: action.payload.modalType
      };
    default:
      return state;
  }
}