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

/**
 * MARQUEE COMPONENT
 * Handles the infinite scrolling of partner logos
 */
const Marquee = ({ images, speed = 25, reverse = false }) => {
  if (!images || images.length === 0) return null;

  // Triple the array to ensure a seamless infinite loop without gaps
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className="flex overflow-hidden relative w-full group">
      <motion.div
        className="flex whitespace-nowrap gap-16 md:gap-32 items-center"
        animate={{
          x: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"],
        }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
      >
        {duplicatedImages.map((logo, i) => (
          <img
            key={i}
            src={urlFor(logo).url()}
            className="h-8 md:h-12 w-auto object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
            alt="Partner Logo"
          />
        ))}
      </motion.div>
      
      {/* Visual edge fades */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10" />
    </div>
  );
};

const ModernReveal = ({ lines }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: "110%" },
    visible: {
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col items-center lg:items-start">
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden h-fit w-fit pr-4 -mr-4"> 
          <motion.span 
            variants={item} 
            className="block text-[11vw] md:text-[100px] font-black uppercase tracking-tighter leading-[0.85] italic py-1"
          >
            {line === "UTM KL" ? (
              <>UTM <span className="text-[#800000]">KL</span></>
            ) : line}
          </motion.span>
        </div>
      ))}
      <motion.div 
        initial={{ width: 0 }} 
        animate={{ width: 80 }} 
        transition={{ delay: 0.6, duration: 1 }} 
        className="h-[2px] bg-[#bc9c22] mt-6" 
      />
    </motion.div>
  );
};

const Home = () => {
  const [events, setEvents] = useState([]);
  const [siteAssets, setSiteAssets] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startISO = startOfToday.toISOString();

    const query = `{
      "events": *[_type == "event" && date >= "${startISO}"] | order(date asc),
      "assets": *[_type == "siteAssets"][0]
    }`;

    client.fetch(query).then((data) => {
      setEvents(data.events);
      setSiteAssets(data.assets);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const categories = ['all', 'workshop', 'competition', 'social'];
  const filteredEvents = events.filter(e => filter.toLowerCase() === 'all' || e.category?.toLowerCase() === filter.toLowerCase());

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
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100">
                <RotatingLogo />
              </motion.div>
            </div>
            <div className="text-center lg:text-left order-2 -mt-10 md:mt-0">
              <ModernReveal lines={["SOF-EA", "MJIIT", "UTM KL"]} />
              <p className="text-zinc-400 mt-10 text-base max-w-sm mx-auto lg:mx-0 leading-relaxed font-light mb-12">
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

          {/* ROADMAP SECTION */}
          <section className="pt-24 pb-12 px-6 md:px-16 lg:px-24 border-t border-white/5">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-4">Annual Roadmap</h2>
              {siteAssets?.roadmapTitle && (
                <p className="text-[#bc9c22] uppercase tracking-[0.4em] text-xs md:text-sm font-black mb-10">
                  {siteAssets.roadmapTitle}
                </p>
              )}
              <div className="relative rounded-xl border border-white/10 overflow-hidden bg-zinc-900/20 p-3 md:p-6 shadow-2xl">
                {siteAssets?.timelineImage ? (
                  <img src={urlFor(siteAssets.timelineImage).url()} alt="Roadmap" className="w-full h-auto opacity-90 rounded-lg" />
                ) : (
                  <div className="h-48 flex items-center justify-center text-xs text-zinc-700 uppercase font-black tracking-widest border border-dashed border-white/10">
                    Graphic Pending Upload
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* EVENTS SECTION */}
          <section className="py-24 px-6 md:px-16 lg:px-24">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic leading-none text-white">Upcoming Events</h2>
                  <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs mt-4 font-bold">What's Next</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 text-xs uppercase tracking-widest font-bold transition-all border ${filter === cat ? 'bg-[#800000] border-[#800000] text-white' : 'border-zinc-800 text-zinc-500 hover:border-white'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              {loading ? (
                <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-[#800000] border-t-transparent rounded-full animate-spin" /></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event) => (
                    <motion.div layout key={event._id} className="group bg-zinc-900/30 border border-zinc-800 rounded-sm overflow-hidden">
                      <Link to={`/event/${event._id}`}>
                        <div className="aspect-square overflow-hidden border-b border-zinc-800">
                          {event.mainImage && <img src={urlFor(event.mainImage).width(600).url()} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                        </div>
                        <div className="p-6">
                          <span className="text-[#bc9c22] text-xs uppercase font-bold tracking-[0.2em]">{event.category}</span>
                          <h3 className="text-2xl font-black mt-2 group-hover:text-[#800000] transition-colors uppercase italic leading-tight line-clamp-2">{event.title}</h3>
                          <p className="text-zinc-500 text-xs font-bold mt-3 uppercase tracking-widest">{new Date(event.date).toDateString()}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* PARTNERS SECTION */}
          <section className="py-24 px-6 md:px-16 lg:px-24 bg-black">
            <div className="max-w-7xl mx-auto space-y-24">
              
              {/* Strategic Partners Row */}
              <div className="relative text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-6 z-20">
                  <span className="text-[#bc9c22] text-[10px] md:text-xs font-black uppercase tracking-[0.6em]">Strategic Partners</span>
                </div>
                <div className="border border-white/5 pt-16 pb-12 rounded-xl overflow-hidden">
                  {siteAssets?.sponsors?.length > 0 && (
                    <Marquee images={siteAssets.sponsors} speed={25} />
                  )}
                </div>
              </div>

              {/* Official Collaborations Row */}
              <div className="relative text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-6 z-20">
                  <span className="text-zinc-500 text-[10px] md:text-xs font-black uppercase tracking-[0.6em]">Official Collaborations</span>
                </div>
                <div className="border border-white/5 pt-16 pb-12 rounded-xl overflow-hidden">
                  {siteAssets?.collaborators?.length > 0 && (
                    <Marquee images={siteAssets.collaborators} speed={35} reverse={true} />
                  )}
                </div>
              </div>

            </div>
          </section>

          <section className="py-24 px-6 md:px-16 lg:px-24 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto"><SocialFeed /></div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;