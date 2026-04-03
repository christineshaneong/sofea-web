import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client, { urlFor } from '../sanityClient';
import { motion, AnimatePresence } from 'framer-motion';

const Team = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroImage, setHeroImage] = useState(null);

  const categories = ['All', 'Management', 'Projects', 'EXCOS'];

  const roleOrder = [
    "President", "Vice President I", "Vice President II", "Secretary", "Treasurer", 
    "Vice Secretary I", "Vice Secretary II", "Vice Treasurer", "Project Director", 
    "Project Manager I", "Project Manager II", "Project Manager III", "Project Manager IV", 
    "EXCO Liaison", "EXCO Marketing", "EXCO Multimedia", "EXCO HR", "EXCO Logistics", 
    "EXCO Sports", "EXCO Entrepreneur"
  ];

  useEffect(() => {
    // 1. Fetch Hero Image
    client.fetch(`*[_type == "siteAssets"][0].teamHero`).then((data) => {
      if (data) setHeroImage(urlFor(data).url());
    });

    // 2. Fetch Team Members
    client.fetch(`*[_type == "teamMember"]`).then((data) => {
      const sortedData = data.sort((a, b) => {
        const indexA = roleOrder.indexOf(a.role);
        const indexB = roleOrder.indexOf(b.role);
        return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
      });
      setMembers(sortedData);
      setLoading(false);
    });
  }, []);

  const filteredMembers = members.filter((m) => {
    if (activeFilter === 'All') return true;
    const memberDept = (m.department || "").toLowerCase();
    const currentFilter = activeFilter.toLowerCase();
    if (currentFilter === 'excos') return memberDept.includes('exco');
    return memberDept.includes(currentFilter.replace('s', '')); 
  });

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#800000] overflow-x-hidden">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative h-[50vh] md:h-[65vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
            style={{ 
              backgroundImage: heroImage ? `url(${heroImage})` : 'none',
              opacity: heroImage ? 0.6 : 0.2
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
          </div>
          
          <div className="relative z-10 text-center px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-9xl font-black uppercase tracking-tighter text-white drop-shadow-2xl italic leading-[0.9]"
            >
              Meet Our Team
            </motion.h1>
            <p className="mt-4 text-[#bc9c22] font-black tracking-[0.4em] md:tracking-[0.6em] uppercase text-[10px] md:text-xs">
              The Crew Behind SOFEA
            </p>
          </div>
        </section>

        {/* FILTER BAR - Mobile Optimized (Scrollable) */}
        <nav className="sticky top-[80px] z-40 bg-black/90 backdrop-blur-md py-4 border-b border-white/5 shadow-xl">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-start md:justify-center gap-2 overflow-x-auto pb-3 md:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`whitespace-nowrap px-6 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    activeFilter === cat 
                      ? 'bg-[#800000] text-white scale-105 shadow-[0_0_15px_rgba(128,0,0,0.5)]' 
                      : 'bg-zinc-900/40 text-zinc-500 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* TEAM GRID - MAINTAINING COLOR PICS */}
        <section className="max-w-[1500px] mx-auto px-4 md:px-12 py-12 md:py-20">
          {loading ? (
            <div className="flex justify-center py-24">
               <div className="w-10 h-10 border-2 border-[#800000] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredMembers.map((member) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={member._id} 
                    className="group bg-zinc-900/30 border border-white/5 flex flex-col h-full hover:border-[#800000]/50 transition-all duration-500 rounded-sm overflow-hidden"
                  >
                    {/* Portrait - Full Color Maintained */}
                    <div className="aspect-[3/4] overflow-hidden bg-zinc-800 relative">
                      {member.photo ? (
                        <img 
                          src={urlFor(member.photo).width(600).url()} 
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" // NO GRAYSCALE
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-700 text-[10px] uppercase font-black tracking-tighter">No Portrait</div>
                      )}
                      
                      {/* Mobile gradient overlay for text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 md:hidden"></div>
                    </div>

                    {/* Member Details */}
                    <div className="p-4 md:p-6 flex flex-col flex-grow">
                      <h3 className="text-[12px] md:text-[15px] font-black tracking-tight text-white leading-tight uppercase group-hover:text-[#bc9c22] transition-colors line-clamp-2">
                        {member.name}
                      </h3>
                      <p className="text-[#bc9c22] text-[9px] md:text-[10px] font-black uppercase mt-1 tracking-widest leading-none">
                        {member.role}
                      </p>
                      
                      {/* Divider */}
                      <div className="h-[1px] bg-white/10 my-4 md:my-5 mt-auto transition-all group-hover:bg-[#800000]/70 group-hover:w-full w-8"></div>
                      
                      <p className="text-zinc-500 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] leading-none">
                        {member.department || m.category}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Team;