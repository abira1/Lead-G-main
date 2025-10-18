import { useEffect, useRef } from 'react';

/**
 * Custom hook to pre-warm LiquidEther animation
 * This hook simulates mouse movement to build up fluid motion before the user sees it
 */
export const useLiquidEtherPreWarm = (targetRef, options = {}) => {
  const {
    preWarmDuration = 2000, // 2 seconds
    movementIntensity = 0.4,
    movementComplexity = 3,
    onComplete = null
  } = options;

  const isPreWarming = useRef(false);
  const preWarmStartTime = useRef(null);

  useEffect(() => {
    if (!targetRef.current) return;

    const startPreWarming = () => {
      if (isPreWarming.current) return;
      
      isPreWarming.current = true;
      preWarmStartTime.current = performance.now();
      
      console.log('🔥 Starting LiquidEther pre-warming animation...');

      const preWarmLoop = () => {
        const elapsed = performance.now() - preWarmStartTime.current;
        const progress = elapsed / preWarmDuration;

        if (progress >= 1) {
          // Pre-warming complete
          isPreWarming.current = false;
          console.log('✅ LiquidEther pre-warming complete!');
          if (onComplete) onComplete();
          return;
        }

        // Generate complex mouse movement patterns
        const time = elapsed * 0.001; // Convert to seconds
        
        // Multiple sine waves for organic movement
        const x1 = Math.sin(time * 2.1) * movementIntensity;
        const y1 = Math.cos(time * 1.7) * movementIntensity;
        const x2 = Math.sin(time * 3.3 + 1.5) * (movementIntensity * 0.6);
        const y2 = Math.cos(time * 2.9 + 0.8) * (movementIntensity * 0.6);
        const x3 = Math.sin(time * 4.7 + 2.1) * (movementIntensity * 0.3);
        const y3 = Math.cos(time * 4.1 + 1.3) * (movementIntensity * 0.3);

        // Combine movements for complex patterns
        const finalX = x1 + x2 + x3;
        const finalY = y1 + y2 + y3;

        // Convert to screen coordinates
        const rect = targetRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const clientX = centerX + (finalX * rect.width * 0.3);
        const clientY = centerY + (finalY * rect.height * 0.3);

        // Create and dispatch synthetic mouse events
        const mouseMoveEvent = new MouseEvent('mousemove', {
          clientX,
          clientY,
          bubbles: true,
          cancelable: true
        });

        targetRef.current.dispatchEvent(mouseMoveEvent);

        // Continue the loop
        requestAnimationFrame(preWarmLoop);
      };

      // Start the pre-warming loop after a small delay to ensure initialization
      setTimeout(() => {
        requestAnimationFrame(preWarmLoop);
      }, 100);
    };

    // Start pre-warming when the component mounts
    startPreWarming();

    // Cleanup function
    return () => {
      isPreWarming.current = false;
    };
  }, [targetRef, preWarmDuration, movementIntensity, movementComplexity, onComplete]);

  return {
    isPreWarming: isPreWarming.current
  };
};

export default useLiquidEtherPreWarm;