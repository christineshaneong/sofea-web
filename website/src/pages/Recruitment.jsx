import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client, { urlFor } from '../sanityClient';

const Recruitment = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroImage, setHeroImage] = useState(null); // Added for Sanity Hero

  useEffect(() => {
    // 1. Fetch Hero Image from Site Visuals
    client.fetch(`*[_type == "siteAssets"][0].recruitmentHero`).then((data) => {
      if (data) setHeroImage(urlFor(data).url());
    });

    // 2. Fetch Open Positions
    client.fetch(`*[_type == "recruitment"] | order(_createdAt asc)`).then((data) => {
      setPositions(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <Navbar />

      <main>
        {/* HERO SECTION - Updated to use Sanity Hero */}
        <section className="relative h-[65vh] md:h-[80vh] w-full overflow-hidden bg-[#1a0000]">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: heroImage ? `url(${heroImage})` : 'none' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
          </div>
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-[#bc9c22] text-[10px] md:text-xs font-bold uppercase tracking-[0.6em] mb-4 drop-shadow-lg">
              Opportunities
            </h2>
            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.8] drop-shadow-2xl">
              Join the <br /> <span className="italic">Board.</span>
            </h1>
          </div>
        </section>

        {/* POSITIONS SECTION */}
        <section className="relative z-20 bg-black max-w-5xl mx-auto px-6 pb-32">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
            <h3 className="text-[#bc9c22] text-[10px] font-black uppercase tracking-widest">
              Available Positions ({positions.length})
            </h3>
            <span className="text-zinc-600 text-[9px] uppercase font-bold tracking-widest opacity-60">
              Select a role to apply
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#800000] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="flex flex-col">
              {positions.map((job) => (
                <a 
                  key={job._id} 
                  href={job.applicationLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="group flex items-center justify-between py-10 md:py-14 border-b border-white/5 transition-all duration-500 hover:bg-zinc-900/20"
                >
                  <h3 className="text-3xl md:text-6xl font-bold uppercase tracking-tighter group-hover:text-[#bc9c22] group-hover:translate-x-4 transition-all duration-500">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-6 pr-4">
                    <span className="hidden lg:block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-white transition-colors">
                        Apply Now
                    </span>
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#800000] group-hover:border-[#800000] group-hover:rotate-45 transition-all duration-500">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Recruitment;