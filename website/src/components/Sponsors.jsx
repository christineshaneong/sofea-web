import React from 'react';

const Sponsors = () => {
  const sponsorLogos = [
    { name: 'Atlassian', url: '/src/assets/atlassian.png' },
    { name: 'Citadel', url: '/src/assets/citadel.png' },
    { name: 'IMC', url: '/src/assets/imc.png' },
    { name: 'Jane Street', url: '/src/assets/jane-street.png' },
    { name: 'Susquehanna', url: '/src/assets/susquehanna.png' },
  ];

  // Doubling to create infinite loop
  const doubledLogos = [...sponsorLogos, ...sponsorLogos];

  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-4">
          <h2 className="text-white text-xl font-black uppercase tracking-tighter">
            Our 2026 Sponsors
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent"></div>
        </div>
      </div>

      <div className="relative flex overflow-hidden group">
        {/* The Marquee Wrapper */}
        <div className="flex animate-marquee whitespace-nowrap items-center py-4">
          {doubledLogos.map((logo, index) => (
            <div 
              key={index} 
              className="mx-16 flex-shrink-0 w-32 md:w-48 h-16 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 ease-in-out"
            >
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="max-w-full max-h-full object-contain brightness-200"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;