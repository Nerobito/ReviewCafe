import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Home.css'; // Make sure this file exists
import image1 from '../ImageDetails/328618747_1210958456499205_1152357062982996622_n-2.jpg';
import image2 from '../ImageDetails/272827273_119593777262517_8084355433692576069_n.jpg';
import image3 from '../ImageDetails/448353109_436688832506847_8864637754627988796_n.jpg';

function Home() {
  return (
    <div className="home">
      <Carousel>
        <Carousel.Item>
          <div className="carousel-image-container">
            <img
              className="d-block w-100 carousel-image"
              src={image1}
              alt="First slide"
              style={{ filter: 'brightness(80%)' }}
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image-container">
            <img
              className="d-block w-100 carousel-image"
              src={image2}
              alt="Second slide"
              style={{ filter: 'brightness(80%)' }}
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image-container">
            <img
              className="d-block w-100 carousel-image"
              src={image3}
              alt="Third slide"
              style={{ filter: 'brightness(80%)' }}
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      </Carousel>
      <hr className="section-divider" />
      <h1 style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>คาแฟ่แนะนำ</h1>
      <hr className="section-divider" />

      <div className="content-section">
        <img src={image1} alt="Example Image 1" className="content-image left" style={{ borderRadius: '10px' }} />
        <div className="content-text">
          <h2>Akha FarmVillie</h2>
          <hr className="section-divider" />
          <p>เที่ยวคาเฟ่บรรยากาศดีที่ดอยช้าง จังหวัดเชียงราย มีทีเด็ดคือฟาร์มแกะ เอาใจนักท่องเที่ยวทานเครื่องดื่มเย็นๆ พร้อมถ่ายรูปและเล่นกับน้องแกะ </p>
          <p>คาเฟ่จะบรรยากาศดีมากเหมือนอยู่ตรงสันเขาเลย เราไปช่วงเช้าๆ อากาศยังไม่ค่อยร้อน ถ่ายรูปเล่นกับน้องแกะได้ยาวๆ เลย</p>
         <p>แต่ถ้าไปช่วงเทศกาลคนจะเยอะหน่อยนึง</p>
        </div>
      </div>

      <hr className="section-divider" />

      <div className="content-section">
        <div className="content-text">
          <h2>Lalitta Cafe’</h2>
          <p> เป็นคาเฟ่ป่าหิมพานต์ เหมือนอยู่ในเทพนิยาย มีหมอกและน้ำตกจำลอง มุมสวยถ่ายรูปเล่นได้เยอะมาก </p>
        </div>
        <img src={image2} alt="Example Image 2" className="content-image right" style={{ borderRadius: '10px' }} />
      </div>

      <hr className="section-divider" />

      <div className="content-section">
        <img src={image3} alt="Example Image 3" className="content-image left" style={{ borderRadius: '10px' }} />
        <div className="content-text">
          <h2>Kyoto shi Cafe’</h2>
          <p> เป็นคาเฟ่สไตล์ญี่ปุ่น ที่มีจุดนั่งเยอะหลากหลายแบบ จุดถ่ายรูปก็สวยสุดๆ และเครื่องดื่มขนมก็อร่อยมากๆ</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
