import { useState, useEffect, useRef } from 'react';
import { auth } from '../FirebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';

const useAuthentication = () => {
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const authEmailInput = (e) => setAuthEmail(e.target.value);
  const authPasswordInput = (e) => setAuthPassword(e.target.value);

  const authRef = useRef(null);

  useEffect(() => {
    authRef.current.focus();
  }, []);

  const [user, setUser] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return {
    authEmail,
    authPassword,
    authEmailInput,
    authPasswordInput,
    authRef,
    user,
  };
};

export default useAuthentication;
