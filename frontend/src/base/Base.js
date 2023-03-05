import React from 'react';
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './auth';
import { ProtectedRoute } from './ProtectedRoute';
import Login from './Login';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Base component to hold rou
 * @author Jing Huang
 * @author Isaac Handy
 */
function Base() {

    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            </Routes>
        </AuthProvider>
    );
}

export default Base;