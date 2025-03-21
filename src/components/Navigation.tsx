
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Briefcase, User, Cpu, Send, Menu, X } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const sections = [
    { id: "home", name: "Core Reactor", icon: <Flame className="w-5 h-5" /> },
    { id: "portfolio", name: "Arsenal Vault", icon: <Briefcase className="w-5 h-5" /> },
    { id: "about", name: "Titan Spine", icon: <User className="w-5 h-5" /> },
    { id: "skills", name: "Pulse Engines", icon: <Cpu className="w-5 h-5" /> },
    { id: "contact", name: "War Horn", icon: <Send className="w-5 h-5" /> }
  ];
  
  // Calculate scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrolled / windowHeight;
      setScrollProgress(progress);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsOpen(false);
    
    // Add some rumble effect
    document.body.classList.add("animate-rumble");
    setTimeout(() => {
      document.body.classList.remove("animate-rumble");
    }, 500);
  };
  
  return (
    <>
      {/* Mobile Navigation Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-4 right-4 z-40 p-2 rounded-full bg-titan-dark border border-titan-ember md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="text-titan-ember" /> : <Menu className="text-titan-ember" />}
      </motion.button>
      
      {/* Progress Indicator */}
      <div className="fixed left-0 top-0 h-1 bg-titan-ember z-40" style={{ width: `${scrollProgress * 100}%` }} />
      
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 hidden md:block"
      >
        <div className="glass-effect border-b border-titan-ember/30">
          <div className="container mx-auto flex justify-center">
            <ul className="flex space-x-1">
              {sections.map((section) => (
                <motion.li key={section.id} className="relative">
                  <button
                    onClick={() => handleSectionClick(section.id)}
                    className={`py-4 px-6 flex items-center space-x-2 transition-all duration-300 ${
                      activeSection === section.id 
                        ? "text-titan-ember" 
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {section.icon}
                    <span className="font-orbitron text-sm tracking-wider">{section.name}</span>
                  </button>
                  
                  {/* Active indicator */}
                  {activeSection === section.id && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-titan-ember"
                    />
                  )}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 md:hidden glass-effect"
          >
            <div className="h-full flex flex-col justify-center items-center">
              <ul className="space-y-6 w-full max-w-xs">
                {sections.map((section) => (
                  <motion.li
                    key={section.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * sections.indexOf(section) }}
                  >
                    <button
                      onClick={() => handleSectionClick(section.id)}
                      className={`w-full py-4 px-6 flex items-center space-x-4 transition-all duration-300 
                        ${activeSection === section.id 
                          ? "bg-titan-ember/20 border-l-4 border-titan-ember" 
                          : "border-l-4 border-transparent"
                        }`}
                    >
                      <div className={`${
                        activeSection === section.id 
                          ? "text-titan-ember" 
                          : "text-white/70"
                      }`}>
                        {section.icon}
                      </div>
                      <span className={`font-orbitron text-xl ${
                        activeSection === section.id 
                          ? "text-titan-ember" 
                          : "text-white/90"
                      }`}>
                        {section.name}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
