import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  className = "",
  ...props 
}) => {
  const directions = {
    up: { y: 60, opacity: 0 },
    down: { y: -60, opacity: 0 },
    left: { x: 60, opacity: 0 },
    right: { x: -60, opacity: 0 },
    scale: { scale: 0.8, opacity: 0 },
    fade: { opacity: 0 }
  };

  return (
    <motion.div
      initial={directions[direction]}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;