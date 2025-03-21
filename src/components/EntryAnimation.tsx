
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EntryAnimationProps {
  onComplete: () => void;
  developerName: string;
}

const EntryAnimation = ({ onComplete, developerName }: EntryAnimationProps) => {
  const [stage, setStage] = useState(0);
  
  useEffect(() => {
    // Add initial overflow hidden to body
    document.body.style.overflow = "hidden";
    
    // Audio setup (optional)
    const audio = new Audio();
    audio.volume = 0.4;
    
    // Animation sequence
    const sequence = [
      () => {
        // Stage 0: Initial crack
        audio.src = "/s2.wav";
        audio.play().catch(() => {});
        setTimeout(() => setStage(1), 2000);
      },
      () => {
        // Stage 1: Eye opens
        audio.src = "/s1.wav";
        audio.play().catch(() => {});
        setTimeout(() => setStage(2), 3000);
      },
      () => {
        // Stage 2: Name appears
        audio.src = "/s3.wav";
        audio.play().catch(() => {});
        setTimeout(() => setStage(3), 3000);
      },
      () => {
        // Stage 3: Final fadeout
        setTimeout(() => {
          onComplete();
          document.body.style.overflow = "auto";
        }, 1500);
      }
    ];
    
    // Start the sequence
    sequence[stage]();
    
    return () => {
      audio.pause();
      document.body.style.overflow = "auto";
    };
  }, [stage, onComplete]);
  
  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div 
          key="entry-animation"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background cracks */}
            {stage >= 0 && (
              <div className="absolute inset-0 pointer-events-none">
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M50,0 L48,20 L52,40 L47,60 L53,80 L50,100"
                    stroke="#FF4500"
                    strokeWidth="0.3"
                    fill="none"
                  />
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
                    d="M0,50 L20,48 L40,52 L60,47 L80,53 L100,50"
                    stroke="#FF4500"
                    strokeWidth="0.3"
                    fill="none"
                  />
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
                    d="M0,0 L25,25 L50,0 L75,25 L100,0"
                    stroke="#FF4500"
                    strokeWidth="0.3"
                    fill="none"
                  />
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.9 }}
                    d="M0,100 L25,75 L50,100 L75,75 L100,100"
                    stroke="#FF4500"
                    strokeWidth="0.3"
                    fill="none"
                  />
                </svg>
              </div>
            )}
            
            {/* Eye */}
            {stage >= 1 && (
              <div className="relative w-64 h-64">
                {/* Outer Ring */}
                <motion.div 
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 border-4 border-titan-ember rounded-full overflow-hidden flex items-center justify-center"
                >
                  {/* Eye background */}
                  <div className="absolute inset-2 bg-titan-dark rounded-full flex items-center justify-center overflow-hidden">
                    {/* Iris */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-titan-ember to-titan-molten flex items-center justify-center"
                    >
                      {/* Pupil */}
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 1, delay: 1, times: [0, 0.7, 1] }}
                        className="w-16 h-16 bg-black rounded-full"
                      />
                    </motion.div>
                    
                    {/* Gleam */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                      className="absolute top-1/4 right-1/4 w-6 h-6 bg-white rounded-full blur-[2px]"
                    />
                  </div>
                </motion.div>
                
                {/* Eyelid animation */}
                <motion.div 
                  initial={{ height: "50%" }}
                  animate={{ height: "0%" }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                  className="absolute inset-x-0 top-0 bg-black z-10"
                />
                <motion.div 
                  initial={{ height: "50%" }}
                  animate={{ height: "0%" }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                  className="absolute inset-x-0 bottom-0 bg-black z-10"
                />
              </div>
            )}
            
            {/* Name */}
            {stage >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute mt-40"
              >
                <h1 className="text-5xl md:text-7xl font-orbitron font-black tracking-wider">
                  <span className="inline-block relative overflow-hidden">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="inline-block forge-text"
                    >
                      {developerName}
                    </motion.span>
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="absolute inset-0 bg-titan-ember/50 z-10"
                    />
                  </span>
                </h1>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1 }}
                  className="h-[3px] bg-titan-electric mt-2"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EntryAnimation;
