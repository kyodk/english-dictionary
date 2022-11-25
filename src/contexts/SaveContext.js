import React, { useState, useEffect, useContext } from 'react';

const SaveContext = React.createContext();
export const useSaveContext = () => useContext(SaveContext);

export const SaveContextProvider = ({ children }) => {
  const [saved, setSaved] = useState(false);

  const value = {
    saved,
    setSaved,
  };

  useEffect(() => {
    setSaved(false);
  }, []);

  return <SaveContext.Provider value={value}>{children}</SaveContext.Provider>;
};