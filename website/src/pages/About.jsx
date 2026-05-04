import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Target, BrainCircuit } from 'lucide-react';
import Navbar from '../components/Navbar';
import TechBackground from '../components/TechBackground';
import client, { urlFor } from '../sanityClient';

const About = () => {
  const [data, setData] = useState({
    hero: null,
    missionVideoUrl: null,
    recapVideoUrl: null,
    recapText: "",
    founderImage: null,
    founderText: ""
  });

  useEffect(() => {
    const query = `*[_type == "siteAssets"][0]{
      aboutHero, 
      "videoUrl": missionVideoFile.asset->url, 
      "recapUrl": recapVideoFile.asset->url,
      recapText,
      founderImage, 
      founderText
    }`;

    client.fetch(query).then((res) => {
      if (res) {
        setData({
          hero: res.aboutHero ? urlFor(res.aboutHero).url() : null,
          missionVideoUrl: res.videoUrl || null,
          recapVideoUrl: res.recapUrl || null,
          recapText: res.recapText || "Celebrating a year of technical innovation and community growth at MJIIT.",
          founderImage: res.founderImage ? urlFor(res.founderImage).url() : null,
          founderText: res.founderText || "Founded by Dr. Halinawati, SOFEA was established to foster a community of excellence in software engineering at MJIIT."
        });
      }
    }).catch(err => console.error("Sanity Error:", err));
  }, []);

  const values = [
    { title: "Share success", icon: Award, desc: "We grow together by sharing knowledge and celebrating every student win." },
    { title: "Make it happen", icon: Target, desc: "Turn academic theories into industry-ready projects through execution." },
    { title: "Challenge yourself", icon: BrainCircuit, desc: "Pushing the boundaries of what MJIIT software engineers can achieve." }
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#bc9c22] overflow-x-hidden font-sans">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {data.hero && (
            <img src={data.hero} className="w-full h-full object-cover opacity-30 grayscale" alt="About SOFEA" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-[12vw] md:text-9xl font-black uppercase tracking-tighter leading-none">
            About <span className="text-[#800000] drop-shadow-[0_4px_15px_rgba(128,0,0,0.8)]">SOFEA</span>
          </h1>
          <p className="mt-6 text-zinc-400 max-w-2xl mx-auto text-sm md:text-xl font-light px-4">
            The <span className="text-white font-bold bg-[#bc9c22]/30 px-2 italic">largest student-run computing club at MJIIT</span>.
          </p>
        </div>
      </section>

      <div className="relative">
        <TechBackground />

        {/* 2. OUR MISSION SECTION */}
        <section className="relative z-10 py-24 md:py-32 px-6 md:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative flex justify-center">
            <div className="w-full max-w-[320px] md:max-w-[380px] aspect-[9/16] bg-zinc-900 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative flex items-center justify-center">
              {data.missionVideoUrl ? (
                <video
                  key={data.missionVideoUrl}
                  src={data.missionVideoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900">
                  <div className="w-12 h-12 border-2 border-dashed border-zinc-700 rounded-full animate-spin mb-4" />
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Awaiting MP4 File...</p>
                </div>
              )}
            </div>
            <div className="absolute -top-4 -right-2 bg-[#800000] text-white font-black px-3 py-1 rotate-6 text-[10px] uppercase tracking-widest shadow-lg">
              EST. 2023
            </div>
          </div>

          <div className="text-center lg:text-left mt-12 lg:mt-0">
            <h2 className="text-[#bc9c22] text-4xl md:text-7xl font-black uppercase mb-6 tracking-tighter">Our Mission</h2>
            <div className="space-y-6 text-zinc-300 text-sm md:text-xl leading-relaxed px-4 md:px-0">
              <p>We strive to <span className="text-white font-bold border-b border-[#bc9c22]">upskill students</span> through high-quality events, workshops, and hackathons.</p>
              <p>We aim to make coding enjoyable and accessible to all.</p>
            </div>
          </div>
        </section>

        {/* 3. VALUES SECTION */}
        <section className="relative z-10 py-16 bg-white/[0.02] backdrop-blur-md border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-7xl font-black uppercase mb-12 text-center tracking-tighter">SOFEA's Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {values.map((v, i) => (
                <div key={i} className="text-center">
                  <div className="flex justify-center mb-4 text-[#bc9c22]"><v.icon size={48} /></div>
                  <h4 className="text-xl font-black uppercase mb-2">{v.title}</h4>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest px-8">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FOUNDER SECTION */}
        <section className="relative z-10 py-24 px-6 md:px-20 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/5">
            <div className="w-56 md:w-1/4 aspect-[3/4] max-h-[320px] md:max-h-[380px] relative flex-shrink-0">
              <div className="absolute inset-0 border-[3px] md:border-[4px] border-[#800000] rounded-[2rem] z-20 pointer-events-none shadow-[0_0_30px_rgba(128,0,0,0.3)]"></div>
              {data.founderImage && (
                <img 
                  src={data.founderImage} 
                  className="w-full h-full object-cover rounded-[2rem]" 
                  alt="Dr. Halinawati" 
                />
              )}
            </div>
            <div className="flex flex-col justify-center text-center md:text-left">
              <p className="text-[#bc9c22] text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4">The Visionary</p>
              <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 md:mb-8 leading-none">
                Founded by <br />
                <span className="text-[#800000] drop-shadow-[0_2px_10px_rgba(128,0,0,0.5)]">Dr. Halinawati</span>
              </h3>
              <p className="text-zinc-300 text-sm md:text-xl font-light leading-relaxed italic max-w-2xl mx-auto md:mx-0">
                "{data.founderText}"
              </p>
            </div>
          </div>
        </section>

        {/* 5. 24/25 RECAP SECTION - REORDERED */}
        <section className="relative z-10 py-24 border-t border-zinc-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header moved to the very top */}
            <div className="mb-12 text-center lg:text-left">
              <h2 className="text-[#800000] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4">Season Archive</h2>
              <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none">
                24/25 <span className="text-[#bc9c22] italic">Recap</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* VIDEO COLUMN */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative w-full aspect-video bg-zinc-900 border border-white/5 shadow-2xl rounded-2xl md:rounded-[2rem] overflow-hidden"
              >
                {data.recapVideoUrl ? (
                  <video
                    src={data.recapVideoUrl}
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-zinc-600 text-[10px] uppercase tracking-widest italic">Video Loading...</p>
                  </div>
                )}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#800000] z-20 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#bc9c22] z-20 pointer-events-none opacity-50" />
              </motion.div>

              {/* TEXT COLUMN */}
              <div className="flex flex-col text-center lg:text-left">
                <div className="text-zinc-400 text-sm md:text-lg font-light leading-relaxed space-y-4 max-w-lg mx-auto lg:mx-0">
                  <p className="whitespace-pre-line">{data.recapText}</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;