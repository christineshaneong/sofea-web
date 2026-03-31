import React from 'react';
import { Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

const Community = () => {
  const socials = [
    { 
      name: 'Instagram', 
      icon: <Instagram size={22} />, 
      handle: '@sofea_mjiit', 
      url: '#',
      color: 'hover:border-[#E1306C]/50' 
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin size={22} />, 
      handle: 'SOFEA MJIIT', 
      url: '#',
      color: 'hover:border-[#0077B5]/50' 
    },
  ];

  return (
    <section className="bg-black py-24 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
           <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
             Our Community
           </h2>
           <p className="text-gray-500 tracking-[0.4em] text-[10px] uppercase font-medium">
             Connect with us on social media
           </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Vertical Labels */}
          <div className="hidden md:flex flex-col gap-48 py-4 border-r border-white/10 pr-10">
            <span className="rotate-[-90deg] whitespace-nowrap text-[9px] font-bold tracking-[1.2em] text-zinc-600 uppercase">
              SOCIALS
            </span>
            <span className="rotate-[-90deg] whitespace-nowrap text-[9px] font-bold tracking-[1.2em] text-zinc-600 uppercase">
              POSTS
            </span>
          </div>

          {/* Content Area */}
          <div className="flex-1 space-y-16">
            
            {/* 1. Social Link Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socials.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  className={`group bg-zinc-900/20 p-8 border border-white/5 transition-all duration-500 ${social.color} flex justify-between items-center`}
                >
                  <div className="flex items-center gap-5">
                    <div className="text-zinc-500 group-hover:text-white transition-colors">
                      {social.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white uppercase tracking-tight">{social.name}</h4>
                      <p className="text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors uppercase tracking-widest">{social.handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={20} className="text-zinc-700 opacity-0 group-hover:opacity-100 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              ))}
            </div>

            {/* 2. Instagram Posts Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((post) => (
                <div 
                  key={post} 
                  className="aspect-square bg-zinc-900/50 border border-white/5 relative group overflow-hidden cursor-pointer"
                >
                  {/* Overlay for when you add images later */}
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black opacity-40 group-hover:opacity-20 transition-opacity" />
                  
                  {/* Hover State */}
                  <div className="absolute inset-0 bg-[#bc9c22]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Instagram size={28} className="text-white/20" />
                  </div>
                </div>
              ))}
            </div>

            {/* "View More" CTA */}
            <div className="pt-4 flex justify-center md:justify-start">
               <button className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 hover:text-white transition-colors flex items-center gap-4 group">
                  View all posts 
                  <div className="w-8 h-[1px] bg-zinc-800 group-hover:w-12 group-hover:bg-[#bc9c22] transition-all"></div>
               </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;