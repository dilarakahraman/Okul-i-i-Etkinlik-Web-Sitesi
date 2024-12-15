import React, { useState } from 'react';
import axios from 'axios';

// Kullanıcı kayıt fonksiyonu
const registerUser = async (email, password) => {
    try {
        const response = await axios.post('https://localhost:7227/api/UserSign/Create', {
            Email: email,
            Password: password
        });
        return response.data; 
    } catch (error) {
        console.error('Kayıt hatası:', error.response ? error.response.data : error.message);
        throw new Error('Kayıt sırasında bir hata oluştu!'); 
    }
};

// Kullanıcı giriş fonksiyonu
const loginUser = async (email, password) => {
    try {
        const response = await axios.post('https://localhost:7227/api/UserSign/Login', {
            Email: email,
            Password: password
        });
        return response.data; 
    } catch (error) {
        console.error('Giriş hatası:', error.response ? error.response.data : error.message);
        throw new Error('Giriş yaparken bir hata oluştu!'); 
    }
};

// Etkinlik oluşturma fonksiyonu
const createEvent = async (token, eventName, eventDate, eventPrice) => {
    try {
        const response = await axios.post('https://localhost:7227/api/Etkinlik/Create', {
            name: eventName,
            date: eventDate,
            price: eventPrice,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data; 
    } catch (error) {
        console.error('Etkinlik oluşturma hatası:', error.response ? error.response.data : error.message);
        throw new Error('Etkinlik oluşturulurken bir hata oluştu!'); 
    }
};

const CreateEventForm = ({ onEventCreated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventPrice, setEventPrice] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (isRegistering) {
                await registerUser(email, password);
                alert('Kayıt başarılı! Lütfen giriş yapın.');
            } else {
                const userData = await loginUser(email, password);
                localStorage.setItem('token', userData.token);
                
                const newEvent = await createEvent(userData.token, eventName, eventDate, eventPrice);
                console.log('Etkinlik başarıyla oluşturuldu:', newEvent);
                onEventCreated(newEvent);
                alert('Etkinlik başarıyla oluşturuldu!');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="E-posta"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {isRegistering && (
                <>
                    <input
                        type="text"
                        placeholder="Etkinlik Adı"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        placeholder="Etkinlik Tarihi"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Etkinlik Fiyatı"
                        value={eventPrice}
                        onChange={(e) => setEventPrice(e.target.value)}
                        required
                    />
                </>
            )}
            <button type="submit">{isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}</button>
            <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Giriş Yap' : 'Kayıt Ol'}
            </button>
        </form>
    );
};

export default CreateEventForm;
