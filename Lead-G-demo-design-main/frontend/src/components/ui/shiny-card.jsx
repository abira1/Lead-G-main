import * as React from "react"
import { cn } from "../../lib/utils"

const ShinyCard = React.forwardRef(({ 
  className, 
  children,
  animated = true,
  intensity = "normal", // "subtle", "normal", "intense"
  ...props 
}, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)
  
  const intensityClasses = {
    subtle: "hover:shadow-lg hover:shadow-cyan-500/10",
    normal: "hover:shadow-xl hover:shadow-cyan-500/20", 
    intense: "hover:shadow-2xl hover:shadow-cyan-500/30"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card/80 backdrop-blur-sm text-card-foreground transition-all duration-500 ease-out group cursor-pointer",
        animated && "hover:scale-105 hover:-translate-y-1",
        intensityClasses[intensity],
        "border-white/10 hover:border-cyan-400/40",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Main shimmer effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`
            absolute -top-4 -left-4 w-6 h-full transform -skew-x-12 -translate-x-full
            transition-all duration-1000 ease-out
            ${isHovered ? 'translate-x-[calc(100%+2rem)] opacity-100' : 'opacity-0'}
          `}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), rgba(0, 255, 209, 0.4), rgba(255, 255, 255, 0.6), transparent)',
            filter: 'blur(0.5px)'
          }}
        />
      </div>

      {/* Holographic border effect */}
      <div 
        className={`
          absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 pointer-events-none
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: 'linear-gradient(45deg, rgba(0, 255, 209, 0.3), rgba(142, 102, 255, 0.3), rgba(255, 110, 180, 0.3), rgba(0, 255, 209, 0.3))',
          backgroundSize: '300% 300%',
          animation: isHovered ? 'gradient-shift 3s ease infinite' : 'none',
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'subtract',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'subtract'
        }}
      />

      {/* Corner highlights */}
      <div className={`absolute top-0 left-0 w-20 h-20 opacity-0 transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-40' : 'opacity-0'}`}>
        <div 
          className="w-full h-full"
          style={{
            background: 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.8), transparent 70%)',
          }}
        />
      </div>
      
      <div className={`absolute bottom-0 right-0 w-16 h-16 opacity-0 transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-30' : 'opacity-0'}`}>
        <div 
          className="w-full h-full"
          style={{
            background: 'radial-gradient(circle at bottom right, rgba(0, 255, 209, 0.6), transparent 70%)',
          }}
        />
      </div>

      {/* Floating orbs effect */}
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-1000 pointer-events-none ${isHovered ? 'opacity-20' : 'opacity-0'}`}>
        <div 
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/60 rounded-full animate-float"
          style={{ animationDelay: '0s', animationDuration: '3s' }}
        />
        <div 
          className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400/60 rounded-full animate-float"
          style={{ animationDelay: '1s', animationDuration: '4s' }}
        />
        <div 
          className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-pink-400/60 rounded-full animate-float"
          style={{ animationDelay: '2s', animationDuration: '5s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  )
})
ShinyCard.displayName = "ShinyCard"

export { ShinyCard }