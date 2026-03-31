import React from 'react';
import { Link } from 'react-router-dom';
import sofeaLogo from '../assets/sofea-logo.png';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-20 px-6 md:px-16 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* 1. BRAND SECTION */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={sofeaLogo} 
                alt="SOFEA" 
                className="w-12 h-12 object-contain" 
              />
              <span className="text-2xl font-black tracking-tighter uppercase">SOFEA</span>
            </div>
            <p className="text-zinc-500 text-[11px] leading-relaxed max-w-xs uppercase tracking-widest font-medium">
              Software Engineering Association. <br />
              Empowering MJIIT students through technical excellence.
            </p>
          </div>

          {/* 2. NAVIGATION */}
          <div className="flex flex-col gap-4">
            <h5 className="text-[10px] font-bold tracking-[0.4em] text-zinc-600 uppercase mb-4">Navigation</h5>
            <ul className="space-y-3 text-[12px] font-bold uppercase tracking-tight">
              <li><Link to="/" className="hover:text-[#bc9c22] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#bc9c22] transition-colors">About Us</Link></li>
              <li><Link to="/recruitment" className="hover:text-[#bc9c22] transition-colors">Recruitment</Link></li>
            </ul>
          </div>

          {/* 3. RESOURCES */}
          <div className="flex flex-col gap-4">
            <h5 className="text-[10px] font-bold tracking-[0.4em] text-zinc-600 uppercase mb-4">Resources</h5>
            <ul className="space-y-3 text-[12px] font-bold uppercase tracking-tight">
              <li><Link to="/team" className="hover:text-[#bc9c22] transition-colors">Meet the Team</Link></li>
              <li><Link to="/sponsor" className="hover:text-[#bc9c22] transition-colors">Sponsor Us</Link></li>
              <li><Link to="/job-board" className="hover:text-[#bc9c22] transition-colors">Job Board</Link></li>
            </ul>
          </div>

          {/* 4. SOCIALS - Cleaned and Fixed */}
          <div className="flex flex-col gap-4">
            <h5 className="text-[10px] font-bold tracking-[0.4em] text-zinc-600 uppercase mb-4">Socials</h5>
            <div className="flex flex-col gap-4 text-[12px] font-bold uppercase tracking-tight">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/sofea.utmkl" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <span className="w-5 h-5 border border-zinc-800 flex items-center justify-center text-[8px]">IG</span> 
                Instagram
              </a>
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/universiti-teknologi-malaysia-sofea-club" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <span className="w-5 h-5 border border-zinc-800 flex items-center justify-center text-[8px]">LN</span> 
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] tracking-[0.5em] text-zinc-700 uppercase">
            © 2026 SOFEA ASSOCIATION • MJIIT UTM KUALA LUMPUR
          </p>
          <div className="flex gap-8">
             <span className="text-[9px] tracking-widest text-zinc-800 uppercase">Privacy Policy</span>
             <span className="text-[9px] tracking-widest text-zinc-800 uppercase">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;