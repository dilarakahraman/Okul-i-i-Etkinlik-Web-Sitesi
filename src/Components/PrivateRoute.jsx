import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, user }) => {
    return user ? children : <Navigate to="/login" />; // Kullanıcı giriş yaptıysa çocuk bileşenleri gösterilir, aksi halde giriş sayfasına yönlendirilir
};

export default PrivateRoute;
