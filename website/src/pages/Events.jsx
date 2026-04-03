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

  // DETAIL VIEW
  if (id && singleEvent) {
    return (
      <div className="pt-32 pb-20 px-6 bg-[#0A0A0A] min-h-screen text-white">
        <div className="max-w-4xl mx-auto">
          {/* FIXED: Back to Home */}
          <Link to="/" className="text-[#800000] font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors">
            ← Back to Home
          </Link>
          
          <div className="mt-8 border border-zinc-800 bg-zinc-900/20 p-2 md:p-4">
            <img 
              src={urlFor(singleEvent.mainImage).url()} 
              className="w-full h-auto object-contain max-h-[80vh]" 
              alt={singleEvent.title}
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase mt-10 italic tracking-tighter leading-[0.9]">
            {singleEvent.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10 p-8 bg-zinc-900/50 border border-zinc-800">
            <div><p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-1">Date</p><p className="font-bold">{new Date(singleEvent.date).toDateString()}</p></div>
            <div><p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-1">Location</p><p className="font-bold">{singleEvent.location || "MJIIT"}</p></div>
            <div><p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-1">Category</p><p className="font-bold uppercase text-[#bc9c22]">{singleEvent.category}</p></div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-400 leading-relaxed text-lg whitespace-pre-line">{singleEvent.description}</p>
          </div>
        </div>
      </div>
    );
  }

  // LIST VIEW (If you visit /events directly)
  return (
    <div className="pt-32 p-8 max-w-7xl mx-auto text-white min-h-screen bg-[#0A0A0A]">
      <h1 className="text-6xl font-black uppercase italic mb-12 tracking-tighter">All Events</h1>
      
      <div className="flex gap-2 mb-12 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)}
            className={`px-8 py-2 border font-bold uppercase text-[10px] tracking-widest transition-all ${
              filter === cat ? 'bg-[#800000] border-[#800000] text-white' : 'border-zinc-800 text-zinc-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <Link to={`/event/${event._id}`} key={event._id} className="group border border-zinc-800 bg-zinc-900/30">
            <div className="aspect-square overflow-hidden">
              <img src={urlFor(event.mainImage).width(600).url()} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={event.title} />
            </div>
            <div className="p-6">
              <span className="text-[#bc9c22] text-[10px] font-black uppercase tracking-widest">{event.category}</span>
              <h3 className="text-xl font-bold mt-2 uppercase italic">{event.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}