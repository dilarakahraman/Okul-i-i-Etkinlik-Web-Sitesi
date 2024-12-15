import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './Components/HomeScreen/HomeScreen';
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import EventDetail from './Components/EventDetail/EventDetail';
import Profile from './Components/Profile/Profile';
import Cart from './Components/Cart/Cart';
import CreateEventForm from './Components/CreateEventForm/CreateEventForm';
import Navbar from './Components/Navbar/Navbar';
import { AuthProvider } from '../src/assets/Context/AuthContext';
import PrivateRoute from '../src/Components/PrivateRoute'; 
import './App.css'; 

const App = () => {
    const [cart, setCart] = useState([]); // Sepeti state olarak tanımlayın
    const [events, setEvents] = useState([]); // Etkinlikleri state olarak tanımlayın
    const [user, setUser] = useState(null); // Kullanıcı bilgilerini saklamak için

    // Yeni etkinliği ekleme fonksiyonu
    const handleEventCreated = (newEvent) => {
        setEvents((prevEvents) => [...prevEvents, newEvent]); // Yeni etkinliği ekleyin
    };

    // Ürünü sepetten kaldırma fonksiyonu
    const removeFromCart = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    // Kullanıcı giriş fonksiyonu
    const handleLogin = (userData) => {
        setUser(userData); // Giriş yapan kullanıcı bilgilerini sakla
    };

    // Kullanıcı çıkış fonksiyonu
    const handleLogout = () => {
        setUser(null); // Kullanıcı çıkış yaptığında bilgileri temizle
    };

    // Sepete ekleme fonksiyonu
    const addToCart = (item) => {
        setCart(prevCart => [...prevCart, item]); // Yeni öğeyi sepete ekleyin
    };

    return (
        <AuthProvider>
            <Router>
                <Navbar user={user} onLogout={handleLogout} />
                <main className="container">
                    <nav>
                        <Link to="/">Ana Sayfa</Link>
                        <Link to="/login">Giriş Yap</Link>
                        <Link to="/register">Kayıt Ol</Link>
                        <Link to="/cart">Sepet</Link>
                    </nav>
                    <Routes>
                        <Route path="/" element={<HomeScreen events={events} cart={cart} setCart={setCart} />} />
                        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} user={user} />} />
                        <Route path="/create-event" element={<CreateEventForm onEventCreated={handleEventCreated} />} />
                        <Route path="/event/:id" element={<EventDetail addToCart={addToCart} />} /> {/* addToCart propunu geçiriyoruz */}
                    </Routes>
                </main>
            </Router>
        </AuthProvider>
    );
};

export default App;
