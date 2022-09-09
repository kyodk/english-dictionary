import { Link, Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../FirebaseConfig.js';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';
import useAuthentication from '../hooks/useAuthentication';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const {
    authEmail,
    authPassword,
    authEmailInput,
    authPasswordInput,
    authRef,
    user,
  } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        authEmail,
        authPassword
      );
      const user = userCredential.user;
      setDoc(doc(db, 'users', user.uid), {
        email: authEmail,
        password: authPassword,
      });
    } catch (err) {
      alert('Please enter a valid email address and password');
    }
  };

  return (
    <>
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <Container className="pt-5">
          <Row className="justify-content-center">
            <Col lg="8">
              <Link to="/" className="fs-4 text-black">
                <BsArrowLeft />
              </Link>
              <h2 className="text-center my-4">Sign Up</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={authEmailInput}
                    value={authEmail}
                    ref={authRef}
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    onChange={authPasswordInput}
                    value={authPassword}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button variant="dark" type="submit">
                    Sign up
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Signup;
