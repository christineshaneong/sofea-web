import React, { useEffect, useRef } from 'react';

const MouseTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        // The "boldness" of the trail
        this.size = Math.random() * 6 + 2; 
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.color = '128, 0, 0'; // Maroon / Deep Red
        this.alpha = 1; // Start fully visible
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        // How fast it disappears (higher = shorter trail)
        this.alpha -= 0.025; 
        if (this.size > 0.2) this.size -= 0.1;
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // The Glow Effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${this.color}, ${this.alpha})`;
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        
        ctx.fill();
        ctx.restore();
      }
    }

    const handleMouseMove = (e) => {
      // Spawn 3 particles per move for a thick, bold feel
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] block"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default MouseTrail;