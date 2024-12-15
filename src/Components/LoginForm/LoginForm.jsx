import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const response = await axios.post('https://localhost:7227/api/UserSign/Login', {
                Email: email,
                Password: password,
            });
            console.log(response.data);
            onLogin(response.data); // Kullanıcı bilgilerini App bileşenine geçiriyoruz
            localStorage.setItem('user', JSON.stringify(response.data)); // Kullanıcıyı localStorage'a kaydet
            alert('Giriş başarılı!');
            navigate('/'); // Anasayfaya yönlendir
        } catch (error) {
            console.error("Hata yanıtı:", error.response.data);
            setErrorMessage('Giriş bilgilerinizi kontrol edin.');
        }
    };

    return (
        <div className='form-container'>
            <div className='form-wrapper'>
                <form onSubmit={handleLogin}>
                    <h1>Giriş Yap</h1>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <div className='input-box'>
                        <input
                            type="email"
                            placeholder='Email'
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
                    <button type="submit">Giriş Yap</button>
                    <div className="register-link">
                        <p>Hesabınız yok mu? <Link to="/register">Üye Ol</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
