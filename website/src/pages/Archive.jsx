import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import client from '../sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import Navbar from '../components/Navbar';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

// Standard Order (25/26 and default)
const STANDARD_HIERARCHY = [
  "Club Advisor", "President", "Vice President I", "Vice President II", "Secretary", "Treasurer", 
  "Vice Secretary I", "Vice Secretary II", "Vice Treasurer", "Project Director", "Project Officer", 
  "Project Manager I", "Project Manager II", "Project Manager III", "Project Manager IV", 
  "EXCO Liaison", "EXCO Marketing", "EXCO Multimedia", "EXCO HR", "EXCO Logistics", 
  "EXCO Sports", "EXCO Entrepreneur"
];

// Specific 23/24 Order
const SESSION_2324_HIERARCHY = [
  "Club Coordinator", "Club Advisor", "President", "Deputy President I", "Deputy President II", 
  "Secretary", "Treasurer", "Deputy Secretary", "Deputy Treasurer", "Exco Multimedia", 
  "Multimedia Expert", "Exco Marketing", "Marketing Expert", "Exco Sports", "Sports Expert", 
  "Exco Business", "Business Expert", "Exco Logistics", "Logistics Expert"
];

const Archive = () => {
  const [view, setView] = useState('committee'); 
  const [selectedYear, setSelectedYear] = useState('');
  const [years, setYears] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYears = async () => {
      const teamYears = await client.fetch(`*[_type == "teamMember"].year`);
      const eventYears = await client.fetch(`*[_type == "event"].year`);
      const allUniqueYears = [...new Set([...teamYears, ...eventYears])].filter(Boolean).sort((a, b) => b.localeCompare(a));
      setYears(allUniqueYears);
      if (allUniqueYears.length > 0) setSelectedYear(allUniqueYears[0]);
    };
    fetchYears();
  }, []);

  useEffect(() => {
    if (!selectedYear) return;
    setLoading(true);
    const query = view === 'committee' 
      ? `*[_type == "teamMember" && year == "${selectedYear}"]`
      : `*[_type == "event" && year == "${selectedYear}"] | order(date desc)`; 

    client.fetch(query).then((res) => {
      if (view === 'committee') {
        const currentOrder = selectedYear === "23/24" ? SESSION_2324_HIERARCHY : STANDARD_HIERARCHY;

        const sortedCommittee = [...res].sort((a, b) => {
          // Normalize strings to handle "Vice" vs "Deputy" and Case sensitivity
          const normalize = (str) => 
            (str || "")
              .toLowerCase()
              .trim()
              .replace(/\s+/g, ' ')
              .replace("vice president", "deputy president")
              .replace("vice secretary", "deputy secretary")
              .replace("vice treasurer", "deputy treasurer");

          const roleA = normalize(a.role);
          const roleB = normalize(b.role);

          const indexA = currentOrder.findIndex(r => normalize(r) === roleA);
          const indexB = currentOrder.findIndex(r => normalize(r) === roleB);

          const rankA = indexA === -1 ? 999 : indexA;
          const rankB = indexB === -1 ? 999 : indexB;

          return rankA - rankB;
        });
        setData(sortedCommittee);
      } else {
        setData(res);
      }
      setLoading(false);
    });
  }, [view, selectedYear]);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#800000] overflow-x-hidden">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative h-[40vh] flex items-center justify-center bg-zinc-950">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="relative z-10 text-center px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-none"
            >
              The Archive
            </motion.h1>
            <p className="mt-4 text-[#bc9c22] font-black tracking-[0.6em] uppercase text-[10px]">
              History of SOFEA
            </p>
          </div>
        </section>

        {/* STICKY BAR */}
        <nav className="sticky top-[70px] z-40 bg-black/95 backdrop-blur-md py-6 border-b border-white/5 shadow-2xl">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex bg-zinc-900/80 p-1.5 rounded-full border border-white/10 w-full md:w-auto">
                {['committee', 'events'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setView(type)}
                    className={`flex-1 md:flex-none px-12 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                      view === type ? 'bg-[#800000] text-white shadow-lg' : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-auto">
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full md:w-auto appearance-none bg-[#800000]/10 border border-[#800000]/30 text-[#bc9c22] text-[10px] font-black uppercase tracking-widest py-2.5 px-10 rounded-lg cursor-pointer hover:bg-[#800000]/20 transition-all focus:outline-none"
                >
                  {years.map(y => (
                    <option key={y} value={y} className="bg-zinc-900 text-white">{y}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#bc9c22]">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

            </div>
          </div>
        </nav>

        {/* GRID SECTION */}
        <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-16">
          {loading ? (
            <div className="flex justify-center py-20">
               <div className="w-10 h-10 border-2 border-[#800000] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
              <AnimatePresence mode="popLayout">
                {data.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item._id} 
                    className="group bg-zinc-900/30 border border-white/5 flex flex-col h-full hover:border-[#800000]/50 transition-all duration-500 rounded-sm overflow-hidden"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-zinc-800 relative">
                      {(view === 'committee' ? item.photo : item.mainImage) ? (
                        <img 
                          src={urlFor(view === 'committee' ? item.photo : item.mainImage).width(600).url()} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          alt={item.name || item.title}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-700 text-[10px] uppercase font-black tracking-tighter">No Image</div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-[13px] font-black tracking-tight text-white leading-tight uppercase group-hover:text-[#bc9c22] transition-colors line-clamp-2">
                        {item.name || item.title}
                      </h3>
                      <p className="text-[#bc9c22] text-[9px] font-black uppercase mt-1 tracking-widest leading-none">
                        {view === 'committee' ? item.role : item.category}
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

export default Archive;