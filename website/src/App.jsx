import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About'; 
import Team from './pages/Team';
import Recruitment from './pages/Recruitment';
import SponsorPage from './pages/Sponsor';
import Contact from './pages/Contact';
import EventDetail from './pages/Events';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Events from './pages/Events';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/sponsor" element={<SponsorPage />} />
        <Route path="/contact" element={<Contact />} />
        {/* Dynamic route for the detailed event view */}
        <Route path="/event/:id" element={<Events />} /> 
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;