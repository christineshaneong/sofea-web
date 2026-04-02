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
  const [filter, setFilter] = useState('All');

  // Fetch all events for the main list
  useEffect(() => {
    client.fetch(`*[_type == "event"] | order(date desc)`)
      .then((data) => setAllEvents(data))
      .catch(console.error);
  }, []);

  // Fetch specific event if an ID is in the URL
  useEffect(() => {
    if (id) {
      client.fetch(`*[_type == "event" && _id == $id][0]`, { id })
        .then((data) => setSingleEvent(data));
    } else {
      setSingleEvent(null);
    }
  }, [id]);

  // Sorting Logic
  const categories = ['All', 'Workshop', 'Competition', 'Social'];
  const filteredEvents = filter === 'All' 
    ? allEvents 
    : allEvents.filter(e => e.category === filter);

  // VIEW 1: Detailed Event Page (Single Event)
  if (id && singleEvent) {
    return (
      <div className="pt-32 pb-20 px-6 bg-[#0A0A0A] min-h-screen text-white">
        <div className="max-w-4xl mx-auto">
          <Link to="/events" className="text-[#800000] font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors">
            ← Back to Events
          </Link>

          {/* DYNAMIC IMAGE: Fits portrait or landscape posters without cropping */}
          <div className="flex justify-center w-full mt-6">
            <img 
              src={urlFor(singleEvent.mainImage).url()} 
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain border border-zinc-800 shadow-2xl" 
              alt={singleEvent.title}
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-black uppercase mt-10 italic leading-tight">
            {singleEvent.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 p-6 bg-zinc-900/50 border border-zinc-800">
            <div>
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Date</p>
              <p className="font-bold">{new Date(singleEvent.date).toDateString()}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Time</p>
              <p className="font-bold">{singleEvent.time || "TBA"}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Location</p>
              <p className="font-bold">{singleEvent.location || "MJIIT, UTM KL"}</p>
            </div>
          </div>

          {/* DESCRIPTION: whitespace-pre-line preserves your Sanity paragraph breaks */}
          <div className="mt-10">
            <h3 className="text-lg font-bold uppercase mb-4 text-[#800000] tracking-widest italic">Event Description</h3>
            <p className="text-zinc-400 leading-relaxed text-lg whitespace-pre-line">
              {singleEvent.description}
            </p>
          </div>

          {singleEvent.googleFormUrl && (
            <a 
              href={singleEvent.googleFormUrl} 
              target="_blank" 
              rel="noreferrer"
              className="inline-block mt-12 px-12 py-4 bg-[#800000] text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Register Now
            </a>
          )}
        </div>
      </div>
    );
  }

  // VIEW 2: General Events List (Grid View)
  return (
    <div className="pt-32 p-8 max-w-7xl mx-auto text-white min-h-screen">
      <h1 className="text-6xl font-black uppercase italic mb-4 tracking-tighter">SOFEA Events</h1>
      
      {/* Category Filter Bar */}
      <div className="flex gap-3 mb-12 overflow-x-auto pb-4">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)}
            className={`px-8 py-2 border font-bold uppercase text-[10px] tracking-widest transition-all whitespace-nowrap ${
              filter === cat 
              ? 'bg-[#800000] border-[#800000] text-white' 
              : 'border-zinc-800 text-zinc-500 hover:border-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <Link 
            to={`/event/${event._id}`} 
            key={event._id} 
            className="group border border-zinc-800 bg-zinc-900/30 hover:border-[#800000] transition-all duration-500"
          >
            {/* SQUARE THUMBNAIL: Keeps the main list looking organized */}
            <div className="aspect-square overflow-hidden border-b border-zinc-800">
              <img 
                src={urlFor(event.mainImage).width(600).height(600).url()} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt={event.title} 
              />
            </div>
            <div className="p-6">
              <span className="text-[#bc9c22] text-[10px] font-black uppercase tracking-[0.2em]">
                {event.category}
              </span>
              <h3 className="text-xl font-bold mt-2 uppercase italic leading-tight group-hover:text-[#800000] transition-colors">
                {event.title}
              </h3>
              <p className="text-zinc-500 text-[11px] font-bold mt-3 uppercase tracking-widest">
                {new Date(event.date).toDateString()}
              </p>
              <div className="mt-6 flex items-center text-[10px] font-black uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">
                View Details <span className="ml-2">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}