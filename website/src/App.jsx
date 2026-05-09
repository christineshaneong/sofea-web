import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import About from './pages/About'; 
import Team from './pages/Team';
import Recruitment from './pages/Recruitment';
import SponsorPage from './pages/Sponsor';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Archive from './pages/Archive';
import Events from './pages/Events'; // This component handles both list and detail
import News from './pages/News';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import MouseTrail from './components/MouseTrail';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MouseTrail /> 
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/sponsor" element={<SponsorPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        
        {/* News routes */}
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<News />} /> 

        {/* --- FIXED EVENT ROUTES --- */}
        <Route path="/events" element={<Events />} /> 
        {/* Add this line below to handle specific event clicks */}
        <Route path="/event/:id" element={<Events />} /> 
        
        <Route path="/archive" element={<Archive />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;