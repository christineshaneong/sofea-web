import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavOverlay = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  // 1. Force close menu when URL changes (Safety)
  useEffect(() => {
    if (typeof setIsOpen === 'function') {
      setIsOpen(false);
    }
  }, [location.pathname, setIsOpen]);

  // 2. LOCK BODY SCROLL: Prevents background movement and hides the red scrollbar track
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup on unmount
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const menuLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "SOFEA News", href: "/news" },
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
      {/* SCROLLABLE INNER CONTAINER: 
          - py-24 adds space so links don't touch the top/bottom edges.
          - no-scrollbar utility keeps the interface clean.
      */}
      <div className="w-full max-h-screen overflow-y-auto no-scrollbar py-24 relative z-[10001]">
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
                      /* RESPONSIVE FONT: Shrinks on small screens to prevent squashing */
                      text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-widest
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

      <style>{`
        /* Hides scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hides scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default NavOverlay;