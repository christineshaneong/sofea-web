import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import client from '../sanityClient';
import imageUrlBuilder from '@sanity/image-url';

// Standard Components
import Navbar from '../components/Navbar';
import RotatingLogo from '../components/RotatingLogo';
import AboutAccordion from '../components/AboutAccordion';
import MouseTrail from '../components/MouseTrail';
import SocialFeed from '../components/SocialFeed';
import Slideshow from '../components/Slideshow';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    client.fetch(`*[_type == "event"] | order(date desc)`)
      .then((data) => setEvents(data))
      .catch(console.error);
  }, []);

  const categories = ['all', 'workshop', 'competition', 'social'];
  
  const filteredEvents = events.filter(e => {
    if (filter.toLowerCase() === 'all') return true;
    return e.category?.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="relative w-full min-h-screen text-white overflow-x-hidden selection:bg-[#800000]">
      <MouseTrail />
      <Slideshow />
      <Navbar />
      
      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 bg-black/30">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
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
              <div className="h-[1px] w-20 bg-[#bc9c22] mb-10 mx-auto lg:mx-0"></div>
              <p className="text-zinc-400 text-base max-w-sm mx-auto lg:mx-0 leading-relaxed font-light mb-12">
                The premier software engineering association at MJIIT. Bridging the gap between academic learning and industry excellence.
              </p>
              <Link to="/recruitment" className="inline-block px-10 py-4 bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-[#800000] hover:text-white transition-all duration-300">
                Become a Committee
              </Link>
            </div>
          </div>
        </section>

        <div className="bg-[#0A0A0A]">
            <AboutAccordion />

            {/* EVENTS SECTION */}
            <section className="py-24 px-6 md:px-16 lg:px-24">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                  <div>
                    <h2 className="text-5xl font-black uppercase tracking-tighter italic leading-none">Latest Events</h2>
                    <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] mt-4 font-bold">Filter by Category</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all border ${
                          filter === cat ? 'bg-[#800000] border-[#800000] text-white' : 'border-zinc-800 text-zinc-500 hover:border-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {filteredEvents.map((event) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={event._id}
                        className="group bg-zinc-900/30 border border-zinc-800 hover:border-[#800000] transition-colors duration-500"
                      >
                        <Link to={`/event/${event._id}`}>
                          <div className="aspect-square overflow-hidden border-b border-zinc-800">
                            <img 
                              src={urlFor(event.mainImage).width(600).height(600).url()} 
                              alt={event.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div className="p-6">
                            <span className="text-[#bc9c22] text-[10px] uppercase font-bold tracking-[0.2em]">{event.category}</span>
                            <h3 className="text-xl font-bold mt-2 group-hover:text-[#800000] transition-colors uppercase italic leading-tight">{event.title}</h3>
                            <p className="text-zinc-500 text-[11px] font-bold mt-3 uppercase tracking-widest">{new Date(event.date).toDateString()}</p>
                            
                            {/* KEEPING THE VIEW DETAILS ACTION */}
                            <div className="mt-6 flex items-center text-[10px] font-black uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">
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

            {/* RECRUITMENT TEASER REMOVED FROM HERE */}

            <section className="py-24 px-6 md:px-16 lg:px-24 border-t border-zinc-900">
              <div className="max-w-7xl mx-auto"><SocialFeed /></div>
            </section>
        </div>
      </main>
    </div>
  );
};

export default Home;