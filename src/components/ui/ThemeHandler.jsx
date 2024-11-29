import React, { createContext, useReducer } from 'react';

let SET_THEME;

const initialState = {
  darkMode: 'false',
};

export const darkModeContext = createContext(initialState);

export const darkModeReducer = (state, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        darkMode: action.payload,
      };
    default:
      return state;
  }
};

export const DarkModeState = ({ children }) => {
  const [state, dispatch] = useReducer(darkModeReducer, initialState);

  const setDarkMode = async (bool) => {
    dispatch({
      type: SET_THEME,
      payload: bool,
    });
  };

  return (
    <darkModeContext.Provider
      value={{
        darkMode: state.darkMode,
        setDarkMode,
      }}
    >
      {children}
    </darkModeContext.Provider>
  );
};
