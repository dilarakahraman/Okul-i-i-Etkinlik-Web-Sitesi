import React, { useState, useEffect } from 'react';
import { Carousel, Card, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomeScreen.css';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Link bileşenini import et

// Resimleri import edin
import slide1 from '../../assets/söylesi4.jpg';
import slide2 from '../../assets/konser3.jpg';
import slide3 from '../../assets/yogo.jpg';

const HomeScreen = ({ cart, setCart, favorites, setFavorites, isLoggedIn }) => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Etkinlikleri API'den çek
  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://localhost:7227/api/Etkinlik/GetAll');
      setEvents(response.data);
    } catch (error) {
      console.error('Etkinlikleri getirirken bir hata oluştu!', error);
    }
  };

  useEffect(() => {
    fetchEvents(); // Sayfa yüklendiğinde etkinlikleri al
  }, []);

  // Sepete ekleme fonksiyonu
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]); // Sepete ekle
    alert(`${item.name} sepete eklendi!`);
  };

  return (
    <div>
      {/* Carousel Yapısı */}
      <Carousel className="carousel-custom">
        <Carousel.Item>
          <img className="d-block w-100" src={slide1} alt="Slide 1" />
          <Carousel.Caption>
            <h3>Konser 1</h3>
            <p>İlk etkinliğin açıklaması burada yer alabilir.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slide2} alt="Slide 2" />
          <Carousel.Caption>
            <h3>Konser 2</h3>
            <p>İkinci etkinliğin açıklaması burada yer alabilir.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Kartlar */}
      <div className="container mt-4">
        <h2 className="text-center mb-4">Etkinlikler</h2>
        <Row>
          {events.map((event) => (
            <Col md={6} lg={3} key={event.id}>
              <Card className="mb-4 shadow-sm" style={{ height: '350px' }}>
                <Link to={`/event/${event.id}`}>
                  <Card.Img
                    variant="top"
                    src={event.image || 'placeholder-image-url.jpg'} // Placeholder kullanma
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Text>
                    <strong>Tarih:</strong> {event.date}<br />
                    <strong>Fiyat:</strong> {event.price}₺
                  </Card.Text>
                  <Button variant="primary" onClick={() => addToCart(event)}>
                    <FaShoppingCart /> Sepete Ekle
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomeScreen;
