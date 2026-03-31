import React from 'react';

const NavOverlay = ({ isOpen }) => {
  const menuLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Meet the Team", href: "/team" },
        { name: "Recruitment", href: "/recruitment" }, // NEW LINK
        { name: "Sponsor Us", href: "/sponsor" },
        { name: "Contact", href: "/contact" }
    ];

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#111111] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center px-10 md:px-20 ${
        isOpen 
          ? 'translate-y-0 opacity-100 pointer-events-auto' 
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-20">
        
        {/* LEFT SIDE: Navigation Links */}
        <nav className="flex flex-col gap-2">
          <p className="text-[10px] font-bold tracking-[0.5em] text-zinc-600 uppercase mb-4">Navigation</p>
          {menuLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white hover:text-[#bc9c22] hover:italic transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* RIGHT SIDE: Preview Box */}
        <div className="hidden lg:block border border-white/5 bg-zinc-900/20 rounded-2xl h-[450px] relative p-10 overflow-hidden group">
          <div className="absolute bottom-10 left-10">
            <h3 className="text-[#bc9c22] text-2xl font-black uppercase mb-2 leading-none">SOFEA</h3>
            <p className="text-zinc-500 text-xs uppercase tracking-widest max-w-[200px]">
              Discover our events, community, and opportunities.
            </p>
          </div>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#bc9c22]/5 rounded-full blur-3xl"></div>
        </div>

      </div>
    </div>
  );
};

export default NavOverlay;