import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { client, urlFor } from '../sanityClient';

const Sponsor = () => {
  const [heroImage, setHeroImage] = useState(null);

  // Replace this with your actual Google Form URL
  const GOOGLE_FORM_URL = "https://forms.gle/your-actual-form-id";

  useEffect(() => {
    client.fetch(`*[_type == "siteAssets"][0].sponsorHero`).then((data) => {
      if (data) {
        setHeroImage(urlFor(data).url());
      }
    }).catch(err => console.error("Sponsor Hero Fetch Error:", err));
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        {/* Changed h-[85vh] to min-h-screen to ensure true vertical centering */}
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#1a0000]">
          <div className="absolute inset-0 z-0">
            {heroImage && (
              <img 
                src={heroImage} 
                className="w-full h-full object-cover opacity-90 grayscale contrast-125"
                alt="Sponsor SOFEA"
              />
            )}
            
            {/* Dark Overlays */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-5xl flex flex-col items-center">
            {/* Subtitle */}
            <h2 className="text-[#bc9c22] font-bold tracking-[0.6em] uppercase text-[10px] md:text-xs mb-4 drop-shadow-md">
              Partnership Opportunities
            </h2>

            {/* Main Heading - Adjusted leading for better visual weight */}
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl">
              Elevate <br/> <span className="text-white">With Us.</span>
            </h1>

            {/* Description */}
            <p className="text-zinc-400 uppercase tracking-[0.25em] text-[10px] md:text-xs max-w-xl leading-relaxed mb-10 opacity-80">
              Join MJIIT's premier computing society in shaping the future of technology and engineering education.
            </p>
            
            {/* CTA BUTTONS */}
            <div className="flex flex-col items-center gap-8">
                {/* Main Google Form Button */}
                <a 
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-12 py-5 bg-[#800000] text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-white hover:text-black shadow-[0_0_40px_rgba(128,0,0,0.4)]"
                >
                    <span className="relative z-10">Become a SPONSOR</span>
                </a>
                
                {/* Underlined Email Inquiry */}
                <a 
                  href="mailto:contact@sofea.com" 
                  className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 hover:text-[#bc9c22] transition-all duration-300 border-b border-zinc-800 hover:border-[#bc9c22] pb-1"
                >
                    Inquiry via Email
                </a>
            </div>
          </div>
        </section>

        {/* MINIMAL QUOTE SECTION */}
        <section className="py-32 px-6 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-12 h-[1px] bg-[#800000] mx-auto mb-10"></div>
            <h3 className="text-2xl md:text-4xl font-light uppercase tracking-tighter leading-snug text-zinc-300">
              "We bridge the gap between <span className="text-white font-bold italic">academic excellence</span> and <span className="text-[#bc9c22] font-bold">industry innovation</span> through strategic collaboration."
            </h3>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Sponsor;