import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the navigation hook

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      {/* Background/Video here */}
      
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase mb-6">
          Shape the <span className="text-[#bc9c22]">Future</span>
        </h1>
        
        <p className="text-zinc-400 text-sm md:text-lg uppercase tracking-[0.3em] mb-10 max-w-2xl mx-auto leading-relaxed">
          The Software Engineering Association of MJIIT is looking for visionaries.
        </p>

        {/* UPDATED BUTTON */}
        <button 
          onClick={() => navigate('/recruitment')}
          className="group relative px-12 py-4 bg-[#bc9c22] text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-white transition-all duration-500 overflow-hidden"
        >
          <span className="relative z-10">Become a Committee</span>
          <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500"></div>
        </button>
      </div>
    </section>
  );
};

export default Hero;