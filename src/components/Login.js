import { useState, useEffect, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { auth } from '../FirebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';

const Login = () => {
  const { user } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    setValidated(true);
    if (form.checkValidity()) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        alert(
          'Email address / password do not match any existing accounts. Please try again.'
        );
      }
    } else {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
              <h2 className="text-center my-4">Log in</h2>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    ref={inputRef}
                    required
                    pattern="[\w\-._]+@[\w\-._]+\.[A-Za-z]+"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-5" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  />
                  <Form.Control.Feedback type="invalid">
                    Use at least 8 characters. Include an uppercase letter, a
                    lowercase letter, a number.
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="text-center">
                  <Button variant="dark" type="submit">
                    Log in
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

export default Login;
