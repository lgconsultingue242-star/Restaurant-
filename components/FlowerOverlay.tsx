
import React from 'react';
import { motion } from 'framer-motion';

interface FlowerOverlayProps {
  theme: 'dark' | 'light';
}

const FlowerOverlay: React.FC<FlowerOverlayProps> = ({ theme }) => {
  const petals = Array.from({ length: 18 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-1000">
      {petals.map((_, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 100 100"
          className={`absolute w-8 h-8 transition-colors duration-1000 ${
            theme === 'dark' ? 'fill-amber-500/20' : 'fill-amber-900/10'
          }`}
          initial={{ 
            top: "-10%", 
            left: `${Math.random() * 100}%`,
            rotate: 0,
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0
          }}
          animate={{ 
            top: "110%",
            left: `${(Math.random() * 100) - 10}%`,
            rotate: 360,
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: Math.random() * 25 + 20, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 15 
          }}
        >
          <path d="M50 0 C60 20 80 30 80 50 C80 70 60 90 50 100 C40 90 20 70 20 50 C20 30 40 20 50 0" />
        </motion.svg>
      ))}
    </div>
  );
};

export default FlowerOverlay;
