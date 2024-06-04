import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Header from './widgets/Header';
import Home from './pages/Home';
import Showcase from './pages/Showcase';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Footer from './widgets/Footer';

const App = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
        <Routes>
        <Route path='/' element={<Home />} />
          <Route path='/showcase' element={<Showcase/>} />
          <Route path='/about' element={<About/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      <Footer />
    </div>
  );
};


export default App;