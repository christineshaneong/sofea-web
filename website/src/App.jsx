import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About'; 
import Team from './pages/Team';
import Recruitment from './pages/Recruitment';
import SponsorPage from './pages/Sponsor';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Events from './pages/Events';
import MouseTrail from './components/MouseTrail'; // 1. Import MouseTrail globally
import Archive from './pages/Archive'; // Add this import


function App() {
  return (
    <Router>
      {/* 2. Global Layers: These show up on every page */}
      <ScrollToTop />
      <MouseTrail /> 
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/recruitment" element={<Recruitment />} />
        
        {/* Unified Sponsor Route */}
        <Route path="/sponsor" element={<SponsorPage />} />
        
        <Route path="/contact" element={<Contact />} />

        {/* Events Routes */}
        <Route path="/events" element={<Events />} /> 
        <Route path="/event/:id" element={<Events />} /> 
        <Route path="/archive" element={<Archive />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;