import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client, urlFor } from '../sanityClient';

const AboutAccordion = () => {
  const navigate = useNavigate();
  
  // These IDs MUST match the "Label" you type in Sanity exactly
  const [sections, setSections] = useState([
    { id: 'about', title: 'ABOUT US', description: 'Discover our story and how we empower MJIIT students.', img: null, path: '/about' },
    { id: 'team', title: 'MEET THE TEAM', description: 'The passionate minds behind SOFEA working to bridge the gap.', img: null, path: '/team' },
    { id: 'recruitment', title: 'RECRUITMENT', description: 'Join the family! We are looking for Technical leads.', img: null, path: '/recruitment' },
    { id: 'sponsor', title: 'SPONSOR US', description: 'Partner with us to reach the next generation of engineers.', img: null, path: '/sponsorship' },
    { id: 'contact', title: 'CONTACT', description: 'Reach out to our executive team directly.', img: null, path: '/contact' },
  ]);

  useEffect(() => {
    // Fetch the specific array from the siteAssets document
    const query = `*[_type == "siteAssets"][0].accordionBackgrounds`;
    
    client.fetch(query).then((data) => {
      console.log("Sanity Accordion Data Received:", data);

      if (data && data.length > 0) {
        setSections(prev => prev.map(section => {
          // Match logic: Compare 'label' from Sanity to 'id' in our local state
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
    <section className="hidden md:flex h-[70vh] w-full bg-black border-t border-white/10 overflow-hidden">
      {sections.map((section) => (
        <div 
          key={section.id} 
          onClick={() => navigate(section.path)}
          className="group relative flex-1 hover:flex-[5] transition-[flex] duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] border-r border-white/10 cursor-pointer bg-zinc-900 overflow-hidden"
        >
          {/* BACKGROUND LAYER */}
          <div className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105">
            {section.img ? (
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale-[50%] transition-all duration-700 group-hover:grayscale-0"
                style={{ backgroundImage: `url(${section.img})` }}
              />
            ) : (
              <div className="absolute inset-0 bg-zinc-800 animate-pulse" /> 
            )}
            <div className="absolute inset-0 bg-black/60 transition-opacity duration-700 group-hover:bg-black/20" />
          </div>

          {/* TEXT CONTENT */}
          <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center">
            <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] whitespace-nowrap text-[10px] font-black tracking-[0.8em] text-white transition-all duration-[800ms] group-hover:rotate-0 group-hover:text-[#bc9c22] group-hover:text-4xl group-hover:tracking-tighter uppercase">
              {section.title}
            </h3>

            <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-full px-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center">
              <p className="text-zinc-100 text-[10px] uppercase tracking-[0.2em] leading-relaxed font-bold max-w-[250px] mx-auto">
                  {section.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AboutAccordion;