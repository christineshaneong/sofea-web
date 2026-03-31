import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavOverlay from './NavOverlay'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[110] px-6 py-6 flex justify-between items-center bg-transparent">
        <div className="text-xl font-black uppercase tracking-tighter text-white">SOFEA</div>

        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`px-8 py-2 rounded-sm text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 z-[120] ${
              isMenuOpen 
                ? 'bg-[#800000] text-white' // Maroon when menu is open
                : 'bg-white text-black hover:bg-[#800000] hover:text-white' // White normally, Maroon on hover
            }`}
          >
            {isMenuOpen ? 'Close ✕' : 'Menu ☰'}
          </motion.button>
        </div>
      </nav>

      <NavOverlay isOpen={isMenuOpen} />
    </>
  );
};

export default Navbar;