import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import useAuthentication from '../hooks/useAuthentication';
import { auth } from '../FirebaseConfig.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';

const Signup = () => {
  const { user } = useAuthContext();
  const {
    authEmail,
    authPassword,
    authEmailInput,
    authPasswordInput,
    authRef,
  } = useAuthentication();

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    setValidated(true);
    if (form.checkValidity()) {
      try {
        await createUserWithEmailAndPassword(auth, authEmail, authPassword);
      } catch (err) {
        alert('Email address already exists');
      }
    } else {
      e.preventDefault();
      e.stopPropagation();
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
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={authEmailInput}
                    value={authEmail}
                    ref={authRef}
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
                    onChange={authPasswordInput}
                    value={authPassword}
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
