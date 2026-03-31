import React from 'react';

const EventCard = () => {
  const filters = ['ALL', 'EVENTS', 'HACKATHONS', 'INDUSTRY', 'SOCIAL', 'RECRUITMENT', 'ARCHIVES'];

  return (
    <section className="w-full bg-black py-16 md:py-24 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-12">
          <h2 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9]">
            Events & <br className="hidden md:block" /> Announcements
          </h2>
          <p className="mt-4 md:mt-6 text-zinc-500 text-sm md:text-base max-w-xl leading-relaxed mb-10">
            Discover workshops, socials, and flagship projects. Filter by category and jump straight into what matters most this semester.
          </p>
        </div>

        {/* Filter Pills - Scrollable on Mobile */}
        <div className="flex overflow-x-auto md:flex-wrap gap-3 mb-12 md:mb-16 no-scrollbar pb-4 md:pb-0">
          {filters.map((filter) => (
            <button 
              key={filter}
              className={`whitespace-nowrap px-5 py-2 text-[10px] font-bold tracking-[0.2em] uppercase border transition-all cursor-pointer flex-shrink-0
                ${filter === 'EVENTS' 
                  ? 'bg-[#800000] border-[#800000] text-white' 
                  : 'border-white/10 text-gray-400 hover:border-white hover:text-white'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* MAIN EVENT CARD */}
        {/* Mobile: Higher aspect ratio (vertical feel), smaller text
            Web: Aspect 21/9, Massive typography
        */}
        <div className="group relative w-full aspect-[4/5] md:aspect-[21/9] bg-zinc-900 overflow-hidden border border-white/10 rounded-xl cursor-pointer
          hover:shadow-[0_0_50px_rgba(128,0,0,0.3)] hover:border-[#800000]/60 transition-all duration-500 ease-out md:hover:-translate-y-1">
          
          {/* Internal Glow Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(128,0,0,0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10" />

          {/* Labels */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 flex gap-2 md:gap-3">
            <span className="bg-white text-black px-3 py-1 text-[8px] md:text-[9px] font-black uppercase tracking-widest">Event</span>
            <span className="bg-[#bc9c22] text-black px-3 py-1 text-[8px] md:text-[9px] font-black uppercase tracking-widest italic">Featured</span>
          </div>

          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-40 md:opacity-60 group-hover:opacity-100"
            style={{ backgroundImage: `url('/src/assets/event-main.jpg')` }} 
          />
          
          {/* Text Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-16 z-20">
            <h3 className="text-3xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
              MAC x IBL <br />
              HOW 2 NOT <span className="text-[#bc9c22]">WASTE</span> <br />
              UNI <span className="text-lg md:text-xl font-light opacity-60">(IT EDITION)</span>
            </h3>
            
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <div className="w-fit px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-white">
                Thursday 5th March, 6-8PM
              </div>
              <div className="w-fit px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-white">
                MJIIT, UTM KL
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCard;