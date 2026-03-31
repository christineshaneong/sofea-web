import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import RotatingLogo from '../components/RotatingLogo';
import AboutAccordion from '../components/AboutAccordion';
import EventCard from '../components/EventCard';
import Sponsors from '../components/Sponsors';
import Footer from '../components/Footer';
import MouseTrail from '../components/MouseTrail';
import SocialFeed from '../components/SocialFeed';
import Slideshow from '../components/Slideshow';

const Home = () => {
  return (
    // REMOVED the global black background so the Slideshow can be seen
    <div className="relative w-full min-h-screen text-white overflow-x-hidden selection:bg-[#800000]">
      
      <MouseTrail />
      <Slideshow />
      <Navbar />
      
      <main className="relative z-10">
        
        {/* HERO SECTION - Added a subtle background to keep text readable */}
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 bg-black/30">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 md:gap-10 items-center">
            <div className="flex justify-center lg:justify-start order-1">
              <div className="scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100">
                <RotatingLogo />
              </div>
            </div>

            <div className="text-center lg:text-left order-2 -mt-10 md:mt-0">
              <h1 className="text-[11vw] md:text-[100px] font-black tracking-tighter uppercase leading-[0.85] md:leading-[0.8] mb-6">
                SOFEA <br /> MJIIT <br />
                <span className="text-[#800000]">UTM KL</span>
              </h1>
              <div className="h-[1px] w-12 md:w-20 bg-[#bc9c22] mb-6 md:mb-10 mx-auto lg:mx-0"></div>
              <p className="text-zinc-400 text-[11px] md:text-base max-w-[280px] md:max-w-sm mx-auto lg:mx-0 leading-relaxed font-light mb-8 md:mb-12">
                The premier software engineering association at MJIIT. Bridging the gap between academic learning and industry excellence.
              </p>
              
              <Link to="/recruitment" className="inline-block px-8 py-3 md:px-10 md:py-4 bg-white text-black font-bold uppercase text-[9px] md:text-[10px] tracking-[0.2em] hover:bg-[#800000] hover:text-white transition-all duration-300">
                Become a Committee
              </Link>
            </div>
          </div>

          {/* PULSING SCROLL INDICATOR */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500">
              Scroll
            </span>
            <div className="relative w-[1px] h-12 overflow-hidden">
              <motion.div 
                className="w-full h-8 bg-white"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </section>

        {/* Content sections get their own solid background to "wipe" over the slideshow on scroll */}
        <div className="bg-[#0A0A0A]">
            <AboutAccordion />
            <EventCard />
            <section className="py-24 px-6 md:px-16 lg:px-24 border-t border-zinc-900">
              <div className="max-w-7xl mx-auto"><SocialFeed /></div>
            </section>
            <Sponsors />
        </div>
      </main>
    </div>
  );
};

export default Home;