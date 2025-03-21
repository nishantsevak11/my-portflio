
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
  onVisible?: (id: string) => void;
}

const Section = ({ id, title, subtitle, className = "", children, onVisible }: SectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  
  useEffect(() => {
    if (isInView && onVisible) {
      onVisible(id);
    }
  }, [isInView, id, onVisible]);
  
  return (
    <section
      id={id}
      ref={ref}
      className={`min-h-screen py-16 md:py-24 px-4 relative ${className}`}
    >
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 relative"
        >
          {subtitle && (
            <div className="mb-2">
              <span className="inline-block py-1 px-3 text-xs font-bold bg-titan-ember/20 border border-titan-ember/40 text-titan-ember uppercase tracking-widest">
                {subtitle}
              </span>
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-orbitron relative inline-block">
            <div className="mb-2">{title}</div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="h-[3px] bg-titan-ember"
            />
          </h2>
        </motion.div>
        
        {children}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-[30%] h-[2px] bg-gradient-to-r from-titan-ember/60 to-transparent" />
      <div className="absolute top-20 right-0 w-[30%] h-[2px] bg-gradient-to-l from-titan-ember/60 to-transparent" />
      
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                 w-[2px] h-24 bg-gradient-to-b from-titan-ember/80 to-transparent
                 hidden md:block" 
      />
    </section>
  );
};

export default Section;
