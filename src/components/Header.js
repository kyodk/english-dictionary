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
            <div className="ms-auto">
              <Link to="/bookmarklist">
                <Button variant="outline-light">Bookmarks</Button>
              </Link>
              <Button variant="outline-light ms-3" onClick={logout}>
                Log out
              </Button>
            </div>
          ) : (
            <div className="ms-auto">
              <Link to="/signup">
                <Button variant="outline-light">Sign Up</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline-light ms-3">Log in</Button>
              </Link>
            </div>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
