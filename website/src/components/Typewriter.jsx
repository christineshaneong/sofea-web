import React from 'react';
import { motion } from 'framer-motion';

const ModernReveal = ({ lines }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] // Custom "Expo" ease for that premium feel
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center lg:items-start overflow-hidden"
    >
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden mb-1"> 
          <motion.span
            variants={item}
            className="block text-[11vw] md:text-[100px] font-black uppercase tracking-tighter leading-[0.85] italic"
          >
            {line === "UTM KL" ? (
              <>UTM <span className="text-[#800000]">KL</span></>
            ) : line}
          </motion.span>
        </div>
      ))}
      
      {/* Subtle underline reveal */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="h-[2px] bg-[#bc9c22] mt-6"
      />
    </motion.div>
  );
};

export default ModernReveal;