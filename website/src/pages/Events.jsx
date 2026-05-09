import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Changed Link to useNavigate
import client from '../sanityClient';
import createImageUrlBuilder from '@sanity/image-url';

const builder = createImageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function Events() {
  const { id } = useParams(); 
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [allEvents, setAllEvents] = useState([]);
  const [singleEvent, setSingleEvent] = useState(null);
  const [filter, setFilter] = useState('all'); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(`*[_type == "event"] | order(date desc)`)
      .then((data) => {
        setAllEvents(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      client.fetch(`*[_type == "event" && _id == $id][0]`, { id })
        .then((data) => {
          setSingleEvent(data);
          setLoading(false);
          window.scrollTo(0, 0); // Scroll to top when opening details
        });
    }
  }, [id]);

  const categories = ['all', 'workshop', 'competition', 'social'];

  const filteredEvents = allEvents.filter(event => {
    if (filter === 'all') return true;
    return event.category?.toLowerCase() === filter.toLowerCase();
  });

  // Function to handle returning home while preserving scroll
  const handleBack = () => {
    // If the user came from the home page, navigate(-1) returns them to the exact scroll spot
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/'); // Fallback if they opened the link directly
    }
  };

  // ==========================
  // DETAIL VIEW (Single Event)
  // ==========================
  if (id) {
    if (loading) {
      return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#800000] border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    if (!singleEvent) {
      return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
          <h2 className="text-2xl font-black uppercase italic mb-4">Event Not Found</h2>
          <button onClick={() => navigate('/')} className="text-[#800000] uppercase tracking-widest text-sm font-bold underline">Back to Home</button>
        </div>
      );
    }

    return (
      <div className="pt-32 pb-20 px-6 bg-[#0A0A0A] min-h-screen text-white font-sans selection:bg-[#800000]">
        <div className="max-w-4xl mx-auto">
          {/* UPDATED BACK BUTTON */}
          <button 
            onClick={handleBack}
            className="text-[#800000] font-black uppercase tracking-[0.3em] text-[10px] hover:text-white transition-colors flex items-center"
          >
            <span className="mr-3">←</span> Back to Home
          </button>
          
          <div className="mt-8 border border-zinc-800 bg-zinc-900/20 p-2 md:p-4 rounded-sm overflow-hidden shadow-2xl">
            {singleEvent.mainImage && (
              <img 
                src={urlFor(singleEvent.mainImage).url()} 
                className="w-full h-auto object-contain max-h-[80vh]" 
                alt={singleEvent.title}
              />
            )}
          </div>

          <h1 className="text-4xl md:text-7xl font-black uppercase mt-12 italic tracking-tighter leading-[0.85]">
            {singleEvent.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 p-10 bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm">
            <div>
              <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-2">Date</p>
              <p className="font-bold text-lg">{singleEvent.date ? new Date(singleEvent.date).toDateString() : "TBA"}</p>
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

          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-400 leading-relaxed text-lg whitespace-pre-line font-medium">
              {singleEvent.description}
            </p>
          </div>

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

  // LIST VIEW (If accessed via /events)
  return (
    <div className="pt-40 p-8 max-w-7xl mx-auto text-white min-h-screen bg-[#0A0A0A]">
      {/* ... (Same as before) ... */}
    </div>
  );
}