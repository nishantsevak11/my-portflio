
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Flame, 
  Cpu, 
  ArrowDown, 
  Github, 
  Linkedin, 
  Twitter, 
  AtSign,
  ChevronRight,
  Briefcase,
  User
} from "lucide-react";

// Custom components
import Cursor from "../components/Cursor";
import Background from "../components/Background";
import EntryAnimation from "../components/EntryAnimation";
import Navigation from "../components/Navigation";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";

const Index = () => {
  const [showEntryAnimation, setShowEntryAnimation] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [developerName] = useState("NISHANT SEVAK");
  
  const handleSectionVisible = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleEntryAnimationComplete = () => {
    setShowEntryAnimation(false);
    // Play background ambient sound
    const ambientAudio = new Audio("/entry.wav");
    ambientAudio.volume = 0.2;
    ambientAudio.loop = false;
    ambientAudio.play().catch(() => {});
  };

  // Sample project data
  const projects = [
    {
      title: "Personalized Quotes Sender",
      description: "A Platform where user can register and we send AI Sends Personalized quates daily in the morning , the platform asks some question about their like or routine for better understand the user and sends more personalized quates",
      tags: ["AI", "React", "Nodejs", "Express.js", "MongoDb", "JWT"],
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80",
      demoUrl: "https://savera-red.vercel.app/",
      repoUrl: "#"
    },
    {
      title: "AI Resume Builder",
      description: "Developed an AI-powered resume-building platform with a chatbot interface that dynamically generates ATS-optimized resumes based on user input AI driven resume generation tailored to job roles ATS-friendly formatting with keyword optimization",
      tags: ["Next.js", "MongoDB", "GEMENI API", "Auth.js",  "React", "Node.js"],
      imageUrl: "https://images.unsplash.com/photo-1602407294553-6ac9170b3ed0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdW1lfGVufDB8fDB8fHww",
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      title: "Titan Dashboard",
      description: "Enterprise analytics platform that processes billions of data points in real-time. Features interactive visualizations and predictive analytics powered by machine learning algorithms.",
      tags: ["Next.js", "MongoDB", "GEMENI API", "Auth.js",  "React", "Node.js", "ShadCn"],
      imageUrl: "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      demoUrl: "https://note-app-eta-five.vercel.app/",
      repoUrl: "#"
    }
  ];

  // Skills data
  const skills = [
    {
      category: "Frontend",
      items: ["React", "JavaScript", "TypeScript", "Next.js"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Python"]
    },
    {
      category: "Database",
      items: ["PostgreSQL", "MongoDB", "MySQL"]
    },
    // {
    //   category: "DevOps",
    //   items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"]
    // },
    // {
    //   category: "Other",
    //   items: ["GraphQL", "WebSockets", "Microservices", "Machine Learning", "Blockchain"]
    // }
  ];
  
  return (
    <div className="relative">
      {/* Custom cursor */}
      <Cursor />
      
      {/* Dynamic background */}
      <Background />
      
      {/* Entry animation */}
      {showEntryAnimation && (
        <EntryAnimation 
          onComplete={handleEntryAnimationComplete} 
          developerName={developerName}
        />
      )}
      
      {/* Main content */}
      <AnimatePresence>
        {!showEntryAnimation && (
          <>
            {/* Navigation */}
            <Navigation 
              activeSection={activeSection}
              onSectionChange={scrollToSection}
            />
            
            {/* Core Reactor (Home) */}
            <Section 
              id="home" 
              title="NISHANT SEVAK" 
              subtitle="I am "
              onVisible={handleSectionVisible}
              className="flex items-center justify-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Left column - Reactor visualization */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative flex justify-center"
                >
                  <div className="relative w-64 h-64 md:w-80 md:h-80">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-titan-ember animate-pulse-ember" />
                    
                    {/* Middle ring rotating */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-8 rounded-full border-2 border-dashed border-titan-electric"
                    />
                    
                    {/* Inner core */}
                    <div className="absolute inset-16 rounded-full bg-gradient-to-br from-titan-ember to-titan-molten animate-pulse-ember flex items-center justify-center">
                      {/* Core content - Developer initials */}
                      <span className="text-5xl font-orbitron font-black text-white">TA</span>
                    </div>
                    
                    {/* Orbiting nodes */}
                    {["portfolio", "about", "skills", "contact"].map((section, i) => (
                      <motion.div
                        key={section}
                        initial={{ rotate: i * 90 }}
                        animate={{ rotate: i * 90 + 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                          <button 
                            onClick={() => scrollToSection(section)}
                            className="w-10 h-10 rounded-full bg-titan-dark border-2 border-titan-electric flex items-center justify-center titan-shadow hover:border-titan-ember transition-colors duration-300"
                          >
                            {section === "portfolio" && <Briefcase className="w-5 h-5 text-titan-electric" />}
                            {section === "about" && <User className="w-5 h-5 text-titan-electric" />}
                            {section === "skills" && <Cpu className="w-5 h-5 text-titan-electric" />}
                            {section === "contact" && <AtSign className="w-5 h-5 text-titan-electric" />}
                          </button>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Right column - Text content */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-left"
                >
                  <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-6">
                    <span className="forge-text">SOFTWARE</span><br />
                    <span className="text-white">DEVELOPER</span>
                  </h1>
                  
                  <p className="text-lg text-white/80 mb-8 leading-relaxed">
                    Building high-performance, scalable applications with modern technologies.
                    Transforming complex challenges into elegant solutions.
                  </p>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => scrollToSection("portfolio")}
                      className="titan-button"
                    >
                      View Arsenal
                    </button>
                    
                    <button 
                      onClick={() => scrollToSection("contact")}
                      className="node-button"
                    >
                      Contact
                    </button>
                  </div>
                  
                  {/* Social links */}
                  <div className="mt-12 flex gap-6">
                    <a href="#" className="text-white/60 hover:text-titan-electric transition-colors duration-300">
                      <Github className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-white/60 hover:text-titan-electric transition-colors duration-300">
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-white/60 hover:text-titan-electric transition-colors duration-300">
                      <Twitter className="w-6 h-6" />
                    </a>
                  </div>
                </motion.div>
              </div>
              
              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-[-15vh] left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              >
                <span className="text-white/60 text-sm mb-2 font-orbitron">Scroll Down</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown className="w-5 h-5 text-titan-ember" />
                </motion.div>
              </motion.div>
            </Section>
            
            {/* Arsenal Vault (Portfolio) */}
            <Section 
              id="portfolio" 
              title="ARSENAL VAULT" 
              subtitle="Projects"
              onVisible={handleSectionVisible}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <ProjectCard {...project} />
                  </motion.div>
                ))}
              </div>
            </Section>
            
            {/* Titan Spine (About) */}
            <Section 
              id="about" 
              title="TITAN SPINE" 
              subtitle="About Me"
              onVisible={handleSectionVisible}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Left column - Image/Avatar */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative"
                >
                  <div className="relative aspect-square max-w-md mx-auto overflow-hidden">
                    <div className="absolute inset-2 z-10 border-2 border-titan-ember" />
                    <div className="absolute inset-0 bg-titan-dark/50" />
                    
                    {/* Avatar image placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-titan-dark to-titan-metal flex items-center justify-center">
                      <Flame className="w-32 h-32 text-titan-ember" />
                    </div>
                    
                    {/* Scan line effect */}
                    <div className="scan-effect absolute inset-0 opacity-60" />
                  </div>
                </motion.div>
                
                {/* Right column - Timeline/About content */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-6"
                  >
                    <p className="text-lg text-white/80 leading-relaxed">
                      I'm a passionate software developer with over 7 years of experience building
                      scalable, high-performance applications. My expertise spans the full stack,
                      from frontend interfaces to backend systems and infrastructure.
                    </p>
                    
                    <p className="text-lg text-white/80 leading-relaxed">
                      I specialize in creating solutions that balance technical excellence with
                      user experience. My approach combines innovative thinking with pragmatic execution,
                      ensuring projects deliver both immediate value and long-term sustainability.
                    </p>
                  </motion.div>
                  
                  {/* Timeline/Memory plates */}
                  <div className="mt-12 relative border-l-2 border-titan-ember/50 pl-8 space-y-12">
                    {/* Timeline nodes */}
                    {[
                      { year: "2025", title: "Full Stack Developer", subtitle: "Reetape Technologies" },
                      // { year: "2020", title: "Senior Developer", subtitle: "Tech Innovations" },
                      // { year: "2017", title: "Software Engineer", subtitle: "Digital Forge" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative"
                      >
                        {/* Timeline dot */}
                        <div className="absolute -left-[39px] top-0 w-5 h-5 rounded-full bg-titan-ember" />
                        
                        {/* Content */}
                        <div className="glow-card">
                          <div className="text-sm text-titan-electric font-bold mb-1">
                            {item.year}
                          </div>
                          <h3 className="text-xl font-orbitron mb-2">
                            {item.title}
                          </h3>
                          <p className="text-white/70">{item.subtitle}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>
            
            {/* Pulse Engines (Skills) */}
            <Section 
              id="skills" 
              title="PULSE ENGINES" 
              subtitle="Skills"
              onVisible={handleSectionVisible}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="glow-card group"
                  >
                    <div className="relative">
                      {/* Skill engine visualization */}
                      <div className="mb-4 flex items-center">
                        <div className="w-12 h-12 rounded-full bg-titan-ember/20 border-2 border-titan-ember flex items-center justify-center mr-4">
                          <Cpu className="w-6 h-6 text-titan-ember" />
                        </div>
                        <h3 className="text-xl font-orbitron">{skill.category}</h3>
                      </div>
                      
                      {/* Progress bars */}
                      <div className="space-y-4">
                        {skill.items.map((item, i) => (
                          <div key={i} className="relative">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-white">{item}</span>
                              <span className="text-sm font-medium text-titan-electric">
                                {90 - i * 5}%
                              </span>
                            </div>
                            <div className="h-2 bg-titan-dark/50 rounded-sm overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${90 - i * 5}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="h-full bg-gradient-to-r from-titan-ember to-titan-electric"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Engine effect (pulsing light) */}
                      <div className="absolute top-6 right-4 w-2 h-2 rounded-full bg-titan-electric animate-pulse-ember" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>
            
            {/* War Horn (Contact) */}
            <Section 
              id="contact" 
              title="WAR HORN" 
              subtitle="Contact"
              onVisible={handleSectionVisible}
            >
              <div className="max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-center mb-12"
                >
                  <p className="text-lg text-white/80">
                    Ready to forge something epic together? Sound the horn and let's connect.
                  </p>
                </motion.div>
                
                {/* Contact form */}
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="glow-card space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Play horn sound
                    const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-war-horn-approaching-2737.mp3");
                    audio.volume = 0.3;
                    audio.play().catch(() => {});
                    
                    // Add animation to body
                    document.body.classList.add("animate-rumble");
                    setTimeout(() => {
                      document.body.classList.remove("animate-rumble");
                    }, 500);
                    
                    // Show success message
                    alert("Message sent successfully!");
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full p-3 bg-titan-dark/50 border border-titan-ember/30 focus:border-titan-electric focus:ring-1 focus:ring-titan-electric text-white outline-none transition-colors duration-200"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full p-3 bg-titan-dark/50 border border-titan-ember/30 focus:border-titan-electric focus:ring-1 focus:ring-titan-electric text-white outline-none transition-colors duration-200"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-white">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full p-3 bg-titan-dark/50 border border-titan-ember/30 focus:border-titan-electric focus:ring-1 focus:ring-titan-electric text-white outline-none transition-colors duration-200"
                      placeholder="How can I help you?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full p-3 bg-titan-dark/50 border border-titan-ember/30 focus:border-titan-electric focus:ring-1 focus:ring-titan-electric text-white outline-none transition-colors duration-200"
                      placeholder="Your message..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full titan-button"
                  >
                    SOUND THE HORN
                  </button>
                </motion.form>
                
                {/* Contact info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="mt-12 flex flex-wrap justify-center gap-6"
                >
                  <a href="mailto:contact@example.com" className="flex items-center gap-2 text-white/80 hover:text-titan-electric transition-colors duration-300">
                    <AtSign className="w-5 h-5" />
                    <span>contact@example.com</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-white/80 hover:text-titan-electric transition-colors duration-300">
                    <Linkedin className="w-5 h-5" />
                    <span>linkedin.com/in/example</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-white/80 hover:text-titan-electric transition-colors duration-300">
                    <Github className="w-5 h-5" />
                    <span>github.com/example</span>
                  </a>
                </motion.div>
              </div>
            </Section>
            
            {/* Footer */}
            <footer className="py-8 border-t border-titan-ember/30">
              <div className="container mx-auto px-4 text-center">
                <p className="text-white/60 font-orbitron text-sm">
                  © {new Date().getFullYear()} THEO ARMSTRONG. ALL RIGHTS RESERVED.
                </p>
              </div>
            </footer>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
