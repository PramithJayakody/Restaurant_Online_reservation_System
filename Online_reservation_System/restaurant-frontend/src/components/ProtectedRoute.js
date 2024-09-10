import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('userId');
    
    // Redirect to login if not authenticated
    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
