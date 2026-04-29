import React, { useState, useEffect } from 'react';
import client, { urlFor } from '../sanityClient';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    // Fetching merchandise from Sanity
    client.fetch(`*[_type == "merch"] | order(_createdAt desc)`).then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  return (
    /* CRITICAL FIX: z-0 and relative positioning ensures this page 
       stays beneath the NavOverlay (which should be z-[100] or higher).
    */
    <div className="min-h-screen w-full relative z-0 overflow-hidden font-sans selection:bg-[#800000] selection:text-white bg-black">
      
      {/* 1. GRADIENT BACKGROUND (Black to Maroon) */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-[#4a0000] to-[#800000] z-[-10]" />

      {/* 2. DIAGONAL CROSS GRID (Subtle Overlay) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15] z-[-5]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 49%, #ffffff 49%, #ffffff 51%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, #ffffff 49%, #ffffff 51%, transparent 51%)
          `,
          backgroundSize: "44px 44px",
          WebkitMaskImage: "radial-gradient(ellipse 100% 80% at 50% 100%, #000 30%, transparent 90%)",
          maskImage: "radial-gradient(ellipse 100% 80% at 50% 100%, #000 30%, transparent 90%)",
        }}
      />

      {/* 3. MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto py-24 px-6">
        
        <header className="mb-16">
          <p className="text-[#bc9c22] text-[10px] font-black uppercase tracking-[0.4em] mb-2">SOF-EA Merch</p>
          <h1 className="text-5xl md:text-6xl font-black uppercase text-white tracking-tighter">
            The <span className="opacity-40">Shop.</span>
          </h1>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#bc9c22] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item) => (
              <div 
                key={item._id} 
                className="bg-white rounded-[32px] p-4 flex flex-col shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] text-black transition-all hover:-translate-y-2 duration-500"
              >
                
                {/* IMAGE SECTION */}
                <div className="relative aspect-square rounded-[24px] overflow-hidden bg-zinc-100 mb-5 border border-zinc-50">
                  {item.image ? (
                    <img 
                      src={urlFor(item.image).url()} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-300 text-xs uppercase font-bold">No Image</div>
                  )}
                </div>

                {/* PRODUCT CONTENT */}
                <div className="px-2 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold tracking-tight mb-1 leading-tight uppercase">
                    {item.name}
                  </h3>
                  
                  {/* Price & Stock Status */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-black text-zinc-900">{item.price}</span>
                    {!item.isStocked && (
                      <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase">Sold Out</span>
                    )}
                  </div>

                  {/* Short preview description */}
                  <p className="text-zinc-500 text-[11px] leading-relaxed mb-6 line-clamp-2">
                    {item.description}
                  </p>

                  {/* EXPANDABLE SECTION */}
                  <AnimatePresence>
                    {expandedId === item._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mb-6 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                          <p className="text-[11px] leading-relaxed text-zinc-700 whitespace-pre-wrap font-medium">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* BUTTONS LAYOUT */}
                  <div className="grid grid-cols-2 gap-3 mt-auto pt-2">
                    <a 
                      href={item.purchaseLink}
                      target="_blank"
                      rel="noreferrer"
                      className={`text-[10px] font-bold py-4 rounded-2xl flex items-center justify-center transition-all ${
                        item.isStocked 
                        ? 'bg-[#121212] text-white hover:bg-[#800000]' 
                        : 'bg-zinc-100 text-zinc-300 cursor-not-allowed pointer-events-none'
                      }`}
                    >
                      {item.isStocked ? 'Buy Now' : 'N/A'}
                    </a>
                    <button 
                      onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}
                      className="bg-white border border-zinc-200 text-zinc-600 text-[10px] font-bold py-4 rounded-2xl flex items-center justify-center hover:bg-zinc-50 transition-colors shadow-sm"
                    >
                      {expandedId === item._id ? "Close" : "Details"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER DECORATION */}
      <footer className="relative z-10 py-10 text-center border-t border-white/5">
        <p className="text-white/20 text-[9px] uppercase tracking-[0.5em]">SOF-EA Archive & Shop • 2026</p>
      </footer>
    </div>
  );
};

export default Shop;