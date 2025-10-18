import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export function TestimonialCard({ handleShuffle, testimonial, position, id, author, companyLogo, companyName }) {
  const dragRef = useRef(0);
  const isFront = position === "front";

  // Handle tap/click on mobile to shuffle
  const handleTap = () => {
    if (isFront && window.innerWidth < 640) {
      handleShuffle();
    }
  };

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0"
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%"
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onDragStart={(e) => {
        dragRef.current = e.clientX || e.touches?.[0]?.clientX || 0;
      }}
      onDragEnd={(e) => {
        const endX = e.clientX || e.changedTouches?.[0]?.clientX || 0;
        if (dragRef.current - endX > 100) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      onTap={handleTap}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[380px] w-[280px] sm:h-[420px] sm:w-[320px] md:h-[450px] md:w-[350px] select-none place-content-center space-y-4 sm:space-y-5 md:space-y-6 rounded-2xl border-2 border-white/20 bg-black/40 backdrop-blur-xl p-4 sm:p-5 md:p-6 shadow-xl ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      {/* Company Logo */}
      <div className="flex justify-center">
        <img
          src={companyLogo}
          alt={`${companyName} logo`}
          className="pointer-events-none h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full border-2 border-[#00FFD1]/50 bg-white/10 object-contain p-2"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&size=128&background=00FFD1&color=000`;
          }}
        />
      </div>
      
      {/* Testimonial Text */}
      <span className="text-center text-sm sm:text-base md:text-lg italic text-white/90 leading-relaxed line-clamp-6">
        "{testimonial}"
      </span>
      
      {/* Author & Company */}
      <div className="text-center">
        <span className="block text-xs sm:text-sm font-medium text-[#00FFD1]">{author}</span>
        <span className="block text-[10px] sm:text-xs text-white/60 mt-1">{companyName}</span>
      </div>
    </motion.div>
  );
}
