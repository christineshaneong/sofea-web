import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import client, { urlFor } from '../sanityClient';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentSession } from '../utils/session';

const Team = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [siteAssets, setSiteAssets] = useState(null);
  const [selectedSession, setSelectedSession] = useState(getCurrentSession());
  const [allSessions, setAllSessions] = useState([]);

  const categories = [
    'All',
    'Project Committee',
    'Propaganda and Student Enlightment',
    'Internal Affairs Division',
    'Finance & Entrepreneur Division',
    'Logistics & Operations Division',
    'Sports & Games Division'
  ];

  const roleOrder = [
    "President", "Vice President I", "Vice President II", "Secretary", "Treasurer", 
    "Vice Secretary I", "Vice Secretary II", "Vice Treasurer", "Project Director", "Project Officer", 
    "Project Manager I", "Project Manager II", "Project Manager III", "Project Manager IV", 
    "EXCO Liaison", "EXCO Marketing", "EXCO Multimedia", "EXCO HR", "EXCO Logistics", 
    "EXCO Sports", "EXCO Entrepreneur"
  ];

  useEffect(() => {
    client.fetch(`*[_type == "siteAssets"][0]`).then(setSiteAssets);
    client.fetch(`*[_type == "teamMember"].year`).then((data) => {
      if (data && data.length > 0) {
        const uniqueSessions = [...new Set(data)].sort((a, b) => b.localeCompare(a));
        setAllSessions(uniqueSessions);
      } else {
        setAllSessions([getCurrentSession()]);
      }
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    client.fetch(`*[_type == "teamMember" && year == "${selectedSession}"]`).then((data) => {
      const sortedData = data.sort((a, b) => {
        const indexA = roleOrder.indexOf(a.role);
        const indexB = roleOrder.indexOf(b.role);
        return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
      });
      setMembers(sortedData);
      setLoading(false);
    });
  }, [selectedSession]);

  const getHeroBackground = () => {
    if (!siteAssets) return '';
    const backgroundMap = {
      'Project Committee': siteAssets.projectHero,
      'Propaganda and Student Enlightment': siteAssets.propagandaHero,
      'Internal Affairs Division': siteAssets.internalHero,
      'Finance & Entrepreneur Division': siteAssets.financeHero,
      'Logistics & Operations Division': siteAssets.logisticsHero,
      'Sports & Games Division': siteAssets.sportsHero,
    };
    const selected = backgroundMap[activeFilter] || siteAssets.teamHero;
    return selected ? urlFor(selected).url() : '';
  };

  const filteredMembers = members.filter((m) => activeFilter === 'All' || m.department === activeFilter);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#800000] overflow-x-hidden">
      <Navbar />
      <main>
        {/* HERO SECTION */}
        <section className="relative h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFilter}
              initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${getHeroBackground()})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black" />
            </motion.div>
          </AnimatePresence>
          
          <div className="relative z-10 text-center px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
              >
                <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.9]">
                  {activeFilter === 'All' ? 'Meet Our Team' : activeFilter}
                </h1>
                <p className="mt-4 text-[#bc9c22] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">
                  {activeFilter === 'All' ? 'The Crew Behind SOFEA' : `Official Division • ${selectedSession}`}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* FILTER BAR */}
        <nav className="sticky top-[80px] z-40 bg-black/95 backdrop-blur-md py-4 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 flex flex-row items-center gap-4">
            <div className="flex-shrink-0">
              <select 
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 text-[#bc9c22] text-[10px] font-black uppercase py-1.5 px-3 rounded"
              >
                {allSessions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="w-[1px] h-6 bg-white/10" />
            <div className="flex flex-row gap-2 overflow-x-auto custom-mini-scroll py-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                    activeFilter === cat ? 'bg-[#800000] text-white' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* TEAM GRID */}
        <section className="max-w-[1500px] mx-auto px-6 py-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10">
            {filteredMembers.map((member) => (
              <div key={member._id} className="flip-card h-[380px] md:h-[480px]">
                <div className="flip-card-inner">
                  {/* FRONT */}
                  <div className="flip-card-front bg-zinc-950 border border-white/5 overflow-hidden flex flex-col shadow-2xl">
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-[#bc9c22] text-black text-[7px] font-black uppercase px-2 py-0.5 rounded-sm">
                        {member.department === "Management" ? "MANAGEMENT" : (member.department?.split(' ')[0] || "SOFEA")}
                      </span>
                    </div>
                    <div className="h-3/4 overflow-hidden relative">
                      {member.photo && <img src={urlFor(member.photo).url()} alt={member.name} className="w-full h-full object-cover" />}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                    </div>
                    <div className="p-5 flex flex-col justify-end flex-grow border-t border-white/5">
                      <h3 className="text-sm md:text-base font-black uppercase italic leading-none">{member.name}</h3>
                      <p className="text-[#bc9c22] text-[9px] md:text-[10px] font-black uppercase mt-2 tracking-widest">{member.role}</p>
                    </div>
                  </div>

                  {/* BACK - TACTICAL INTEL */}
                  <div className="flip-card-back p-8 flex flex-col justify-center text-left">
                    <div className="card-back-inner">
                      <div className="w-8 h-1 bg-[#bc9c22] mb-6" />
                      <h4 className="text-lg font-black uppercase italic mb-3 tracking-tighter text-white">INTEL</h4>
                      <p className="text-[10px] md:text-xs text-white/90 leading-relaxed font-medium">
                        {member.bio || `A vital component of the ${member.department} division. Contributing to the growth of MJIIT's software engineering community.`}
                      </p>
                      <div className="mt-10 pt-4 border-t border-white/10">
                        <p className="text-[8px] font-black uppercase tracking-widest text-[#bc9c22]">DIVISION CODE</p>
                        <p className="text-[9px] font-bold uppercase text-white/50">{member.department}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Team;