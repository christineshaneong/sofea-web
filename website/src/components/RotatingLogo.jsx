import React from 'react';
import sofeaLogo from '../assets/sofea-logo.png'; 

const RotatingLogo = () => {
  const phrase = "MJIIT * SOFTWARE * ENGINEERING * SOCIETY * UTM * KL * ";

  return (
    <div className="relative w-72 h-72 md:w-[500px] md:h-[500px] flex items-center justify-center group cursor-default">
      
      {/* 1. CENTRAL LOGO */}
      <div className="absolute z-20 w-56 h-56 md:w-[380px] md:h-[380px] flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
        <img 
          src={sofeaLogo} 
          alt="SOFEA Logo" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* 2. THE FIXED ROTATING RING */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          animation: 'spin var(--rotation-speed, 20s) linear infinite',
        }}
      >
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .group:hover div {
              --rotation-speed: 8s; 
            }
          `}
        </style>
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <defs>
            <path 
              id="textCircle" 
              d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" 
              fill="none"
            />
          </defs>
          <text 
            className="fill-white/30 font-black uppercase transition-all duration-500 group-hover:fill-[#bc9c22]"
            style={{ 
              fontSize: '2px', 
              letterSpacing: '0.3em' // High letter spacing for maximum clarity
            }}
          >
            <textPath 
              href="#textCircle" 
              textLength="263.8" // Exact circumference for r=42
              spacing="exact"    // FORCES the browser to honor the spacing
              method="stretch"   // Ensures letters don't clump at the start/end
            >
              {phrase}{phrase}{phrase}
            </textPath>
          </text>
        </svg>
      </div>
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[#bc9c22]/5 rounded-full blur-[80px] -z-10 transition-opacity duration-700 group-hover:opacity-100" />
    </div>
  );
};

export default RotatingLogo;