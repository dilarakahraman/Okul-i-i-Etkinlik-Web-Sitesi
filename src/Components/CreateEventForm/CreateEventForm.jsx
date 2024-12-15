import React, { useState } from 'react';
import axios from 'axios';
import './CreateEventForm.css';

const CreateEventForm = ({ onEventCreated, user }) => { // Kullanıcı bilgilerini props olarak al
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        image: '',
        price: '',
        amount: '',
        description: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newEvent = {
            ...formData,
            price: parseFloat(formData.price),
            amount: parseInt(formData.amount)
        };

        try {
            const response = await axios.post('https://localhost:7227/api/Etkinlik/Create', newEvent);
            onEventCreated(response.data);
            setSuccessMessage('Etkinlik başarıyla oluşturuldu!');
            // Formu temizle
            setFormData({
                name: '',
                date: '',
                image: '',
                price: '',
                amount: '',
                description: ''
            });
        } catch (error) {
            console.error('Hata:', error);
            alert('Etkinlik oluşturulurken bir hata oluştu.');
        }
    };

    return (
        <div className="create-event-form">
            <h2>Yeni Etkinlik Oluştur</h2>
            {user && <p>Hoş geldiniz, {user.name}!</p>} {/* Kullanıcı adı burada gösteriliyor */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Etkinlik Adı:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Etkinlik adını girin"
                    />
                </div>
                <div className="form-group">
                    <label>Tarih:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Resim URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        placeholder="Resim URL'sini girin"
                    />
                </div>
                <div className="form-group">
                    <label>Fiyat:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        placeholder="Fiyatı girin"
                    />
                </div>
                <div className="form-group">
                    <label>Miktar:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        placeholder="Miktarı girin"
                    />
                </div>
                <div className="form-group">
                    <label>Açıklama:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Etkinlik açıklamasını girin"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Oluştur</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>} {/* Başarı mesajı */}
        </div>
    );
};

export default CreateEventForm;
