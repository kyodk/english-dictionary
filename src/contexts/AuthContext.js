import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../FirebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const value = {
    user,
    loading,
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
