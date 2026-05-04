import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavOverlay = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  // Safety: Force close menu when URL changes
  useEffect(() => {
    if (typeof setIsOpen === 'function') {
      setIsOpen(false);
    }
  }, [location.pathname, setIsOpen]);

  const menuLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "SOFEA News", href: "/news" }, // Updated text here
    { name: "Meet the Team", href: "/team" },
    { name: "Archive", href: "/archive" },
    { name: "Shop", href: "/shop" },
    { name: "Recruitment", href: "/recruitment" },
    { name: "Sponsor Us", href: "/sponsor" },
    { name: "Contact", href: "/contact" }
  ];

  const handleClose = () => {
    if (typeof setIsOpen === 'function') {
      setIsOpen(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[10000] bg-[#0a0a0a] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center px-8 md:px-32 ${
        isOpen 
          ? 'translate-y-0 opacity-100 pointer-events-auto' 
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      {/* Container with scroll for mobile to handle all 9 links */}
      <div className="w-full relative z-[10001] max-h-screen overflow-y-auto py-24">
        <nav className="flex flex-col items-start font-sans">
          <p className="text-[10px] font-bold tracking-[0.5em] text-zinc-700 uppercase mb-6 md:mb-8">
            Navigation
          </p>

          <div className="flex flex-col gap-2 md:gap-4 items-start w-full">
            {menuLinks.map((link, index) => {
              const isActive = location.pathname === link.href;

              return (
                <div key={link.name} className="h-auto overflow-visible relative">
                  <Link 
                    to={link.href}
                    onClick={handleClose}
                    className={`
                      nav-expand-link
                      px-2 md:px-6 py-1 md:py-2
                      block relative whitespace-nowrap w-fit cursor-pointer
                      text-2xl md:text-5xl font-black uppercase tracking-widest
                      pointer-events-auto
                      transition-all duration-300
                      ${isOpen ? `menu-typewriter delay-${index + 1}` : 'opacity-0'}
                      ${isActive ? "text-[#bc9c22]" : "text-white hover:text-[#800000] hover:translate-x-2"} 
                    `}
                  >
                    {link.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavOverlay;