
import { useEffect, useState, CSSProperties } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; life: number }[]>([]);
  const [particleId, setParticleId] = useState(0);

  useEffect(() => {
    const mMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Create particle on movement (randomly)
      if (Math.random() > 0.92) {
        const newParticle = {
          id: particleId,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 5 + 1,
          life: 20
        };
        setParticleId(prev => prev + 1);
        setParticles(prev => [...prev, newParticle]);
      }
    };
    
    const mDown = () => {
      setClicked(true);
      
      // Create burst of particles on click
      const burstCount = 8;
      const newParticles = [];
      
      for (let i = 0; i < burstCount; i++) {
        newParticles.push({
          id: particleId + i,
          x: position.x,
          y: position.y,
          size: Math.random() * 8 + 2,
          life: 30
        });
      }
      
      setParticleId(prev => prev + burstCount);
      setParticles(prev => [...prev, ...newParticles]);
      
      // Trigger a subtle rumble animation on body
      document.body.classList.add("animate-rumble");
      setTimeout(() => {
        document.body.classList.remove("animate-rumble");
      }, 500);
    };
    
    const mUp = () => setClicked(false);
    
    const mLeave = () => setHidden(true);
    const mEnter = () => setHidden(false);
    
    const handleLinkHover = () => setHovered(true);
    const handleLinkLeave = () => setHovered(false);
    
    document.addEventListener("mousemove", mMove);
    document.addEventListener("mousedown", mDown);
    document.addEventListener("mouseup", mUp);
    document.addEventListener("mouseleave", mLeave);
    document.addEventListener("mouseenter", mEnter);
    
    // Add event listeners to all interactive elements
    const interactiveElements = document.querySelectorAll("a, button, [role='button'], input, select, textarea");
    
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", handleLinkHover);
      el.addEventListener("mouseleave", handleLinkLeave);
    });
    
    // Update particles life and remove dead ones
    const particleInterval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({ ...p, life: p.life - 1 }))
          .filter(p => p.life > 0)
      );
    }, 40);
    
    return () => {
      document.removeEventListener("mousemove", mMove);
      document.removeEventListener("mousedown", mDown);
      document.removeEventListener("mouseup", mUp);
      document.removeEventListener("mouseleave", mLeave);
      document.removeEventListener("mouseenter", mEnter);
      
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleLinkHover);
        el.removeEventListener("mouseleave", handleLinkLeave);
      });
      
      clearInterval(particleInterval);
    };
  }, [position, particleId]);
  
  const cursorStyle: CSSProperties = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: `translate(-50%, -50%) scale(${clicked ? 0.7 : hovered ? 1.5 : 1})`,
    opacity: hidden ? 0 : 1,
    mixBlendMode: clicked ? "lighten" : "normal",
  };
  
  return (
    <>
      <div 
        className="fixed w-8 h-8 pointer-events-none z-50 transition-transform duration-100"
        style={cursorStyle}
      >
        <div className="absolute inset-0 bg-titan-ember rounded-full opacity-70 animate-pulse-ember" />
        <div className="absolute inset-1 bg-white rounded-full opacity-80" />
        {clicked && (
          <div className="absolute inset-[-8px] border-2 border-titan-ember rounded-full scale-110 animate-pulse-ember" />
        )}
        {hovered && (
          <div className="absolute inset-[-5px] border border-titan-electric rounded-full" />
        )}
      </div>
      
      {/* Ember particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.life / 30,
          }}
        />
      ))}
    </>
  );
};

export default Cursor;
