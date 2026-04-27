import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import client, { urlFor } from '../sanityClient';

const AboutAccordion = () => {
  const navigate = useNavigate();
  
  const [sections, setSections] = useState([
    { id: 'about', title: 'ABOUT US', description: 'Discover our story and how we empower MJIIT students.', img: null, path: '/about' },
    { id: 'team', title: 'MEET THE TEAM', description: 'The passionate minds behind SOFEA working to bridge the gap.', img: null, path: '/team' },
    { id: 'archive', title: 'THE ARCHIVE', description: 'Explore the legacy of past committees and event milestones.', img: null, path: '/archive' },
    { id: 'recruitment', title: 'RECRUITMENT', description: 'Join the family! We are looking for Technical leads.', img: null, path: '/recruitment' },
    { id: 'sponsor', title: 'SPONSOR US', description: 'Partner with us to reach the next generation of engineers.', img: null, path: '/sponsor' },
    { id: 'contact', title: 'CONTACT', description: 'Reach out to our executive team directly.', img: null, path: '/contact' },
  ]);

  useEffect(() => {
    const query = `*[_type == "siteAssets"][0].accordionBackgrounds`;
    
    client.fetch(query).then((data) => {
      if (data && data.length > 0) {
        setSections(prev => prev.map(section => {
          const match = data.find(item => 
            item.label?.toLowerCase().trim() === section.id
          );
          
          if (match && match.image) {
            return { ...section, img: urlFor(match.image).url() };
          }
          return section;
        }));
      }
    }).catch(err => console.error("Sanity Fetch Error:", err));
  }, []);

  return (
    <section className="hidden md:flex h-[75vh] w-full bg-black border-t border-white/10 overflow-hidden">
      {sections.map((section) => (
        <div 
          key={section.id} 
          onClick={() => navigate(section.path)}
          className="group relative flex-1 hover:flex-[6] transition-[flex] duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] border-r border-white/10 cursor-pointer bg-zinc-900 overflow-hidden"
        >
          {/* BACKGROUND LAYER */}
          <div className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105">
            {section.img ? (
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale-[80%] transition-all duration-700 group-hover:grayscale-0"
                style={{ backgroundImage: `url(${section.img})` }}
              />
            ) : (
              <div className="absolute inset-0 bg-zinc-900" /> 
            )}
            <div className="absolute inset-0 bg-black/70 transition-opacity duration-700 group-hover:bg-black/40" />
          </div>

          {/* TEXT CONTENT */}
          <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center">
            {/* TITLE: Removed 'italic' class here */}
            <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] whitespace-nowrap text-[9px] font-black tracking-[0.8em] text-zinc-400 transition-all duration-[800ms] group-hover:rotate-0 group-hover:text-[#bc9c22] group-hover:text-4xl group-hover:tracking-tighter uppercase">
              {section.title}
            </h3>

            <div className="absolute top-[62%] left-1/2 -translate-x-1/2 w-full px-10 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 text-center">
              <p className="text-white text-[10px] uppercase tracking-[0.2em] leading-relaxed font-black max-w-[280px] mx-auto drop-shadow-lg">
                  {section.description}
              </p>
              <div className="w-10 h-[2px] bg-[#800000] mx-auto mt-4" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AboutAccordion;