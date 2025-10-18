import * as React from "react"
import { cn } from "../../lib/utils"

const ModernCard = React.forwardRef(({ 
  className, 
  variant = "default",
  animated = true,
  glow = false,
  gradient = false,
  children,
  ...props 
}, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)
  
  const baseClasses = `
    relative overflow-hidden rounded-2xl border transition-all duration-500 ease-out
    ${animated ? 'hover:scale-[1.03] hover:-translate-y-1' : ''}
    ${glow ? 'hover:shadow-2xl hover:shadow-cyan-500/25' : 'hover:shadow-xl'}
    group cursor-pointer
  `
  
  const variantClasses = {
    default: "bg-card/80 backdrop-blur-sm border-white/10 hover:border-cyan-400/40",
    glass: "bg-white/5 backdrop-blur-md border-white/20 hover:bg-white/10 hover:border-cyan-400/50",
    solid: "bg-card border-border hover:border-cyan-400/60",
    gradient: "bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/20 hover:from-cyan-400/20 hover:via-purple-400/10 hover:to-pink-400/20"
  }

  return (
    <div
      ref={ref}
      className={cn(baseClasses, variantClasses[variant], className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Animated background overlay */}
      <div 
        className={`
          absolute inset-0 opacity-0 transition-opacity duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-400/10 to-pink-400/10 animate-pulse" />
      </div>

      {/* Gradient border effect */}
      <div 
        className={`
          absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: 'linear-gradient(45deg, rgba(0, 255, 209, 0.5), rgba(142, 102, 255, 0.5), rgba(255, 110, 180, 0.5))',
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'subtract',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'subtract'
        }}
      />

      {/* Spotlight effect */}
      <div 
        className={`
          absolute -top-40 -right-40 w-80 h-80 bg-gradient-radial from-cyan-400/20 via-cyan-400/5 to-transparent 
          rounded-full blur-3xl transition-all duration-700 pointer-events-none
          ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}
        `}
      />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />
    </div>
  )
})
ModernCard.displayName = "ModernCard"

const ModernCardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-8 transition-all duration-300 group-hover:scale-[1.01]", 
      className
    )}
    {...props} 
  />
))
ModernCardHeader.displayName = "ModernCardHeader"

const ModernCardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-none tracking-tight transition-all duration-300 group-hover:text-cyan-400 group-hover:scale-[1.02]", 
      className
    )}
    {...props} 
  />
))
ModernCardTitle.displayName = "ModernCardTitle"

const ModernCardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-muted-foreground transition-all duration-300 group-hover:text-white/90", 
      className
    )}
    {...props} 
  />
))
ModernCardDescription.displayName = "ModernCardDescription"

const ModernCardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("p-8 pt-0 transition-all duration-300", className)} 
    {...props} 
  />
))
ModernCardContent.displayName = "ModernCardContent"

const ModernCardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-8 pt-0 transition-all duration-300", 
      className
    )}
    {...props} 
  />
))
ModernCardFooter.displayName = "ModernCardFooter"

export { 
  ModernCard, 
  ModernCardHeader, 
  ModernCardFooter, 
  ModernCardTitle, 
  ModernCardDescription, 
  ModernCardContent 
}