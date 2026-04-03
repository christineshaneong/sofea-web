import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client, { urlFor } from '../sanityClient';
import { motion } from 'framer-motion';

const Recruitment = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == "siteAssets"][0].recruitmentHero`).then((data) => {
      if (data) setHeroImage(urlFor(data).url());
    });

    client.fetch(`*[_type == "recruitment"] | order(_createdAt asc)`).then((data) => {
      setPositions(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#800000] overflow-x-hidden">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative h-[55vh] md:h-[80vh] w-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
            style={{ backgroundImage: heroImage ? `url(${heroImage})` : 'none' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
          </div>
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#bc9c22] text-[9px] md:text-xs font-black uppercase tracking-[0.5em] mb-3"
            >
              Opportunities
            </motion.h2>
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter uppercase leading-[0.9]"
            >
              Join the <br /> <span className="italic">Board.</span>
            </motion.h1>
          </div>
        </section>

        {/* POSITIONS SECTION */}
        <section className="relative z-20 bg-black max-w-6xl mx-auto px-6 pb-32">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
            <h3 className="text-[#bc9c22] text-[9px] font-black uppercase tracking-[0.3em]">
              Available Positions ({positions.length})
            </h3>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#800000] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="flex flex-col">
              {positions.map((job) => (
                <div 
                  key={job._id} 
                  className="group flex flex-col md:flex-row items-start md:items-center justify-between py-8 md:py-16 border-b border-white/5 gap-6"
                >
                  {/* Reduced Mobile Font: text-2xl vs text-7xl desktop */}
                  <h3 className="text-2xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-tight group-hover:text-[#bc9c22] transition-colors duration-500">
                    {job.title}
                  </h3>

                  {/* Refined Button: Narrower on mobile */}
                  <div className="w-full md:w-auto">
                    <a 
                      href={job.applicationLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="
                        inline-flex items-center justify-center gap-3
                        w-full md:w-auto px-6 py-4 md:px-10 md:py-5 
                        bg-[#800000] text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-[12px]
                        transition-all duration-300
                        hover:bg-white hover:text-black
                        shadow-[0_0_20px_rgba(128,0,0,0.2)]
                      "
                    >
                      <span>Apply Now</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
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

export default Recruitment;