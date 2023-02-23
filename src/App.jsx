import React, { Component, useEffect } from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Product from './pages/product';
import Register from './pages/register';
import Login from './pages/Login';
import Clients from './pages/Clients';
import { useStore } from './lib/zustand';
import axios from 'axios';
function App() {
  const { user, loading, setUser, setLoading } = useStore();

  useEffect(() => {
    if (loading) {
      axios
        .get('/api/user', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((res) => {
          if (res.data) {
            const data = res.data;
            setUser(data.data);
            setLoading(false);
          }
        })
        .catch((e) => {
          setUser(null);
          setLoading(false);
        });
    }
  }, [loading]);

  if (loading) {
    return <></>;
  }

  return (
    <Routes>
      <Route path="/product" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/clients" element={<Clients />} />

      <Route path="/" element={<Home />} />
      <Route path="/*" element={<div>404 not found</div>} />
    </Routes>
  );
}

export default App;
