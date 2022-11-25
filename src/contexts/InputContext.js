import React, { useState, useContext } from 'react';

const InputContext = React.createContext();
export const useInputContext = () => useContext(InputContext);

export const InputContextProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState('');

  const value = {
    inputValue,
    setInputValue,
  };

  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
};
