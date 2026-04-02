import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import client, { urlFor } from '../sanityClient';

const Slideshow = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Fetch the images from Sanity
    client
      .fetch(`*[_type == "siteAssets"][0].homeSlideshow`)
      .then((data) => {
        if (data && data.length > 0) {
          const urls = data.map((img) => urlFor(img).url());
          setImages(urls);
        }
      })
      .catch((err) => {
        console.error("Sanity Fetch Error:", err);
      });
  }, []);

  useEffect(() => {
    // If no images or only one, don't start the timer
    if (images.length <= 1) return;

    // Set to 4000ms (4 seconds) for a faster rotation
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="absolute top-0 left-0 z-[-1] w-full h-[100vh] overflow-hidden bg-[#1a0000]">
      {/* ANIMATED IMAGES 
          We only wrap the image in AnimatePresence, not the whole component.
          This ensures the background and overlays are visible from Frame 1.
      */}
      <AnimatePresence mode="wait">
        {images.length > 0 && (
          <motion.img
            key={images[index]}
            src={images[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // 0.8s duration makes the crossfade feel much more responsive
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full object-cover object-center saturate-[0.2]"
            alt={`Slide ${index + 1}`}
            loading="eager"
          />
        )}
      </AnimatePresence>
      
      {/* INSTANT OVERLAYS
          These render immediately so the user sees the "SOFEA look" 
          even before the first image finishes downloading.
      */}
      
      {/* Maroon Tint Layer */}
      <div className="absolute inset-0 bg-[#800000] mix-blend-multiply opacity-70" />
      
      {/* Dark gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40" />
      
      {/* Subtle Grain Texture (Optional - adds a premium feel to the "blank" state) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default Slideshow;