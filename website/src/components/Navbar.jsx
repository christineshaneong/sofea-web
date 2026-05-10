import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavOverlay from './NavOverlay'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Container is fixed with high z-index to stay above the Team page filters */}
      <nav className="fixed top-0 left-0 w-full z-[999] px-6 py-6 flex justify-end items-center bg-transparent pointer-events-none">
        
        {/* SOF-EA Wording Removed as requested */}

        {/* MENU BUTTON - Kept on the right */}
        <div className="flex items-center pointer-events-auto">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`px-8 py-2 rounded-sm text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 whitespace-nowrap border-2 ${
              isMenuOpen 
                ? 'bg-[#800000] text-white border-[#800000]' 
                : 'bg-black text-white border-white hover:border-[#bc9c22] hover:text-[#bc9c22]'
            }`}
          >
            {isMenuOpen ? 'Close ✕' : 'Menu ☰'}
          </motion.button>
        </div>
      </nav>

      <NavOverlay isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
};

export default Navbar;