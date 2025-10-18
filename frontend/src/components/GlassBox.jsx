import React from 'react';

const GlassBox = ({ 
  children, 
  className = "", 
  blur = 12,
  opacity = 0.1,
  border = true,
  noise = false,
  hover = true,
  glow = false,
  shine = true, // New shine effect prop
  hoverScale = 1.02,
  ...props 
}) => {
  const baseClasses = `
    relative overflow-hidden transition-all duration-500 ease-out
    ${hover ? 'hover:shadow-2xl hover:shadow-cyan-500/10' : ''}
    ${glow ? 'hover:shadow-lg hover:shadow-cyan-400/20' : ''}
    ${shine ? 'group' : ''}
    ${className}
  `;

  const glassStyles = {
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: border ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
    transform: 'translateZ(0)', // Hardware acceleration
    willChange: 'transform, box-shadow, background-color',
  };

  return (
    <div
      className={baseClasses}
      style={glassStyles}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.transform = `scale(${hoverScale}) translateZ(0)`;
          e.currentTarget.style.background = `rgba(255, 255, 255, ${Math.min(opacity + 0.03, 0.25)})`;
          if (border) {
            e.currentTarget.style.borderColor = 'rgba(0, 255, 209, 0.3)';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'scale(1) translateZ(0)';
          e.currentTarget.style.background = `rgba(255, 255, 255, ${opacity})`;
          if (border) {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }
        }
      }}
      {...props}
    >
      {/* Shimmer shine effect */}
      {shine && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute -top-4 -left-4 w-6 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-[calc(100vw)] opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), rgba(0, 255, 209, 0.3), rgba(255, 255, 255, 0.4), transparent)',
              filter: 'blur(0.5px)'
            }}
          />
        </div>
      )}

      {/* Enhanced border gradient on hover */}
      {border && (
        <div className="absolute inset-0 rounded-inherit opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div 
            className="absolute inset-0 rounded-inherit"
            style={{
              background: 'linear-gradient(45deg, rgba(0, 255, 209, 0.2), rgba(142, 102, 255, 0.2), rgba(255, 110, 180, 0.2))',
              padding: '1px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'subtract',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'subtract'
            }}
          />
        </div>
      )}

      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-500 pointer-events-none">
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            background: 'linear-gradient(45deg, rgba(0, 255, 209, 0.1), rgba(142, 102, 255, 0.1), rgba(255, 110, 180, 0.1))',
          }}
        />
      </div>

      {/* Rotating shine effect */}
      {shine && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
          <div 
            className="absolute inset-0 animate-spin-slow"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(0, 255, 209, 0.2), transparent)',
              animationDuration: '8s'
            }}
          />
        </div>
      )}

      {/* Corner shine highlights */}
      {shine && (
        <>
          <div className="absolute top-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
            <div 
              className="w-full h-full"
              style={{
                background: 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.6), transparent 70%)',
              }}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
            <div 
              className="w-full h-full"
              style={{
                background: 'radial-gradient(circle at bottom right, rgba(0, 255, 209, 0.4), transparent 70%)',
              }}
            />
          </div>
        </>
      )}

      {/* Subtle noise texture only when explicitly enabled */}
      {noise && (
        <div 
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '50px 50px'
          }}
        />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassBox;