import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { auth } from '../FirebaseConfig.js';
import { signOut } from 'firebase/auth';
import { Container, Navbar, Button } from 'react-bootstrap';

const Header = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <header>
      <Navbar bg="dark py-3">
        <Container>
          {user ? (
            <Link to="/bookmarklist" className="ms-auto">
              <Button variant="outline-light">Bookmarks</Button>
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
              <Button variant="outline-light">Log in</Button>
            </Link>
          )}
          {!user ? (
            <Link to="/signup" className="ms-3">
              <Button variant="outline-light">Sign Up</Button>
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
