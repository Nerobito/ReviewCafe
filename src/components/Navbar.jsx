import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon, FaUser } from 'react-icons/fa';
import axios from 'axios';

const CustomNavbar = ({ isLoggedIn: initialIsLoggedIn, initialUserRole }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [userRole, setUserRole] = useState(initialUserRole);
  const [logoutTrigger, setLogoutTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole');
    setIsLoggedIn(loggedIn);
    setUserRole(role);
  }, [logoutTrigger]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole');
    setIsLoggedIn(loggedIn);
    setUserRole(role);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    setLogoutTrigger(!logoutTrigger);
    navigate('/login');
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('http://student.crru.ac.th/651463012/Reviewcafe/apicafes/login.php', {
        username,
        password
      });

      if (response.data.status === 'success') {
        localStorage.setItem('userRole', response.data.user.role); // Ensure userRole is set
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', response.data.user.role);
        setIsLoggedIn(true);
        setUserRole(response.data.user.role);
        setLogoutTrigger(!logoutTrigger);

        console.log('User Role:', response.data.user.role); // Log the user role

        if (response.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        // Handle login error
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const translations = {
    en: {
      home: 'Home',
      cafe: 'Cafe',
      contact: 'Post',
      loginRegister: 'Login / Register',
      profile: 'Profile',
      admin: 'Admin',
      logout: 'Logout',
    },
    th: {
      home: 'หน้าแรก',
      cafe: 'คาเฟ่',
      contact: 'โพสต์',
      loginRegister: 'เข้าสู่ระบบ / สมัครสมาชิก',
      profile: 'โปรไฟล์',
      admin: 'แอดมิน',
      logout: 'ออกจากระบบ',
    },
  };

  const t = translations[language];

  const handlePostClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    }
  };

  return (
    <>
      <Navbar
        bg={darkMode ? 'dark' : 'success'}
        variant={darkMode ? 'dark' : 'light'}
        expand="lg"
        sticky="top"
        style={{
          transition: 'all 0.3s ease',
          fontFamily: `'Oswald', sans-serif`,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{
              color: darkMode ? '#a94a36' : '#ffffff',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              letterSpacing: '0.1rem',
            }}
          >
            ReviewCafe
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/"
                style={{ color: darkMode ? '#a94a36' : '#ffffff' }}
              >
                {t.home}
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/cafe"
                style={{ color: darkMode ? '#a94a36' : '#ffffff' }}
              >
                {t.cafe}
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/post"
                style={{ color: darkMode ? '#a94a36' : '#ffffff' }}
                onClick={handlePostClick}
              >
                {t.contact}
              </Nav.Link>
            </Nav>
            <div
              onClick={toggleDarkMode}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem',
                borderRadius: '50%',
                backgroundColor: darkMode ? '#fdfefe' : '#fdfefe',
                transition: 'all 0.3s ease',
              }}
            >
              {darkMode ? (
                <FaSun size={24} color="#f5b041" />
              ) : (
                <FaMoon size={24} color="#f4d03f" />
              )}
            </div>
            <NavDropdown
              title={<FaUser size={24} />}
              id="basic-nav-dropdown"
              alignRight // Corrected prop name
              className="ms-4"
              style={{ color: darkMode ? '#a94a36' : '#ffffff' }}
            >
              {isLoggedIn ? (
                <>
                  {userRole === 'admin' && (
                    <>
                      <NavDropdown.Item as={Link} to="/admin" style={{ borderRadius: '4px' }}>
                        {t.admin}
                      </NavDropdown.Item>

                    </>
                  )}
                  <NavDropdown.Item as={Link} to="/profile" style={{ borderRadius: '4px' }}>
                    {t.profile}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout} style={{ borderRadius: '4px' }}>
                    {t.logout}
                  </NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item as={Link} to="/login">
                  {t.loginRegister}
                </NavDropdown.Item>
              )}
            </NavDropdown>
            <Button variant="outline-light" onClick={toggleLanguage} className="ms-3">
              {language === 'en' ? 'TH' : 'EN'}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default CustomNavbar;

