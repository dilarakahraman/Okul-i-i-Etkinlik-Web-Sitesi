import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EventDetail.css';  // Stil dosyasını import ediyoruz

const EventDetail = ({ addToCart }) => {  // addToCart fonksiyonunu prop olarak al
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartSuccess, setCartSuccess] = useState(false); // Sepete başarıyla eklendi mi?

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7227/api/Etkinlik/GetById/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Etkinlik detayları alınırken hata:", error.message);
        setError("Etkinlik bulunamadı veya bir hata oluştu.");
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  // Sepete ekleme fonksiyonu
  const handleAddToCart = () => {
    if (event) {
      addToCart({  // Event bilgilerini sepete eklemek için çağırıyoruz
        id: event.id,
        name: event.name,
        image: event.image,
        price: event.price,
      });
      setCartSuccess(true); // Başarılı ekleme
    }
  };

  if (loading) return <p className="loading">Yükleniyor...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="event-detail-container">
      <div className="event-detail-header">
        <h1>{event.name}</h1>
        <img src={event.image || 'placeholder-image-url.jpg'} alt={event.name} />
      </div>
      <div className="event-detail-info">
        <p><strong>Tarih:</strong> {event.date}</p>
        <p><strong>Fiyat:</strong> <span className="price-tag">{event.price}₺</span></p>
        <p><strong>Açıklama:</strong> {event.description}</p>

        {/* Sepete ekle butonu */}
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Sepete Ekle
        </button>

        {/* Sepete başarıyla eklendi mesajı */}
        {cartSuccess && <p style={{ color: 'green', marginTop: '10px' }}>Etkinlik sepete eklendi!</p>}
      </div>
    </div>
  );
};

export default EventDetail;
