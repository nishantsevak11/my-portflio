
import { useEffect, useRef } from "react";

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    // Background setup
    const bgColor = "#0A0A0A";
    
    // Ember particles
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      life: number;
      maxLife: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5 - 0.1;  // Slight upward bias
        
        // Color between ember and electric
        const colorChoice = Math.random();
        if (colorChoice < 0.7) {
          this.color = `rgba(255, ${Math.floor(69 + Math.random() * 50)}, 0, ${0.4 + Math.random() * 0.6})`;  // Ember
        } else {
          this.color = `rgba(0, ${Math.floor(127 + Math.random() * 50)}, 255, ${0.3 + Math.random() * 0.5})`;  // Electric
        }
        
        this.life = 0;
        this.maxLife = 100 + Math.random() * 300;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Add slight upward drift
        if (Math.random() > 0.97) {
          this.speedY -= 0.01;
        }
        
        this.life++;
        
        // Reset particle when it leaves screen or dies
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height || this.life > this.maxLife) {
          this.x = Math.random() * canvas.width;
          this.y = canvas.height + 10;
          this.speedY = (Math.random() - 0.5) * 0.5 - 0.1;
          this.life = 0;
        }
      }
      
      draw() {
        // Calculate opacity based on life
        const opacity = this.life < 20 
          ? this.life / 20 
          : this.life > this.maxLife - 20 
            ? (this.maxLife - this.life) / 20
            : 1;
            
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(/[\d\.]+\)$/g, `${opacity})`);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
    
    // Create particles
    const particleCount = Math.min(Math.floor(canvas.width * canvas.height * 0.0001), 200);
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Electric veins
    class ElectricVein {
      points: { x: number; y: number }[];
      width: number;
      color: string;
      active: boolean;
      lifespan: number;
      currentLife: number;
      
      constructor() {
        this.points = [{ 
          x: Math.random() * canvas.width, 
          y: Math.random() * canvas.height 
        }];
        
        this.width = Math.random() * 2 + 0.5;
        this.color = Math.random() > 0.3 
          ? 'rgba(0, 127, 255, 0.6)' // Electric blue
          : 'rgba(255, 69, 0, 0.6)';  // Ember
        this.active = true;
        this.lifespan = 50 + Math.random() * 20;
        this.currentLife = 0;
        
        // Generate path
        this.generatePath();
      }
      
      generatePath() {
        const steps = 10 + Math.floor(Math.random() * 15);
        let currentPoint = this.points[0];
        
        for (let i = 0; i < steps; i++) {
          // Generate next point with random angle and distance
          const angle = Math.random() * Math.PI * 2;
          const distance = 20 + Math.random() * 50;
          
          const nextPoint = {
            x: currentPoint.x + Math.cos(angle) * distance,
            y: currentPoint.y + Math.sin(angle) * distance
          };
          
          this.points.push(nextPoint);
          currentPoint = nextPoint;
        }
      }
      
      update() {
        this.currentLife++;
        if (this.currentLife >= this.lifespan) {
          this.active = false;
        }
      }
      
      draw() {
        // Calculate opacity based on life
        const opacity = this.currentLife < 10 
          ? this.currentLife / 10 
          : this.currentLife > this.lifespan - 10 
            ? (this.lifespan - this.currentLife) / 10
            : 1;
        
        const currentColor = this.color.replace(/[\d\.]+\)$/g, `${opacity * 0.6})`);
        
        // Draw path
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        
        for (let i = 1; i < this.points.length; i++) {
          // Add some randomization to points for flicker effect
          const jitterX = Math.random() * 2 - 1;
          const jitterY = Math.random() * 2 - 1;
          
          ctx.lineTo(
            this.points[i].x + jitterX, 
            this.points[i].y + jitterY
          );
        }
        
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = this.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = currentColor;
        
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }
    
    // Manage veins
    const veins: ElectricVein[] = [];
    const MAX_VEINS = 8;
    
    // Animation loop
    const animate = () => {
      // Semi-transparent background to create trail effect
      ctx.fillStyle = `${bgColor}CC`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add vignette effect
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.5
      );
      gradient.addColorStop(0, 'rgba(10, 10, 10, 0)');
      gradient.addColorStop(1, 'rgba(10, 10, 10, 0.7)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Manage veins - randomly add new ones
      if (veins.length < MAX_VEINS && Math.random() > 0.97) {
        veins.push(new ElectricVein());
      }
      
      // Update and draw veins
      for (let i = veins.length - 1; i >= 0; i--) {
        veins[i].update();
        veins[i].draw();
        
        // Remove inactive veins
        if (!veins[i].active) {
          veins.splice(i, 1);
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[-1]"
    />
  );
};

export default Background;
