import React, { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa"; // Added icons

const CommunitySection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://feeds.behold.so/5HiYWRNgV3BzqnQTjRgy")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.posts) setPosts(data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Feed Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-24 text-white">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Our Community</h2>
        <p className="text-zinc-500 uppercase text-[10px] tracking-[0.3em]">Connect with us on social media</p>
      </div>

      {/* --- SECTION 1: SOCIALS --- */}
      <div className="relative flex flex-col md:flex-row gap-8 items-start">
        <div className="hidden md:flex absolute -left-12 h-full w-10 flex-col items-center">
          <div className="h-full w-[1px] bg-zinc-800/60 absolute left-1/2 -translate-x-1/2"></div>
          <h3 className="sticky top-40 [writing-mode:vertical-lr] rotate-180 text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-bold bg-[#0a0a0a] py-4 z-10">
            Socials
          </h3>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Instagram Card */}
          <a 
            href="https://www.instagram.com/sofea.utmkl" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative bg-zinc-900/40 p-12 rounded-[2.5rem] border border-zinc-800 overflow-hidden transition-all duration-500 min-h-[220px] flex flex-col justify-end"
          >
            {/* Instagram Hover Gradient Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"></div>
            
            <div className="relative z-10">
              <FaInstagram className="text-3xl mb-4 text-zinc-400 group-hover:text-white transition-colors duration-300" />
              <h4 className="font-bold text-xl mb-1 group-hover:text-white transition-colors">Instagram</h4>
              <p className="text-zinc-500 text-sm group-hover:text-white/80 transition-colors">Follow our latest updates</p>
            </div>
            <div className="absolute top-8 right-8 text-zinc-600 group-hover:text-white z-10 transition-colors">↗</div>
          </a>

          {/* LinkedIn Card */}
          <a 
            href="https://www.linkedin.com/company/universiti-teknologi-malaysia-sofea-club/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative bg-zinc-900/40 p-12 rounded-[2.5rem] border border-zinc-800 overflow-hidden transition-all duration-500 min-h-[220px] flex flex-col justify-end"
          >
            {/* LinkedIn Hover Color Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#0077b5]"></div>
            
            <div className="relative z-10">
              <FaLinkedin className="text-3xl mb-4 text-zinc-400 group-hover:text-white transition-colors duration-300" />
              <h4 className="font-bold text-xl mb-1 group-hover:text-white transition-colors">LinkedIn</h4>
              <p className="text-zinc-500 text-sm group-hover:text-white/80 transition-colors">Connect professionally</p>
            </div>
            <div className="absolute top-8 right-8 text-zinc-600 group-hover:text-white z-10 transition-colors">↗</div>
          </a>
        </div>
      </div>

      {/* --- SECTION 2: RECENT FEED --- */}
      <div className="relative flex flex-col md:flex-row gap-8 items-start">
        <div className="hidden md:flex absolute -left-12 h-full w-10 flex-col items-center">
          <div className="h-full w-[1px] bg-zinc-800/60 absolute left-1/2 -translate-x-1/2"></div>
          <h3 className="sticky top-40 [writing-mode:vertical-lr] rotate-180 text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-bold bg-[#0a0a0a] py-4 z-10">
            Recent Feed
          </h3>
        </div>

        <div className="md:hidden flex items-center gap-3 w-full mb-4">
          <div className="h-[1px] w-8 bg-[#800000]"></div>
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Recent Feed</h3>
        </div>

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
          {loading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="aspect-square bg-zinc-900/50 rounded-3xl animate-pulse border border-zinc-800" />
            ))
          ) : (
            posts.slice(0, 5).map((post) => (
              <a 
                key={post.id} 
                href={post.permalink} 
                target="_blank" 
                rel="noreferrer"
                className="group relative aspect-square bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-800/50 hover:border-zinc-500 transition-all duration-500"
              >
                <img 
                  src={post.mediaType === "VIDEO" ? post.thumbnailUrl : post.mediaUrl} 
                  alt="Feed Item" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" 
                />
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;