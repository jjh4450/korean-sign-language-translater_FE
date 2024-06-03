import React from 'react';
import Header from './widgets/Header';
import Home from './pages/Home';
import Footer from './widgets/Footer';

const App = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <Home />
      <Footer />
    </div>
  );
};


export default App;