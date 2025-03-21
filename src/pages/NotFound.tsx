
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Background from "../components/Background";
import Cursor from "../components/Cursor";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Cursor />
      <Background />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glow-card max-w-2xl mx-auto text-center py-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-titan-ember/20 border-2 border-titan-ember flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-titan-ember" />
            </div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-orbitron mb-4 forge-text"
          >
            404
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-[3px] bg-titan-ember mx-auto mb-6 max-w-xs"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/80 mb-8"
          >
            The page you're looking for has been dismantled or never existed.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="titan-button inline-flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Core Reactor</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
