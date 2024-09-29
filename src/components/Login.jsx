import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaSignInAlt, FaUserPlus, FaCoffee } from 'react-icons/fa';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      setIsLoggedIn(true);
      setUserData(storedUserData);
      onLogin(true, storedUserData);
    }
  }, [onLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    try {
      const response = await axios.post('http://student.crru.ac.th/651463012/Reviewcafe/apicafes/login.php', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.status === 'success') {
        localStorage.setItem('userRole', response.data.user.role); // Ensure userRole is set
        setAlertVariant('success');
        setAlertMessage('Login successful');
        setShowAlert(true);
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        setUserData(response.data.user);
        onLogin(true, response.data.user);
        
        // Redirect based on user role
        navigate('/profile');
      } else {
        setAlertVariant('danger');
        setAlertMessage('Login failed: ' + (response.data.message || 'Invalid username or password'));
        setShowAlert(true);
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
      }
    } catch (error) {
      console.error('Login error:', error);
      setAlertVariant('danger');
      setAlertMessage('Login failed. Please check your username and password.');
      setShowAlert(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setUserData(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    onLogin(false, null);
    navigate('/login');
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card className="w-100" style={{ maxWidth: '400px', backgroundColor: '#f8f9fa', border: 'none' }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4" style={{ color: '#6c757d' }}>
            <FaCoffee className="me-2" />
            {isLoggedIn ? 'Welcome' : 'Login'}
          </h2>
          {showAlert && (
            <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
              {alertMessage}
            </Alert>
          )}
          {!isLoggedIn ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label><FaUser className="me-2" />Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label><FaLock className="me-2" />Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" className="mb-2">
                  <FaSignInAlt className="me-2" />Login
                </Button>
                <Link to="/register" className="btn btn-outline-secondary">
                  <FaUserPlus className="me-2" />Register
                </Link>
              </div>
            </Form>
          ) : (
            <Button variant="danger" onClick={handleLogout} className="w-100">Logout</Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;