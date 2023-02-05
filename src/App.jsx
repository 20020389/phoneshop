import React, { Component } from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Product from './pages/product';
import Register from './pages/register';
import Login from './pages/Login';
import Clients from './pages/Clients';
function App() {

  return (
    <Routes>
      <Route path="/product" element={<Product/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/clients" element={<Clients/>} />

      <Route path="/" element={<Home />} />
      <Route path="/*" element={<div>404 not found</div>} />
    </Routes>
  );
}

export default App;
