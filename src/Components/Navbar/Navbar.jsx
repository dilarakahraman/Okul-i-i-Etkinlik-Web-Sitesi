import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">Kayseri Üniversitesi</Link>
      <ul className="nav">
        <li><Link to="/">Anasayfa</Link></li>
        {user && <li><Link to="/create-event">Etkinlik Oluştur</Link></li>} {/* Kullanıcı giriş yaptıysa etkinlik oluşturma linkini göster */}
        <li><Link to="/cart">Sepet</Link></li>
        
      </ul>
      <ul className="nav nav-right">
        {user ? ( // Kullanıcı bilgisi var mı?
          <>
            <li>
              <span className="profile-icon">👤</span> {/* Profil sembolü */}
              <span>{user.name}</span> {/* Kullanıcı adını göster */}
            </li>
            <li>
              <button onClick={onLogout} className="logout-button">Çıkış Yap</button> {/* Çıkış butonu */}
            </li>
          </>
        ) : (
          <>
            <li>
              <span className="profile-icon">👤</span> {/* Profil sembolü */}
              <span>Ad Soyad</span> {/* Giriş yapılmadıysa "Ad Soyad" yazısı */}
            </li>
            <li><Link to="/register"><span className="glyphicon glyphicon-user"></span> Üye Ol</Link></li>
            <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Giriş Yap</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
