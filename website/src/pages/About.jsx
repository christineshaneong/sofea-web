import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Target, BrainCircuit } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TechBackground from '../components/TechBackground';
import { client, urlFor } from '../sanityClient'; // 1. Added Sanity imports

const About = () => {
  // 2. Setup state for your images
  const [images, setImages] = useState({
    hero: null,
    mission: null
  });

  // 3. Fetch images from Sanity
  useEffect(() => {
    client.fetch(`*[_type == "siteAssets"][0]{aboutHero, missionImage}`).then((data) => {
      if (data) {
        setImages({
          hero: data.aboutHero ? urlFor(data.aboutHero).url() : null,
          mission: data.missionImage ? urlFor(data.missionImage).url() : null
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
          {/* 4. Use Sanity Hero Image */}
          {images.hero && (
            <img 
              src={images.hero} 
              className="w-full h-full object-cover opacity-40 grayscale"
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
            Software Engineering Association (SOFEA) is the <span className="text-white font-bold bg-[#bc9c22]/30 px-2 italic">largest student-run computing club at MJIIT</span>.
          </p>
        </div>
      </section>

      {/* LOWER CONTENT WRAPPER */}
      <div className="relative">
        <TechBackground />

        {/* 2. OUR MISSION */}
        <section className="relative z-10 py-16 md:py-32 px-6 md:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h2 className="text-[#bc9c22] text-4xl md:text-7xl font-black uppercase mb-6 md:mb-10 underline decoration-white/10 underline-offset-8">
              Our Mission
            </h2>
            <div className="space-y-6 md:space-y-8 text-zinc-300 text-sm md:text-xl leading-relaxed">
              <p>We strive to <span className="text-white font-bold border-b border-[#bc9c22]">upskill students</span> through high-quality events, workshops, and hackathons.</p>
              <p>We aim to make coding enjoyable and accessible to all, offering students <span className="text-white font-bold italic underline">real-world experience</span>.</p>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2 flex justify-center group scale-90 md:scale-100">
            <div className="w-64 h-64 md:w-[500px] md:h-[500px] aspect-square bg-[#bc9c22]/10 rounded-[40%_60%_70%_30%/50%_40%_60%_50%] overflow-hidden border-2 border-[#bc9c22]/30">
              {/* 5. Use Sanity Mission Image */}
              {images.mission && (
                <img 
                  src={images.mission} 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0"
                  alt="Our Mission"
                />
              )}
            </div>
            <div className="absolute -top-2 -right-2 md:-top-5 md:-right-5 bg-white text-black font-black p-2 md:p-4 rotate-12 text-[8px] md:text-[10px] uppercase tracking-[0.3em] shadow-xl">
              EST. 2024
            </div>
          </div>
        </section>

        {/* Values and Growth sections remain the same... */}
        <section className="relative z-10 py-16 md:py-32 bg-black/20 backdrop-blur-sm">
          {/* ... keeping your existing values mapping ... */}
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-7xl font-black uppercase mb-12 md:mb-24 text-center tracking-tighter">SOFEA's Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              {values.map((value, i) => (
                <div key={i} className="group text-center">
                  <div className="flex justify-center mb-4 md:mb-8 text-[#bc9c22] transform group-hover:scale-110 transition-transform duration-500">
                    <value.icon size={64} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xl md:text-2xl font-black uppercase mb-2 md:mb-4 tracking-tighter">{value.title}</h4>
                  <p className="text-zinc-500 text-[10px] md:text-sm leading-relaxed uppercase tracking-widest font-medium max-w-[250px] mx-auto">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Growth Section remains the same */}
        <section className="relative z-10 py-16 md:py-32 px-6">
          <div className="max-w-5xl mx-auto bg-[#bc9c22]/5 border border-white/5 p-8 md:p-24 rounded-2xl md:rounded-3xl relative overflow-hidden text-center lg:text-left backdrop-blur-md">
             <h2 className="text-3xl md:text-6xl font-black uppercase mb-6 md:mb-8 tracking-tighter">Where are we now?</h2>
             <p className="text-zinc-400 text-sm md:text-xl leading-relaxed mb-8 md:mb-12 max-w-3xl px-2 md:px-0">
               SOFEA's exponential growth has led us to become <span className="bg-[#bc9c22]/30 px-2 text-white">one of Malaysia's emerging student computing societies</span>.
             </p>
             <Link to="/recruitment" className="inline-block bg-white text-black font-black uppercase px-8 py-4 md:px-10 md:py-5 text-[9px] md:text-[11px] tracking-[0.3em] hover:bg-[#bc9c22] hover:text-white transition-all text-center w-full md:w-auto">
               Become a Committee
             </Link>
          </div>
        </section>
      </div>

    </div>
  );
};

export default About;