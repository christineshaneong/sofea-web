import React from 'react';
import { Link } from 'react-router-dom';
import sofeaLogo from '../assets/sofea-logo.png';
// Importing React Icons
import { 
  FiHome, FiUsers, FiUserPlus, FiLayers, FiDollarSign, FiBriefcase, FiArrowRight 
} from 'react-icons/fi';
import { 
  RiInstagramFill, RiLinkedinBoxFill, RiShieldLine, RiFileTextLine 
} from 'react-icons/ri';

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
              <span className="text-2xl font-black tracking-tighter uppercase">SOF-EA</span>
            </div>
            <p className="text-zinc-500 text-[11px] leading-relaxed max-w-xs uppercase tracking-widest font-medium">
              Software Engineering Association. <br />
              Empowering MJIIT students through technical excellence.
            </p>
          </div>

          {/* 2. NAVIGATION */}
          <div className="flex flex-col gap-4">
            <h5 className="text-[10px] font-bold tracking-[0.4em] text-zinc-600 uppercase mb-4">Navigation</h5>
            <ul className="space-y-4 text-[12px] font-bold uppercase tracking-tight">
              <li>
                <Link to="/" className="flex items-center gap-3 hover:text-[#bc9c22] transition-all group">
                  <FiHome className="text-zinc-500 group-hover:text-[#bc9c22]" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-3 hover:text-[#bc9c22] transition-all group">
                  <FiUsers className="text-zinc-500 group-hover:text-[#bc9c22]" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/recruitment" className="flex items-center gap-3 hover:text-[#bc9c22] transition-all group">
                  <FiUserPlus className="text-zinc-500 group-hover:text-[#bc9c22]" /> Recruitment
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. RESOURCES */}
          <div className="flex flex-col gap-4">
            <h5 className="text-[10px] font-bold tracking-[0.4em] text-zinc-600 uppercase mb-4">Resources</h5>
            <ul className="space-y-4 text-[12px] font-bold uppercase tracking-tight">
              <li>
                <Link to="/team" className="flex items-center gap-3 hover:text-[#bc9c22] transition-all group">
                  <FiLayers className="text-zinc-500 group-hover:text-[#bc9c22]" /> Meet the Team
                </Link>
              </li>
              <li>
                <Link to="/sponsor" className="flex items-center gap-3 hover:text-[#bc9c22] transition-all group">
                  <FiDollarSign className="text-zinc-500 group-hover:text-[#bc9c22]" /> Sponsor Us
                </Link>
              </li>
              <li>
                <Link to="/shop" className="flex items-center gap-3 hover:text-[#bc9c22] transition-all group">
                  <FiBriefcase className="text-zinc-500 group-hover:text-[#bc9c22]" /> SOFEA Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. SOCIALS */}
          <div className="flex flex-col gap-4">
            <h5 className="text-[10px] font-bold tracking-[0.4em] text-zinc-600 uppercase mb-4">Socials</h5>
            <div className="flex flex-col gap-5 text-[12px] font-bold uppercase tracking-tight">
              <a 
                href="https://www.instagram.com/sofea.utmkl" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group"
              >
                <RiInstagramFill size={18} className="group-hover:text-[#bc9c22] transition-colors" />
                <span>Instagram</span>
                <FiArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </a>
              <a 
                href="https://www.linkedin.com/company/universiti-teknologi-malaysia-sofea-club" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group"
              >
                <RiLinkedinBoxFill size={18} className="group-hover:text-[#bc9c22] transition-colors" />
                <span>LinkedIn</span>
                <FiArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] tracking-[0.5em] text-zinc-700 uppercase">
            © 2026 SOF-EA ASSOCIATION • MJIIT UTM KUALA LUMPUR
          </p>
          <div className="flex gap-8">
             <span className="flex items-center gap-2 text-[9px] tracking-widest text-zinc-800 uppercase hover:text-zinc-500 cursor-pointer transition-colors">
               <RiShieldLine /> Privacy Policy
             </span>
             <span className="flex items-center gap-2 text-[9px] tracking-widest text-zinc-800 uppercase hover:text-zinc-500 cursor-pointer transition-colors">
               <RiFileTextLine /> Terms of Service
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;