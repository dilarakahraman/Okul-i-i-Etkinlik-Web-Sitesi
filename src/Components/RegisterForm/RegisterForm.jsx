import React, { useState } from 'react';
import './RegisterForm.css';
import { FaUser, FaLock, FaPhone } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:7227/api/UserSign/Create', {
        name: name,
        surname: surname,
        phone: phone,
        email: email,
        password: password,
        isActive: true, // Varsayılan olarak true
        createDate: new Date().toISOString(), // Şu anki tarih
      });

      console.log('Kayıt başarıyla oluşturuldu:', response.data);
      alert('Kayıt işlemi başarılı!');
      navigate('/login'); // Başarılı kayıttan sonra giriş sayfasına yönlendirin
    } catch (error) {
      console.error('Kayıt hatası:', error);
      alert('Kayıt sırasında bir hata oluştu!'); // Hata mesajı
    }
  };

  return (
    <div>
      <div className='form-container'>
        <div className='form-wrapper'>
          <form onSubmit={handleRegister}>
            <h1>Üye Ol</h1>
            <div className='input-box'>
              <input
                type="text"
                placeholder='Ad'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FaUser className='icon' />
            </div>
            <div className='input-box'>
              <input
                type="text"
                placeholder='Soyad'
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
              <FaUser className='icon' />
            </div>
            <div className='input-box'>
              <input
                type="text"
                placeholder='Telefon'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <FaPhone className='icon' />
            </div>
            <div className='input-box'>
              <input
                type="email"
                placeholder='E-posta'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaUser className='icon' />
            </div>
            <div className='input-box'>
              <input
                type="password"
                placeholder='Şifre'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className='icon' />
            </div>
            <button type="submit">Üye Ol</button>
            <div className="login-link">
              <p>Hesabınız var mı? <Link to="/login">Giriş Yap</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
