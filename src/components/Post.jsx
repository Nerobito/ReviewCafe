import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Image, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const [showForm, setShowForm] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [cafeName, setCafeName] = useState('');
  const [county, setCounty] = useState('');
  const [counties, setCounties] = useState([]);
  const [image, setImage] = useState(null);
  const [details, setDetails] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCounties();
  }, []);

  const fetchCounties = async () => {
    try {
      const response = await axios.get('https://student.crru.ac.th/651463012/Reviewcafe/apicafes/db_cafe.php');
      const uniqueCounties = [...new Set(response.data.map(cafe => cafe.countyName))];
      setCounties(uniqueCounties);
    } catch (error) {
      console.error('Error fetching counties:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would send the post data to your backend
      // For example:
      // await axios.post('your-api-endpoint', { cafeName, county, postContent, details, image });
      
      console.log('Post submitted:', { cafeName, county, postContent, details, image });
      
      // Reset form fields
      setPostContent('');
      setCafeName('');
      setCounty('');
      setDetails('');
      setImage(null);
      setShowForm(false);
      
      // Navigate to the profile page
      navigate('/profile');
    } catch (error) {
      console.error('Error submitting post:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-end mb-3">
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>สร้างโพสต์ +</Button>
        )}
      </div>
      
      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>ชื่อคาเฟ่</Form.Label>
            <Form.Control 
              type="text"
              value={cafeName}
              onChange={(e) => setCafeName(e.target.value)}
              placeholder="ชื่อคาเฟ่"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>เขต</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {county || 'เลือกเขต'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {counties.map((countyName, index) => (
                  <Dropdown.Item key={index} onClick={() => setCounty(countyName)}>
                    {countyName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>รายละเอียด</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="รายละเอียดเกี่ยวกับคาเฟ่"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>รายละเอียดเพิ่มเติม</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={2} 
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>เพิ่มรูปภาพ</Form.Label>
            <Form.Control 
              type="file"
              onChange={handleImageChange}
              accept="img/*"
            />
          </Form.Group>
          {image && (
            <Image src={image} alt="Preview" fluid className="mb-3" />
          )}
          <Button variant="primary" type="submit">
            โพสต์
          </Button>
          <Button variant="secondary" onClick={() => setShowForm(false)} className="ms-2">
            ยกเลิก
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default Post;
