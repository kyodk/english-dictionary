import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig.js';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';
import useAuthentication from '../hooks/useAuthentication';

const Signup = () => {
  const {
    authEmail,
    authPassword,
    authEmailInput,
    authPasswordInput,
    authRef,
    user,
  } = useAuthentication();

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, authEmail, authPassword);
    } catch (err) {
      alert('Please enter a valid email address and password');
    }
  };

  const handleBlur = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
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
                  />
                  <Form.Control.Feedback type="invalid">
                    Must contain the @ symbol.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-5" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    onChange={authPasswordInput}
                    onBlur={handleBlur}
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
