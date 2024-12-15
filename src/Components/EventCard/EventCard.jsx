import React, { useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './CreateEventForm.css'; 
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";

const CreateEventForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [price, setPrice] = useState(''); 
  const [amount, setAmount] = useState(''); 

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEventImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      name: eventName,
      date: eventDate,
      time: eventTime,
      description: eventDescription,
      image: eventImage,
      price: price,
      amount: amount
    };

    fetch('https://localhost:7227/api/Etkinlik/Create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })
    .then(response => {
      if (response.ok) {
        alert('Etkinlik başarıyla oluşturuldu!');
        navigate('/');
      } else {
        alert('Etkinlik oluşturulurken bir hata oluştu!');
      }
    })
    .catch((error) => {
      console.error('Hata oluştu:', error);
      alert('Sunucuyla bağlantı kurulamadı!');
    });
  };

  return (
    <Container>
      <Navbar />
      <div className="create-event-form">
        <h1>Etkinlik Oluştur</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Etkinlik Görseli</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            {eventImage && <img src={eventImage} alt="Event" className="event-image-preview mt-2" />}
          </Form.Group>

          <Form.Group controlId="formEventName" className="mb-3">
            <Form.Label>Etkinlik Adı</Form.Label>
            <Form.Control
              type="text"
              placeholder="Etkinlik adını girin"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formEventDate" className="mb-3">
                <Form.Label>Tarih</Form.Label>
                <Form.Control
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEventTime" className="mb-3">
                <Form.Label>Saat</Form.Label>
                <Form.Control
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formEventDescription" className="mb-3">
            <Form.Label>Açıklama</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Etkinlik açıklamasını girin"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPrice" className="mb-3">
            <Form.Label>Fiyat</Form.Label>
            <Form.Control
              type="number"
              placeholder="Fiyatı girin"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formAmount" className="mb-3">
            <Form.Label>Katılımcı Sayısı</Form.Label>
            <Form.Control
              type="number"
              placeholder="Katılımcı sayısını girin"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Oluştur
          </Button>
        </Form>
      </div>
    </Container>
  );
};

// Bileşeni default olarak export et
export default CreateEventForm;
