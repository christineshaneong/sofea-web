import React, { useState, useEffect, useRef } from 'react';
import client, { urlFor } from '../sanityClient';
import Navbar from '../components/Navbar';
import emailjs from '@emailjs/browser';

const Sponsor = () => {
  const [heroImage, setHeroImage] = useState(null);
  const [status, setStatus] = useState("");
  const form = useRef(); 
  
  const OFFICIAL_EMAIL = "sofea.mjiit@graduate.utm.my";

  useEffect(() => {
    client.fetch(`*[_type == "siteAssets"][0].sponsorHero`).then((data) => {
      if (data) {
        setHeroImage(urlFor(data).url());
      }
    }).catch(err => console.error("Sponsor Hero Fetch Error:", err));
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("SENDING...");

    // Using your Service ID: service_oxzvy6b
    // Using your Template ID: template_urg766b
    // Using your Public Key: uVQtyrG7vdNNEIKUh
    emailjs.sendForm(
      'service_oxzvy6b', 
      'template_urg766b', 
      form.current, 
      'uVQtyrG7vdNNEIKUh' 
    )
    .then((result) => {
        setStatus("SUCCESS! WE WILL CONTACT YOU SOON.");
        form.current.reset();
        setTimeout(() => setStatus(""), 5000);
    }, (error) => {
        setStatus("FAILED TO SEND. PLEASE TRY AGAIN.");
        console.error("EmailJS Error:", error.text);
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(OFFICIAL_EMAIL);
    alert("Email copied to clipboard!");
  };

  const inputStyle = "w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#bc9c22] transition-colors uppercase text-[10px] tracking-widest";
  const labelStyle = "block text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 mb-2";

  return (
    <div className="bg-zinc-950 min-h-screen text-white font-sans flex flex-col selection:bg-[#800000]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-4 md:px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-[#0F0F0F] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
          
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
            
            <div className="absolute bottom-12 left-12 hidden lg:block">
              <p className="text-[#bc9c22] text-[10px] font-black uppercase tracking-[0.5em] mb-2">Partnership</p>
              <h1 className="text-5xl font-black uppercase tracking-tighter italic leading-none text-white">MJIIT <br/>SOFEA</h1>
            </div>
          </div>

          <div className="p-8 md:p-12 lg:p-16 flex flex-col">
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2 text-white">SPONSOR US</h1>
              <div className="w-12 h-1 bg-[#800000]" />
            </div>

            <h2 className="text-sm font-bold uppercase tracking-widest mb-8 text-zinc-400">Contact form</h2>

            <form ref={form} className="space-y-6" onSubmit={sendEmail}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>Company Name</label>
                  <input name="company" type="text" placeholder="COMPANY NAME" className={inputStyle} required />
                </div>
                <div>
                  <label className={labelStyle}>Contact Name</label>
                  <input name="name" type="text" placeholder="YOUR NAME" className={inputStyle} required />
                </div>
              </div>

              <div>
                <label className={labelStyle}>Email</label>
                <input name="email" type="email" placeholder="YOUR@EMAIL.COM" className={inputStyle} required />
              </div>

              <div>
                <label className={labelStyle}>Message</label>
                <textarea 
                  name="message"
                  rows="3" 
                  placeholder="TELL US ABOUT YOUR INTERESTS..." 
                  className={`${inputStyle} resize-none`}
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#bc9c22] text-black font-black uppercase tracking-[0.3em] text-[11px] rounded-xl hover:bg-white transition-all duration-300 shadow-lg shadow-[#bc9c22]/10 active:scale-95"
              >
                Send Message
              </button>

              {status && (
                <p className="mt-4 text-center text-[10px] font-bold tracking-widest text-[#bc9c22] animate-pulse">
                  {status}
                </p>
              )}
            </form>

            <div className="flex items-center gap-4 py-8">
              <div className="flex-grow h-[1px] bg-white/5"></div>
              <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">OR</span>
              <div className="flex-grow h-[1px] bg-white/5"></div>
            </div>

            <div className="space-y-4">
              <label className={labelStyle}>Reach out directly</label>
              <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-xs md:text-sm font-medium text-zinc-400 lowercase">
                  {OFFICIAL_EMAIL}
                </span>
                <button 
                  type="button"
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