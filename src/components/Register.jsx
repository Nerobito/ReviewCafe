import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaUser, FaLock, FaUserPlus, FaSignInAlt } from 'react-icons/fa';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const data = new FormData();
    data.append('username', formData.username);
    data.append('password', formData.password);
    try {
      const response = await axios.post('http://student.crru.ac.th/651463012/Reviewcafe/apicafes/register.php', data);
      
      console.log(response.data);
      
      if(response.data.status === 'success'){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message
        });
      } 

      setFormData({ username: '', password: '', confirmPassword: '' });
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="mt-4">
          <Card.Title className="text-center p-2"><h2><FaUserPlus className="me-2" />Register</h2></Card.Title>
            <Card.Body >
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label><FaUser className="me-2" />Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label><FaLock className="me-2" />Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword" className="mb-3">
                  <Form.Label><FaLock className="me-2" />Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    <FaUserPlus className="me-2" />Register
                  </Button>
                  <Link to="/login" className="d-grid">
                    <Button variant="secondary">
                      <FaSignInAlt className="me-2" />Back to Login
                    </Button>
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
