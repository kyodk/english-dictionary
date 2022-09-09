import React, { useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../FirebaseConfig.js';

export const AuthContext = React.createContext();

export const useAuthContext = () => {
  useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const value = {
    user,
  };
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
  <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;