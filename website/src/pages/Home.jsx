import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import client from '../sanityClient'; // Ensure this path is correct
import imageUrlBuilder from '@sanity/image-url';

// Standard Components
import Navbar from '../components/Navbar';
import RotatingLogo from '../components/RotatingLogo';
import AboutAccordion from '../components/AboutAccordion';
import Sponsors from '../components/Sponsors';
import MouseTrail from '../components/MouseTrail';
import SocialFeed from '../components/SocialFeed';
import Slideshow from '../components/Slideshow';

// Sanity Image Setup
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('All');

  // 1. Fetch Events from Sanity
  useEffect(() => {
    client.fetch(`*[_type == "event"] | order(date desc)`)
      .then((data) => setEvents(data))
      .catch(console.error);
  }, []);

  const categories = ['All', 'Workshop', 'Competition', 'Social'];
  
  // 2. Filter Logic
  const filteredEvents = filter === 'All' 
    ? events 
    : events.filter(e => e.category === filter);

  return (
    <div className="relative w-full min-h-screen text-white overflow-x-hidden selection:bg-[#800000]">
      <MouseTrail />
      <Slideshow />
      <Navbar />
      
      <main className="relative z-10">
        {/* HERO SECTION */}
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

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500">Scroll</span>
            <div className="relative w-[1px] h-12 overflow-hidden">
              <motion.div className="w-full h-8 bg-white" animate={{ y: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
            </div>
          </div>
        </section>

        {/* CONTENT SECTIONS */}
        <div className="bg-[#0A0A0A]">
            <AboutAccordion />

            {/* DYNAMIC EVENTS SECTION */}
            <section className="py-24 px-6 md:px-16 lg:px-24">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                  <div>
                    <h2 className="text-5xl font-black uppercase tracking-tighter italic">Latest Events</h2>
                    <p className="text-zinc-500 uppercase tracking-widest text-xs mt-2">Sort by Category</p>
                  </div>
                  
                  {/* Category Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all border ${filter === cat ? 'bg-[#800000] border-[#800000] text-white' : 'border-zinc-800 text-zinc-500 hover:border-white'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Event Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {filteredEvents.map((event) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        key={event._id}
                        className="group relative bg-zinc-900/50 border border-zinc-800 overflow-hidden"
                      >
                        <Link to={`/event/${event._id}`}>
                          {/* Change aspect-video to aspect-square */}
                          <div className="aspect-square overflow-hidden border-b border-zinc-800">
                            <img 
                              src={urlFor(event.mainImage).width(600).height(600).url()} // Added .height(600) for better cropping
                              alt={event.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="p-6">
                            <span className="text-[#bc9c22] text-[10px] uppercase font-bold tracking-[0.2em]">{event.category}</span>
                            <h3 className="text-xl font-bold mt-2 group-hover:text-[#800000] transition-colors">{event.title}</h3>
                            <p className="text-zinc-500 text-sm mt-1">{new Date(event.date).toDateString()}</p>
                            <div className="mt-4 flex items-center text-[10px] uppercase font-black tracking-widest text-white group-hover:translate-x-2 transition-transform">
                              View Details <span className="ml-2">→</span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            <section className="py-24 px-6 md:px-16 lg:px-24 border-t border-zinc-900">
              <div className="max-w-7xl mx-auto"><SocialFeed /></div>
            </section>
            {/* <Sponsors /> */}
        </div>
      </main>
    </div>
  );
};

export default Home;