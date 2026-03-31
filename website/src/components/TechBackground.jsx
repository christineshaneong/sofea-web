import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const TechBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = {
    fpsLimit: 120,
    fullScreen: { enable: false }, 
    interactivity: {
      events: { onHover: { enable: true, mode: "grab" } },
      modes: { grab: { distance: 200, links: { opacity: 1 } } },
    },
    particles: {
      color: { value: ["#bc9c22", "#800000"] },
      links: {
        color: "#bc9c22",
        distance: 180,
        enable: true,
        opacity: 0.5,
        width: 1.5,
        triangles: { enable: false },
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "top-right",
        random: false,
        straight: true,
        outModes: { default: "out" },
      },
      number: { value: 90, density: { enable: true, area: 1000 } },
      opacity: { value: 0.7 },
      shape: { type: "square" },
      size: { value: { min: 2, max: 4 } },
    },
  };

  if (!init) return null;

  return (
    /* h-full and w-full ensures it stretches to the very top and bottom of the parent div */
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none bg-black">
      <Particles
        id="tsparticles-comp"
        options={particlesOptions}
        className="h-full w-full"
      />
      
      {/* Subtle overlay to make sure the particles don't make text hard to read */}
      <div className="absolute inset-0 bg-black/20 z-[1]"></div>
    </div>
  );
};

export default TechBackground;