import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import client, { urlFor } from '../sanityClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Recruitment = () => {
  const [recruitData, setRecruitData] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `{
      "assets": *[_type == "siteAssets"][0],
      "recruit": *[_type == "recruitment"][0]
    }`;

    client.fetch(query).then((data) => {
      if (data.assets?.recruitmentHero) {
        setHeroImage(urlFor(data.assets.recruitmentHero).url());
      }
      setRecruitData(data.recruit);
      setLoading(false);
    }).catch(err => {
      console.error("Fetch Error:", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-zinc-950 min-h-screen text-white font-sans flex flex-col selection:bg-[#800000]">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {heroImage && (
              <img 
                src={heroImage} 
                className="w-full h-full object-cover opacity-80 contrast-110"
                alt="Join SOFEA"
              />
            )}
            <div className="absolute inset-0 bg-black/50" />
            {/* Added a stronger bottom gradient for mobile readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-5xl flex flex-col items-center pt-20">
            <motion.h2 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }} // Slightly tighter for mobile screens
              className="text-[#bc9c22] font-bold uppercase text-[9px] md:text-xs mb-6 drop-shadow-md"
            >
              Career & Leadership
            </motion.h2>

            <motion.h1 
              className="text-5xl sm:text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8 drop-shadow-2xl"
            >
              Shape the <br/> <span className="text-white">Future.</span>
            </motion.h1>

            <p className="text-zinc-400 uppercase tracking-[0.15em] md:tracking-[0.25em] text-[10px] md:text-xs max-w-sm md:max-w-xl leading-relaxed mb-12 opacity-80 px-4">
              We are looking for driven individuals to lead MJIIT's software engineering community. Join the SOFEA Executive Board.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full flex justify-center pb-10 md:pb-0" // Extra padding for mobile scroll
            >
              {recruitData?.isLive ? (
                <a 
                  href={recruitData?.applicationLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 md:px-12 py-4 md:py-5 bg-[#800000] text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-white hover:text-black shadow-[0_0_40px_rgba(128,0,0,0.3)] block text-center"
                >
                    <span className="relative z-10">Apply as Committee Now</span>
                </a>
              ) : (
                <div className="px-10 py-4 border border-white/10 text-zinc-500 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] rounded-full cursor-not-allowed">
                  Recruitment Currently Closed
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* QUOTE SECTION */}
        <section className="py-24 md:py-32 px-6 bg-zinc-950">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-10 h-[1px] bg-[#800000] mx-auto mb-10"></div>
            <h3 className="text-xl md:text-4xl font-light uppercase tracking-tighter leading-snug text-zinc-300 px-2">
              "Being part of the board isn't just a title—it's about <span className="text-white font-bold">impact</span>, <span className="text-[#bc9c22] font-bold">growth</span>, and building a legacy for MJIIT."
            </h3>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Recruitment;