
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
}

const ProjectCard = ({ title, description, tags, imageUrl, demoUrl, repoUrl }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    // Play sound effect
    const audio = new Audio("/s4.wav");
    audio.volume = 0.3;
    audio.play().catch(() => {});
    
    setIsExpanded(!isExpanded);
  };
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onClick={toggleExpand}
        className="glow-card group cursor-none"
      >
        {/* Project thumbnail */}
        <div className="relative overflow-hidden h-48 -mx-6 -mt-6 mb-4">
          <div className="absolute inset-0 bg-gradient-to-t from-titan-dark via-transparent to-transparent z-10" />
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Scan effect overlay */}
          <div className="absolute inset-0 bg-titan-electric/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="scan-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Tags */}
          <div className="absolute bottom-2 left-2 z-10 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-titan-dark/80 border border-titan-ember/40 text-xs font-bold text-titan-electric"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-titan-dark/80 text-xs font-bold text-white/70">
                +{tags.length - 3}
              </span>
            )}
          </div>
        </div>
        
        {/* Title with angled background */}
        <div className="relative mb-3">
          <div className="bg-titan-ember/10 clip-angled h-8 w-full absolute -left-2" />
          <h3 className="font-orbitron text-xl relative z-10 tracking-wide text-left ml-2">
            {title}
          </h3>
        </div>
        
        {/* Short description */}
        <p className="text-sm text-white/80 line-clamp-2 text-left">
          {description}
        </p>
        
        {/* Call to action */}
        <div className="mt-4 flex justify-between items-center">
          <div className="w-2/3 h-[2px] bg-gradient-to-r from-titan-ember to-transparent" />
          <span className="text-xs uppercase tracking-widest text-titan-ember font-bold italic">
            Forge Open
          </span>
        </div>
      </motion.div>
      
      {/* Expanded project view */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/70"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-titan-dark max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded border border-titan-ember/50 shadow-xl shadow-titan-ember/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-titan-dark/80 border border-titan-ember"
              >
                <X className="w-5 h-5 text-titan-ember" />
              </button>
              
              {/* Project image header */}
              <div className="w-full h-72 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-titan-dark via-titan-dark/50 to-transparent z-10" />
                <img 
                  src={imageUrl} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h2 className="forge-text text-4xl font-black mb-2">{title}</h2>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-titan-dark/80 border border-titan-ember/40 text-xs font-bold text-titan-electric"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Project details */}
              <div className="p-6">
                <div className="prose prose-invert max-w-none">
                  <div className="mb-8">
                    <h3 className="text-xl font-orbitron mb-4 text-titan-electric">Project Overview</h3>
                    <p className="text-white/90">{description}</p>
                  </div>
                  
                  {/* Example of additional content */}
                  <div className="mb-8">
                    <h3 className="text-xl font-orbitron mb-4 text-titan-electric">Key Features</h3>
                    <ul className="list-disc pl-5 space-y-2 text-white/90">
                      <li>Advanced user interface with responsive design</li>
                      <li>Integrated API connections with real-time data processing</li>
                      <li>Performance optimized for all modern devices</li>
                      <li>Secure authentication system with multiple providers</li>
                    </ul>
                  </div>
                </div>
                
                {/* Project links */}
                <div className="flex flex-wrap gap-4 mt-6">
                  {demoUrl && (
                    <a 
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 node-button"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  
                  {repoUrl && (
                    <a 
                      href={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 node-button"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
