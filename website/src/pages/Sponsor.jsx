import React, { useState, useEffect } from 'react';
import client, { urlFor } from '../sanityClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Sponsor = () => {
  const [heroImage, setHeroImage] = useState(null);
  const OFFICIAL_EMAIL = "sofea.mjiit@utm.my";

  useEffect(() => {
    client.fetch(`*[_type == "siteAssets"][0].sponsorHero`).then((data) => {
      if (data) {
        setHeroImage(urlFor(data).url());
      }
    }).catch(err => console.error("Sponsor Hero Fetch Error:", err));
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(OFFICIAL_EMAIL);
    alert("Email copied to clipboard!");
  };

  const inputStyle = "w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#bc9c22] transition-colors";
  const labelStyle = "block text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 mb-2";

  return (
    <div className="bg-zinc-950 min-h-screen text-white font-sans flex flex-col selection:bg-[#800000]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-4 md:px-6">
        {/* MAIN CARD CONTAINER */}
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-[#0F0F0F] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
          
          {/* LEFT SIDE: DYNAMIC IMAGE */}
          <div className="relative h-64 lg:h-auto overflow-hidden">
            {heroImage ? (
              <img 
                src={heroImage} 
                className="w-full h-full object-cover grayscale brightness-75 contrast-125"
                alt="Sponsorship"
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 animate-pulse" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            
            {/* Branding Overlay */}
            <div className="absolute bottom-12 left-12 hidden lg:block">
              <p className="text-[#bc9c22] text-[10px] font-black uppercase tracking-[0.5em] mb-2">Partnership</p>
              <h1 className="text-5xl font-black uppercase tracking-tighter italic leading-none">MJIIT <br/>SOFEA</h1>
            </div>
          </div>

          {/* RIGHT SIDE: CONTENT & FORM */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col">
            {/* SPONSOR US HEADER */}
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2 text-white">SPONSOR US</h1>
              <div className="w-12 h-1 bg-[#800000]" />
            </div>

            <h2 className="text-sm font-bold uppercase tracking-widest mb-8 text-zinc-400">Contact form</h2>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>Company Name</label>
                  <input type="text" placeholder="Your company name" className={inputStyle} />
                </div>
                <div>
                  <label className={labelStyle}>Contact Name</label>
                  <input type="text" placeholder="Your name" className={inputStyle} />
                </div>
              </div>

              <div>
                <label className={labelStyle}>Email</label>
                <input type="email" placeholder="your@email.com" className={inputStyle} />
              </div>

              <div>
                <label className={labelStyle}>Message</label>
                <textarea 
                  rows="3" 
                  placeholder="Tell us about your sponsorship interests..." 
                  className={`${inputStyle} resize-none`}
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#bc9c22] text-black font-black uppercase tracking-[0.3em] text-[11px] rounded-xl hover:bg-white transition-all duration-300 shadow-lg shadow-[#bc9c22]/10"
              >
                Send Message
              </button>
            </form>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 py-8">
              <div className="flex-grow h-[1px] bg-white/5"></div>
              <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">OR</span>
              <div className="flex-grow h-[1px] bg-white/5"></div>
            </div>

            {/* REACH OUT DIRECTLY */}
            <div className="space-y-4">
              <label className={labelStyle}>Reach out directly</label>
              <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-xs md:text-sm font-medium text-zinc-400">
                  {OFFICIAL_EMAIL}
                </span>
                <button 
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-zinc-800 text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-zinc-700 transition-colors text-white"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
};

export default Sponsor;