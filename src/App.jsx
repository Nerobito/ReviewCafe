import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from './components/Home';
import Cafe from './components/Cafe';
import Post from './components/Post';
import NotFound from './components/NotFound';
import CustomNavbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile'; // Import the Profile component


const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    
    if (storedIsLoggedIn && storedUserData) {
      setIsLoggedIn(true);
      setUserData(storedUserData);
    }
  }, []);

  const handleLogin = (status, user) => {
    console.log('handleLogin called with status:', status);
    setIsLoggedIn(status);
    setUserData(user);
    localStorage.setItem('isLoggedIn', status);
    localStorage.setItem('userData', JSON.stringify(user));
    if (status) {
      navigate('/cafe');
    }
  };

  return (
    <>
      <CustomNavbar isLoggedIn={isLoggedIn} /> {/* Pass isLoggedIn to CustomNavbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cafe" element={<Cafe isLoggedIn={isLoggedIn} />} />
        <Route path="/post" element={<Post />} />
        <Route 
          path="/admin" 
          element={<Admin />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile userData={userData} />} /> {/* Pass userData to Profile */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
