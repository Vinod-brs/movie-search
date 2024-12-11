import React, { createContext } from 'react';
import { HttpGet } from './httpHelper';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const contextValue = { HttpGet }
    return (
      <AppContext.Provider value={contextValue}>
        {children}
      </AppContext.Provider>
    )
}