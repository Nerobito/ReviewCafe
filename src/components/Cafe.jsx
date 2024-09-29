import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Modal, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMapMarkerAlt, FaHeart, FaShare, FaThumbsUp, FaCoffee } from 'react-icons/fa';
import './Cafe.css'; 
import Login from './Login';

export default function Cafe() {  
  const [cafes, setCafes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cafesPerPage] = useState(10);
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [likedCafes, setLikedCafes] = useState([]);

  const checkLoginStatus = () => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.likedCafes) {
            setLikedCafes(userData.likedCafes);
        }
    }
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const fetchCafes = async () => {
    try {
      const response = await axios.get('https://student.crru.ac.th/651463012/Reviewcafe/apicafes/db_cafe.php');
      const updatedCafes = response.data.map(cafe => ({
        ...cafe,
        imgPath: `${cafe.img}` 
      }));  
      setCafes(updatedCafes); 
      const uniqueCounties = [...new Set(updatedCafes.map(cafe => cafe.countyName))];
      setCounties(['All', ...uniqueCounties]);
    } catch (error) {
      console.error('Error fetching cafes:', error);
    }
  };

  useEffect(() => {
    fetchCafes();
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    setShowLoginModal(false);
    if (status) {
      // Refresh the page when login is successful
      window.location.reload();
    } else if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const requireLogin = (action) => {
    if (!isLoggedIn) {
      setPendingAction(() => action);
      setShowLoginModal(true);
    } else {
      action();
    }
  };

  const addLike = async (scode) => {
    requireLogin(async () => {
      if (!likedCafes.includes(scode)) {
        const formData = new FormData();
        formData.append('method', 'PUT');
        formData.append('cafeID', scode);
        formData.append('user_id', localStorage.getItem('userID'));

        try {
          const res = await axios.post('https://student.crru.ac.th/651463012/Reviewcafe/apicafes/db_cafe.php', formData);
          console.log(res.data);
          // Update likedCafes in state and localStorage
          const updatedLikedCafes = [...likedCafes, scode];
          setLikedCafes(updatedLikedCafes);
          const userData = JSON.parse(localStorage.getItem('userData')) || {};
          userData.likedCafes = updatedLikedCafes;
          localStorage.setItem('userData', JSON.stringify(userData));
          // Refresh cafes after adding like
          fetchCafes();
        } catch (err) {
          console.error('Error updating likes:', err);
        }
      } else {
        console.log('You have already liked this cafe');
      }
    });
  };

  const toggleFavorite = (cafeID) => {
    requireLogin(() => {
      setFavorites(prevFavorites => {
        if (prevFavorites.includes(cafeID)) {
          return prevFavorites.filter(id => id !== cafeID);
        } else {
          return [...prevFavorites, cafeID];
        }
      });
    });
  };

  const showDetails = (cafe) => {
    setSelectedCafe(cafe);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCafe(null);
  };

  const shareCafe = (cafe) => {
    requireLogin(() => {
      if (navigator.share) {
        navigator.share({
          title: cafe.cafeName,
          text: `Check out this cafe: ${cafe.cafeName} in ${cafe.countyName} `,
          url: window.location.href,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        alert('Web Share API is not supported in your browser');
      }
    });
  };

  const filteredCafes = selectedCounty === 'All' 
    ? cafes 
    : cafes.filter(cafe => cafe.countyName === selectedCounty);

  const indexOfLastCafe = currentPage * cafesPerPage;
  const indexOfFirstCafe = indexOfLastCafe - cafesPerPage;
  const currentCafes = filteredCafes.slice(indexOfFirstCafe, indexOfLastCafe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCafes.length / cafesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container fluid className="mt-4 cafe-container">
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={6}>
          <div className="d-flex justify-content-between align-items-center">
            <Dropdown className="mb-3">
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="cafe-dropdown">
                เลือกเขต: {selectedCounty}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {counties.map(county => (
                  <Dropdown.Item key={county} onClick={() => setSelectedCounty(county)}>
                    {county}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <nav>
              <ul className="pagination justify-content-center flex-wrap mb-0">
                {pageNumbers.map(number => (
                  <li key={number} className="page-item m-1">
                    <Button className="page-link cafe-pagination" onClick={() => paginate(number)}>
                      {number}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Col>
      </Row>
      <Row>
        {currentCafes.map(cafe => (
          <Col key={cafe.cafeID} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <div className="card h-100 cafe-card">
              <div className="card-body d-flex flex-column">
                <div className="position-relative">
                  <Button 
                    className={`btn btn-dark position-absolute top-0 end-0 m-2 cafe-favorite-btn`} 
                    onClick={() => toggleFavorite(cafe.cafeID)}
                    style={{ zIndex: 1 }}
                    disabled={!isLoggedIn}
                  >
                    <FaHeart color={favorites.includes(cafe.cafeID) ? 'red' : 'white'} />
                  </Button>
                  <div className="image-container mb-3" style={{ height: '200px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => showDetails(cafe)}>
                    <img 
                      src={cafe.imgPath} 
                      className="card-img-top cafe-image" 
                      alt={`${cafe.cafeName}`} 
                      onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <h5 className="card-title cafe-title"><FaCoffee className="me-2" />{cafe.cafeName}</h5>
                <p className="card-text cafe-county"><FaMapMarkerAlt className="me-2" />{cafe.countyName}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <Button 
                    className="btn btn-primary flex-grow-1 mx-1 cafe-btn" 
                    onClick={() => addLike(cafe.cafeID)}
                    disabled={!isLoggedIn || likedCafes.includes(cafe.cafeID)}
                  >
                    <FaThumbsUp /> {cafe.likes}
                  </Button>
                  <Button 
                    className="btn btn-secondary flex-grow-1 mx-1 cafe-btn" 
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.cafeName)}`, '_blank')}
                  >
                    <FaMapMarkerAlt /> 
                  </Button>
                  <Button 
                    className="btn btn-success flex-grow-1 mx-1 cafe-btn" 
                    onClick={() => shareCafe(cafe)}
                  >
                    <FaShare /> Share
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} className="cafe-modal">
        <Modal.Header closeButton>
          <Modal.Title>{selectedCafe?.cafeName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCafe && (
            <>
              <div style={{ height: '300px', overflow: 'hidden' }}>
                <img 
                  src={selectedCafe.imgPath} 
                  alt={selectedCafe.cafeName} 
                  className="cafe-modal-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <p className="mt-3"><strong>เขต:</strong> {selectedCafe.countyName}</p>
              <p className="mt-3"><strong>เวลา:</strong> {selectedCafe.openingHours}</p>
              <p className="mt-3"><strong>รายละเอียด:</strong> {selectedCafe.detailsCafe}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login onLogin={handleLogin} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}
