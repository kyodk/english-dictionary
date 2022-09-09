import React, { useState, useContext } from 'react';

export const InputContext = React.createContext();

export const useInputContext = () => {
  useContext(InputContext)
}

const InputProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState('');
  const value = {
    inputValue,
    setInputValue,
  };

  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
};

export default InputProvider;
