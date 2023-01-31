import React, { Component } from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import { PhoneCard } from './components/PhoneCard';

function App() {
  //

  return (
    <Routes>
      <Route path="/test" element={<PhoneCard name={'string'} />} />
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<div>404 not found</div>} />
    </Routes>
  );
}

export default App;
