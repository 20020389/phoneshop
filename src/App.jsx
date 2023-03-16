import React, { Component, useEffect } from 'react';
import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Product from './pages/product';
import Register from './pages/register';
import Login from './pages/Login';
import Clients from './pages/Clients';
import { useStore } from './lib/zustand';
import axios from 'axios';
import { ProfilePage } from './pages/Profile';

function App() {
  const { user, loading, setUser } = useStore();

  useEffect(() => {
    if (loading) {
      const token = localStorage.getItem('token');
      if (!token || token == '' || !token.toLowerCase().includes('bearer ')) {
        setUser(null);
        return;
      }
      axios
        .get('/api/user', {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.data) {
            const data = res.data;
            setUser(data.data);
          }
        })
        .catch((e) => {
          setUser(null);
        });
    }
  }, [loading]);

  if (loading) {
    return <></>;
  }

  return (
    <Routes>
      {user == null ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      ) : (
        <></>
      )}
      <Route
        path="/profile"
        element={user !== null ? <ProfilePage /> : <Navigate to="/login" />}
      />
      <Route path="/product" element={<Product />} />

      <Route path="/clients" element={<Clients />} />

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/register" element={<Navigate to="/" />} />
      <Route path="/*" element={<div>404 not found</div>} />
    </Routes>
  );
}

export default App;
