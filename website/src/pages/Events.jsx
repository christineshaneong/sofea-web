import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import client from '../sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function Events() {
  const { id } = useParams(); 
  const [allEvents, setAllEvents] = useState([]);
  const [singleEvent, setSingleEvent] = useState(null);
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    client.fetch(`*[_type == "event"] | order(date desc)`)
      .then((data) => setAllEvents(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (id) {
      client.fetch(`*[_type == "event" && _id == $id][0]`, { id })
        .then((data) => setSingleEvent(data));
    }
  }, [id]);

  const categories = ['all', 'workshop', 'competition', 'social'];

  const filteredEvents = allEvents.filter(event => {
    if (filter === 'all') return true;
    return event.category?.toLowerCase() === filter.toLowerCase();
  });

  // ==========================
  // DETAIL VIEW (Single Event)
  // ==========================
  if (id && singleEvent) {
    return (
      <div className="pt-32 pb-20 px-6 bg-[#0A0A0A] min-h-screen text-white font-sans selection:bg-[#800000]">
        <div className="max-w-4xl mx-auto">
          {/* BACK BUTTON */}
          <Link to="/" className="text-[#800000] font-black uppercase tracking-[0.3em] text-[10px] hover:text-white transition-colors flex items-center">
            <span className="mr-3">←</span> Back to Home
          </Link>
          
          {/* MAIN IMAGE */}
          <div className="mt-8 border border-zinc-800 bg-zinc-900/20 p-2 md:p-4 rounded-sm overflow-hidden shadow-2xl">
            <img 
              src={urlFor(singleEvent.mainImage).url()} 
              className="w-full h-auto object-contain max-h-[80vh]" 
              alt={singleEvent.title}
            />
          </div>

          {/* TITLE */}
          <h1 className="text-4xl md:text-7xl font-black uppercase mt-12 italic tracking-tighter leading-[0.85]">
            {singleEvent.title}
          </h1>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 p-10 bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm">
            <div>
              <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-2">Date</p>
              <p className="font-bold text-lg">{new Date(singleEvent.date).toDateString()}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-2">Location</p>
              <p className="font-bold text-lg">{singleEvent.location || "MJIIT, UTM KL"}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-2">Category</p>
              <p className="font-black uppercase text-[#bc9c22] text-lg tracking-tight">{singleEvent.category}</p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-400 leading-relaxed text-lg whitespace-pre-line font-medium">
              {singleEvent.description}
            </p>
          </div>

          {/* REGISTRATION BUTTON (GOOGLE FORM) */}
          <div className="mt-16 pt-12 border-t border-zinc-800/50">
            {singleEvent.googleFormUrl ? (
              <div className="flex flex-col items-start gap-4">
                <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.4em]">Registration Link Below</p>
                <a 
                  href={singleEvent.googleFormUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block w-full md:w-auto px-16 py-6 bg-[#800000] text-white text-center font-black uppercase text-[11px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 shadow-[0_10px_40px_rgba(128,0,0,0.3)]"
                >
                  Register via Google Form —
                </a>
              </div>
            ) : (
              <div className="p-6 border border-dashed border-zinc-800 text-center">
                <p className="text-zinc-600 font-black uppercase text-[10px] tracking-[0.3em] italic">
                  Online registration is currently unavailable for this event.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================
  // LIST VIEW (All Events)
  // ==========================
  return (
    <div className="pt-40 p-8 max-w-7xl mx-auto text-white min-h-screen bg-[#0A0A0A]">
      <div className="mb-16">
        <p className="text-[#bc9c22] font-black uppercase tracking-[0.5em] text-[10px] mb-4">Discovery</p>
        <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">Events</h1>
      </div>
      
      {/* FILTER BAR */}
      <div className="flex gap-3 mb-16 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)}
            className={`px-10 py-3 border-2 font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-300 ${
              filter === cat 
                ? 'bg-[#800000] border-[#800000] text-white shadow-[0_0_20px_rgba(128,0,0,0.3)]' 
                : 'border-zinc-800 text-zinc-500 hover:border-white hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredEvents.map((event) => (
          <Link to={`/event/${event._id}`} key={event._id} className="group flex flex-col h-full bg-zinc-900/20 border border-zinc-800/50 hover:border-[#800000]/50 transition-all duration-500">
            <div className="aspect-square overflow-hidden relative">
              <img 
                src={urlFor(event.mainImage).width(600).url()} 
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                alt={event.title} 
              />
              <div className="absolute top-4 left-4 bg-black/80 px-4 py-1 backdrop-blur-md">
                 <span className="text-[#bc9c22] text-[9px] font-black uppercase tracking-widest">{event.category}</span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-black uppercase italic leading-tight group-hover:text-[#bc9c22] transition-colors">{event.title}</h3>
              <div className="mt-6 w-8 h-[2px] bg-[#800000] group-hover:w-full transition-all duration-500" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}