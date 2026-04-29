import React from 'react';
import sofeaLogo from '../assets/sofea-logo.png'; 

const RotatingLogo = () => {
  const phrase = "MJIIT * SOFTWARE * ENGINEERING * ASSOCIATION * UTM * KL * ";

  return (
    /* Changed cursor-crosshair to cursor-default */
    <div className="relative w-72 h-72 md:w-[500px] md:h-[500px] flex items-center justify-center group cursor-default">
      
      {/* 1. LARGE CENTRAL LOGO */}
      <div className="absolute z-20 w-56 h-56 md:w-[380px] md:h-[380px] flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
        <img 
          src={sofeaLogo} 
          alt="SOFEA Logo" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* 2. TIGHT ROTATING RING */}
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
            /* Speed up only when hovering over the group */
            .group:hover div {
              --rotation-speed: 4s;
            }
          `}
        </style>
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <defs>
            <path 
              id="textCircle" 
              d="M 50, 50 m -41, 0 a 41,41 0 1,1 82,0 a 41,41 0 1,1 -82,0" 
              fill="none"
            />
          </defs>
          <text 
            className="fill-white/40 font-bold uppercase transition-colors duration-500 group-hover:fill-white/80"
            style={{ fontSize: '2.2px', letterSpacing: '0.1em' }}
          >
            <textPath 
              href="#textCircle" 
              textLength="266"
            >
              {phrase}{phrase}{phrase}
            </textPath>
          </text>
        </svg>
      </div>
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-sofea-gold/5 rounded-full blur-[80px] -z-10 transition-opacity duration-700 group-hover:opacity-100" />
    </div>
  );
};

export default RotatingLogo;