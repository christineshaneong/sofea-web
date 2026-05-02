import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Target, BrainCircuit } from 'lucide-react';
import ReactPlayer from 'react-player'; 
import Navbar from '../components/Navbar';
import TechBackground from '../components/TechBackground';
import client, { urlFor } from '../sanityClient';

const About = () => {
  const [data, setData] = useState({
    hero: null,
    missionVideoUrl: null,
    founderImage: null,
    founderText: ""
  });

  useEffect(() => {
    const query = `*[_type == "siteAssets"][0]{
      aboutHero, 
      missionVideoUrl, 
      founderImage, 
      founderText
    }`;

    client.fetch(query).then((res) => {
      if (res) {
        setData({
          hero: res.aboutHero ? urlFor(res.aboutHero).url() : null,
          missionVideoUrl: res.missionVideoUrl || null,
          founderImage: res.founderImage ? urlFor(res.founderImage).url() : null,
          founderText: res.founderText || "Founded by Dr. Halinawati, SOFEA was established to foster a community of excellence in software engineering at MJIIT."
        });
      }
    });
  }, []);

  const values = [
    { title: "Share success", icon: Award, desc: "We grow together by sharing knowledge and celebrating every student win." },
    { title: "Make it happen", icon: Target, desc: "Turn academic theories into industry-ready projects through execution." },
    { title: "Challenge yourself", icon: BrainCircuit, desc: "Pushing the boundaries of what MJIIT software engineers can achieve." }
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#bc9c22] overflow-x-hidden">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {data.hero && (
            <img 
              src={data.hero} 
              className="w-full h-full object-cover opacity-30 grayscale"
              alt="About SOFEA"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <h1 className="text-[12vw] md:text-9xl font-black uppercase tracking-tighter leading-none">
            About <span className="text-[#800000] drop-shadow-[0_4px_15px_rgba(128,0,0,0.8)]">SOFEA</span>
          </h1>
          <p className="mt-6 text-zinc-400 max-w-2xl mx-auto text-sm md:text-xl font-light leading-relaxed px-4">
            The <span className="text-white font-bold bg-[#bc9c22]/30 px-2 italic">largest student-run computing club at MJIIT</span>.
          </p>
        </div>
      </section>

      <div className="relative">
        <TechBackground />

        {/* 2. OUR MISSION SECTION */}
        <section className="relative z-10 py-24 md:py-32 px-6 md:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative flex justify-center order-1">
            <div className="w-full max-w-[380px] aspect-[9/16] bg-zinc-900 rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              {data.missionVideoUrl ? (
                <div className="w-full h-full relative">
                  <ReactPlayer
                    url={data.missionVideoUrl}
                    width="100%"
                    height="100%"
                    controls={true}
                    playsinline={true}
                    light={true} // Bypasses localhost CORS issues - shows thumbnail first
                  />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900/50">
                  <div className="w-12 h-12 border-2 border-dashed border-zinc-700 rounded-full mb-4 animate-pulse" />
                </div>
              )}
            </div>
            <div className="absolute -top-4 -right-2 bg-[#800000] text-white font-black px-3 py-1 rotate-6 text-[10px] uppercase tracking-widest shadow-xl">
              Latest Reel
            </div>
          </div>

          <div className="order-2 text-center lg:text-left">
            <h2 className="text-[#bc9c22] text-4xl md:text-7xl font-black uppercase mb-6 md:mb-10 tracking-tighter">
              Our Mission
            </h2>
            <div className="space-y-6 md:space-y-8 text-zinc-300 text-sm md:text-xl leading-relaxed">
              <p>We strive to <span className="text-white font-bold border-b border-[#bc9c22]">upskill students</span> through high-quality events, workshops, and hackathons.</p>
              <p>We aim to make coding enjoyable and accessible to all, offering students <span className="text-white font-bold italic underline">real-world experience</span>.</p>
            </div>
          </div>
        </section>

        {/* 3. VALUES SECTION */}
        <section className="relative z-10 py-16 md:py-32 bg-white/[0.02] backdrop-blur-md border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-7xl font-black uppercase mb-12 md:mb-24 text-center tracking-tighter">SOFEA's Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              {values.map((value, i) => (
                <div key={i} className="group text-center">
                  <div className="flex justify-center mb-4 md:mb-8 text-[#bc9c22] transform group-hover:scale-110 transition-transform duration-500">
                    <value.icon size={56} strokeWidth={1} />
                  </div>
                  <h4 className="text-xl md:text-2xl font-black uppercase mb-2 md:mb-4 tracking-tighter">{value.title}</h4>
                  <p className="text-zinc-500 text-[10px] md:text-sm leading-relaxed uppercase tracking-widest font-medium max-w-[250px] mx-auto px-4">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FOUNDER SECTION (Original Color Image) */}
        <section className="relative z-10 py-24 md:py-32 px-6 md:px-20 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-16 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md p-2 rounded-[2.5rem] border border-white/5 relative">
            
            <div className="w-full md:w-1/3 aspect-[3/4] md:h-[450px] relative flex-shrink-0">
              {/* Thick Maroon Border Frame */}
              <div className="absolute inset-0 border-[6px] border-[#800000] rounded-[2rem] z-20 pointer-events-none shadow-[0_0_20px_rgba(128,0,0,0.2)]"></div>
              {data.founderImage ? (
                <img 
                  src={data.founderImage} 
                  alt="Dr. Halinawati" 
                  className="w-full h-full object-cover rounded-[2rem]" // Removed grayscale class
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 rounded-[2rem] flex items-center justify-center text-zinc-600 uppercase font-black text-xs tracking-widest">
                  Founder Photo
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center py-8 md:pr-12">
              <p className="text-[#bc9c22] text-xs font-black uppercase tracking-[0.4em] mb-4">The Visionary</p>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white mb-8">
                Founded by <br />
                <span className="text-[#800000] drop-shadow-[0_2px_10px_rgba(128,0,0,0.5)]">Dr. Halinawati</span>
              </h3>
              
              <div className="relative">
                <span className="absolute -top-6 -left-4 text-6xl text-white/10 font-serif">“</span>
                <p className="text-zinc-300 text-base md:text-xl font-light leading-relaxed italic relative z-10">
                  {data.founderText}
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-bold">Software Engineering Association • MJIIT</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. RECRUITMENT SECTION */}
        <section className="relative z-10 py-16 pb-32 px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#bc9c22]/10 to-transparent border border-white/5 p-8 md:p-24 rounded-[3rem] relative overflow-hidden text-center lg:text-left backdrop-blur-xl">
             <h2 className="text-3xl md:text-6xl font-black uppercase mb-6 md:mb-8 tracking-tighter">Where are we now?</h2>
             <p className="text-zinc-400 text-sm md:text-xl leading-relaxed mb-8 md:mb-12 max-w-3xl px-2 md:px-0">
               SOFEA's exponential growth has led us to become <span className="bg-[#bc9c22]/30 px-2 text-white italic">one of Malaysia's emerging student computing societies</span>.
             </p>
             <Link to="/recruitment" className="inline-block bg-white text-black font-black uppercase px-10 py-5 text-[10px] tracking-[0.3em] hover:bg-[#800000] hover:text-white transition-all text-center w-full md:w-auto">
               Join the Committee
             </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;