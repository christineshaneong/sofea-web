import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import client, { urlFor } from '../sanityClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8 md:my-12 flex flex-col items-center">
          <div className="w-full md:w-2/3 lg:w-3/5 px-2"> 
            <img 
              src={urlFor(value).url()} 
              className="w-full h-auto object-cover shadow-xl border border-white/5" 
              alt={value.caption || "Content image"} 
            />
            {value.caption && (
              <figcaption className="mt-4 text-center text-zinc-500 text-[9px] uppercase font-bold tracking-[0.2em] italic">
                {value.caption}
              </figcaption>
            )}
          </div>
        </figure>
      );
    },
  },
  block: {
    h2: ({children}) => <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mt-12 md:mt-16 mb-6 text-white border-l-4 border-[#800000] pl-4">{children}</h2>,
    normal: ({children}) => <p className="mb-6 text-zinc-400 leading-relaxed text-justify text-sm md:text-base">{children}</p>,
  },
};

const News = () => {
  const { slug } = useParams();
  const [news, setNews] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!slug) {
      client.fetch(`*[_type == "news"] | order(publishedAt desc) { title, "slug": slug.current, publishedAt, mainImage, excerpt }`)
        .then((data) => { setNews(data); setLoading(false); });
    } else {
      client.fetch(`*[_type == "news" && slug.current == $slug][0]{
        title,
        publishedAt,
        mainImage,
        body,
        author 
      }`, { slug })
        .then((data) => { setPost(data); setLoading(false); });
    }
  }, [slug]);

  return (
    <div className="min-h-screen w-full relative selection:bg-[#800000] selection:text-white overflow-x-hidden bg-black text-white">
      
      {/* --- DOTTED BACKGROUND --- */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: "#000000",
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.08) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow px-4 sm:px-6 lg:px-12 w-full pt-24 md:pt-32">
          
          {loading ? (
            <div className="h-[60vh] flex items-center justify-center animate-pulse text-[#bc9c22] font-black uppercase tracking-widest text-xs">Syncing Archive...</div>
          ) : slug && post ? (
            
            /* --- ARTICLE VIEW --- */
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-32 max-w-7xl mx-auto">
              <Link to="/news" className="text-[#bc9c22] text-[10px] font-bold uppercase tracking-widest hover:opacity-60 transition-all mb-8 md:mb-12 inline-block border-b border-[#bc9c22]/20 pb-1">
                ← Return to Journal
              </Link>
              
              <div className="flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-24">
                <aside className="lg:w-1/3 lg:sticky lg:top-32 h-fit order-1">
                  <h1 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-[0.95] mb-6 md:mb-8 text-white">{post.title}</h1>
                  
                  <div className="flex flex-col gap-6 md:gap-8 border-t border-zinc-800 pt-6 md:pt-8">
                    <div className="flex flex-col gap-1 md:gap-2">
                      <span className="text-zinc-500 text-[8px] md:text-[9px] uppercase font-bold tracking-[0.3em]">Issue Date</span>
                      <span className="text-[#bc9c22] text-xs md:text-sm font-bold uppercase italic">{new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>

                    {post.author && (
                      <div className="flex flex-col gap-1 md:gap-2 border-t border-zinc-900 pt-4 md:pt-6">
                        <span className="text-zinc-500 text-[8px] md:text-[9px] uppercase font-bold tracking-[0.3em]">Written By</span>
                        <p className="text-zinc-300 text-[10px] md:text-xs font-medium leading-relaxed uppercase tracking-tight whitespace-pre-line">
                          {post.author}
                        </p>
                      </div>
                    )}
                  </div>
                </aside>

                <div className="lg:w-2/3 order-2">
                  <div className="border-t-4 border-[#800000] pt-6 md:pt-8 mb-10 md:mb-16">
                    <img src={urlFor(post.mainImage).url()} className="w-full h-auto shadow-2xl border border-white/5" alt={post.title} />
                  </div>
                  <div className="prose prose-invert max-w-none text-zinc-400 font-light leading-relaxed space-y-8 md:space-y-10">
                    <PortableText value={post.body} components={ptComponents} />
                  </div>
                </div>
              </div>
            </motion.div>

          ) : (
            /* --- GRID VIEW --- */
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12 xl:gap-20">
              
              {/* BRANDING LEFT: Normal alignment on Mobile, Cross on Desktop */}
              <aside className="lg:w-[250px] lg:sticky lg:top-32 h-fit flex flex-col items-start justify-center py-6 lg:py-0">
                
                {/* Mobile: Standard horizontal text */}
                <div className="block lg:hidden">
                    <h1 className="text-3xl font-black uppercase tracking-[0.2em] text-white">
                        SOFEA <span className="text-[#800000]">NEWS</span>
                    </h1>
                    <p className="text-[#bc9c22] text-[8px] font-bold tracking-[0.5em] mt-2">THE JOURNAL</p>
                </div>

                {/* Desktop: The Cinematic Cross Layout */}
                <div className="hidden lg:flex relative font-black uppercase items-center justify-start text-white">
                  <h1 className="text-[clamp(2rem,6vw,4rem)] leading-none tracking-[0.1em] flex items-center">
                    <span>SOF</span>
                    <span className="text-[#800000] relative inline-flex items-center justify-center w-[1.1em]">
                      E
                      <span className="absolute bottom-[98%] left-1/2 -translate-x-1/2 text-[#800000]">N</span>
                      <div className="absolute top-[98%] left-1/2 -translate-x-1/2 flex flex-col items-center text-[#800000]">
                        <span className="leading-[0.85]">W</span>
                        <span className="leading-[0.85] relative">
                          S
                          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap text-[#bc9c22] text-[7px] font-bold tracking-[0.5em] opacity-80 uppercase">
                            THE JOURNAL
                          </span>
                        </span>
                      </div>
                    </span>
                    <span>A</span>
                  </h1>
                </div>
              </aside>

              {/* GRID RIGHT */}
              <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16 pb-32 relative z-20">
                {news.map((item, index) => (
                  <Link to={`/news/${item.slug}`} key={index} className="group flex flex-col">
                    <div className="aspect-[4/3] mb-5 md:mb-6 overflow-hidden bg-zinc-900 border border-white/5 shadow-xl transition-all duration-700 group-hover:border-[#bc9c22]/50">
                      <img src={urlFor(item.mainImage).url()} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="" />
                    </div>
                    <div className="flex items-center gap-3 mb-2 md:mb-3 text-[#800000]">
                      <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-widest italic">{new Date(item.publishedAt).toLocaleDateString('en-GB')}</span>
                      <div className="h-[1px] flex-grow bg-zinc-800 group-hover:bg-[#bc9c22] transition-all" />
                    </div>
                    <h3 className="text-sm md:text-base font-black uppercase tracking-tight text-white group-hover:text-[#bc9c22] transition-colors leading-tight">{item.title}</h3>
                    <p className="text-zinc-500 text-[9px] md:text-[10px] line-clamp-2 mt-2 md:mt-3 italic font-light leading-relaxed">{item.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default News;