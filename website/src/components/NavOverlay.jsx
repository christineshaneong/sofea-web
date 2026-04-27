import React from 'react';
import { Link } from 'react-router-dom';

const NavOverlay = ({ isOpen, setIsOpen }) => {
  const menuLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Meet the Team", href: "/team" },
    { name: "Archive", href: "/archive" },
    { name: "Recruitment", href: "/recruitment" },
    { name: "Sponsor Us", href: "/sponsor" },
    { name: "Contact", href: "/contact" }
  ];

  const handleClose = () => {
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#0a0a0a] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center px-10 md:px-32 ${
        isOpen 
          ? 'translate-y-0 opacity-100 pointer-events-auto' 
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-5xl w-full">
        <nav className="flex flex-col items-start font-sans">
          {/* Label */}
          <p className="text-[10px] font-bold tracking-[0.5em] text-zinc-700 uppercase mb-8">
            Navigation
          </p>

          <div className="flex flex-col gap-4 items-start">
            {menuLinks.map((link, index) => (
              /* overflow-visible is required so the frame can expand outside the text */
              <div key={link.name} className="h-auto overflow-visible">
                <Link 
                  to={link.href}
                  onClick={handleClose}
                  className={`
                    ${isOpen ? `menu-typewriter delay-${index + 1}` : ''}
                    nav-expand-link
                    px-6 py-2
                    text-3xl md:text-5xl font-black uppercase tracking-widest text-white
                  `}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Footer Line */}
          <div className="mt-12 border-t border-white/5 pt-4 w-32">
             <p className="text-zinc-800 text-[10px] font-bold tracking-widest uppercase">
               SOFEA v3.0
             </p>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavOverlay;