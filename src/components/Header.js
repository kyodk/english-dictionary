import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInputContext } from '../contexts/InputContext';
import { auth } from '../FirebaseConfig.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Container, Navbar, Button } from 'react-bootstrap';

const Header = () => {
  const { setInputValue } = useInputContext();
  const [user, setUser] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const btnClick = () => {
    setInputValue('');
  };

  return (
    <header>
      <Navbar bg="dark py-3">
        <Container>
          {user ? (
            <Link to="/bookmarks" className="ms-auto">
              <Button variant="outline-light" onClick={btnClick}>
                Bookmarks
              </Button>
            </Link>
          ) : (
            ''
          )}
          {user ? (
            <Button variant="outline-light ms-3" onClick={logout}>
              Log out
            </Button>
          ) : (
            <Link to="/login" className="ms-auto">
              <Button variant="outline-light" onClick={btnClick}>
                Log in
              </Button>
            </Link>
          )}
          {!user ? (
            <Link to="/signup" className="ms-3">
              <Button variant="outline-light" onClick={btnClick}>
                Sign Up
              </Button>
            </Link>
          ) : (
            ''
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
