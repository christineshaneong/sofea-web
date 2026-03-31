import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { client, urlFor } from '../sanityClient';

const Team = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroImage, setHeroImage] = useState(null); // Added for Sanity Hero

  const categories = ['All', 'Management', 'Projects', 'EXCOS'];

  const roleOrder = [
    "President", "Vice President I", "Vice President II", "Secretary", "Treasurer", 
    "Vice Secretary I", "Vice Secretary II", "Vice Treasurer", "Project Director", 
    "Project Manager I", "Project Manager II", "Project Manager III", "Project Manager IV", 
    "EXCO Liaison", "EXCO Marketing", "EXCO Multimedia", "EXCO HR", "EXCO Logistics", 
    "EXCO Sports", "EXCO Entrepreneur"
  ];

  useEffect(() => {
    // 1. Fetch Hero Image from Site Visuals
    client.fetch(`*[_type == "siteAssets"][0].teamHero`).then((data) => {
      if (data) setHeroImage(urlFor(data).url());
    });

    // 2. Fetch Team Members
    client.fetch(`*[_type == "teamMember"]`).then((data) => {
      const sortedData = data.sort((a, b) => {
        const indexA = roleOrder.indexOf(a.role);
        const indexB = roleOrder.indexOf(b.role);
        const finalA = indexA === -1 ? 99 : indexA;
        const finalB = indexB === -1 ? 99 : indexB;
        return finalA - finalB;
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
    <div className="bg-black min-h-screen text-white font-sans">
      <Navbar />

      <main>
        {/* HERO SECTION - Updated to use Sanity Hero */}
        <section 
          className="relative h-[50vh] md:h-[65vh] flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[#1a0000]"
          style={{ backgroundImage: heroImage ? `url(${heroImage})` : 'none' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
          
          <div className="relative z-10 text-center px-6">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">
              Meet Our Team
            </h1>
            <p className="mt-4 text-[#bc9c22] font-bold tracking-[0.4em] uppercase text-xs md:text-sm">
              The Crew Behind SOFEA
            </p>
          </div>
        </section>

        {/* FILTER BAR */}
        <nav className="sticky top-0 z-40 bg-black/90 backdrop-blur-md py-6 border-b border-white/5">
          <div className="max-w-7xl mx-auto flex justify-center gap-3 px-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === cat 
                    ? 'bg-[#800000] text-white scale-105 shadow-[0_0_20px_rgba(128,0,0,0.4)]' 
                    : 'bg-zinc-900 text-zinc-500 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>

        {/* TEAM GRID */}
        <section className="max-w-[1600px] mx-auto px-6 py-16">
          {loading ? (
            <div className="text-center py-20">
               <div className="inline-block w-8 h-8 border-4 border-[#800000] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {filteredMembers.map((member) => (
                <div key={member._id} className="bg-zinc-900/40 rounded-xl overflow-hidden border border-white/5 flex flex-col h-full hover:border-[#800000]/50 hover:bg-zinc-900/80 transition-all duration-500 group">
                  <div className="aspect-[4/5] overflow-hidden bg-zinc-800">
                    {member.photo ? (
                      <img 
                        src={urlFor(member.photo).width(500).url()} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-700 text-[10px] uppercase font-bold">No Portrait</div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-[13px] md:text-[14px] font-bold tracking-tight text-white leading-tight uppercase group-hover:text-[#bc9c22] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[#bc9c22] text-[9px] font-black uppercase mt-1 tracking-widest">
                      {member.role}
                    </p>
                    <div className="h-[1px] bg-white/5 my-4 mt-auto transition-all group-hover:bg-[#800000]/40 group-hover:w-full w-8"></div>
                    <p className="text-zinc-600 text-[8px] font-bold uppercase tracking-[0.2em]">
                      {member.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Team;