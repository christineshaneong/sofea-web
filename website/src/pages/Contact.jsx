import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

const Contact = () => {
  const socials = [
    { 
      name: 'Instagram', 
      handle: '@sofea.utmkl', 
      link: 'https://www.instagram.com/sofea.utmkl', 
      gradient: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]',
      icon: <FaInstagram size={32} />
    },
    { 
      name: 'LinkedIn', 
      handle: 'SOFEA UTM MJIIT', 
      link: 'https://www.linkedin.com/company/universiti-teknologi-malaysia-sofea-club/', 
      gradient: 'bg-[#0077b5]',
      icon: <FaLinkedin size={32} />
    },
    { 
      name: 'Email', 
      handle: 'sofea.mjiit@utm.my', 
      link: 'mailto:sofea.mjiit@utm.my', 
      gradient: 'bg-gradient-to-br from-[#bc9c22] to-[#800000]',
      icon: <FaEnvelope size={32} />
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-24">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <h2 className="text-sofea-gold text-[10px] font-bold uppercase tracking-[0.5em] mb-4">
              Get in touch
            </h2>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              Let's <br /> 
              <span className="text-[#800000] drop-shadow-[0_0_20px_rgba(128,0,0,0.2)]">
                Connect.
              </span>
            </h1>
          </div>
          <p className="text-zinc-500 uppercase text-[10px] tracking-[0.3em] max-w-[200px] leading-relaxed">
            Reach out through our official channels
          </p>
        </div>

        {/* --- SOCIALS GRID --- */}
        <div className="relative flex flex-col md:flex-row gap-8 items-start">
          
          {/* Vertical Sidebar Label */}
          <div className="hidden md:flex absolute -left-12 h-full w-10 flex-col items-center">
            <div className="h-full w-[1px] bg-zinc-800/60 absolute left-1/2 -translate-x-1/2"></div>
            <h3 className="sticky top-40 [writing-mode:vertical-lr] rotate-180 text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-bold bg-black py-4 z-10">
              Socials
            </h3>
          </div>

          {/* Cards Container */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {socials.map((social) => (
              <a 
                key={social.name}
                href={social.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative bg-zinc-900/30 p-10 rounded-[2.5rem] border border-zinc-800/50 overflow-hidden transition-all duration-500 min-h-[300px] flex flex-col justify-end"
              >
                {/* Brand Hover Gradient Overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${social.gradient}`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-zinc-500 group-hover:text-white transition-colors duration-300 mb-6">
                    {social.icon}
                  </div>
                  <h4 className="font-black text-2xl uppercase tracking-tighter group-hover:text-white transition-colors">
                    {social.name}
                  </h4>
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1 group-hover:text-white/80 transition-colors">
                    {social.handle}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="absolute top-8 right-8 text-zinc-600 group-hover:text-white z-10 transition-all duration-500 group-hover:rotate-45 group-hover:scale-125">
                  <FiArrowUpRight size={28} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

    </div>
  );
};

export default Contact;