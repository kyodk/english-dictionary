import { useState, useEffect, useRef } from 'react';

const useAuthentication = () => {
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const authEmailInput = (e) => setAuthEmail(e.target.value);
  const authPasswordInput = (e) => setAuthPassword(e.target.value);

  const authRef = useRef(null);

  useEffect(() => {
    authRef.current.focus();
  }, []);

  return {
    authEmail,
    authPassword,
    authEmailInput,
    authPasswordInput,
    authRef,
  };
};

export default useAuthentication;
