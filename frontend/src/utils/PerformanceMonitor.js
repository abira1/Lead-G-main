/**
 * Performance monitoring utility for WebGL animations
 * Tracks frame rate, memory usage, and provides performance recommendations
 */

class PerformanceMonitor {
  constructor(options = {}) {
    this.options = {
      sampleSize: 60,           // Number of frames to average
      targetFPS: 60,            // Target frame rate
      memoryCheckInterval: 5000, // Memory check interval in ms
      logInterval: 10000,       // Console logging interval
      ...options
    };

    this.frameCount = 0;
    this.lastTime = performance.now();
    this.frameTimes = [];
    this.averageFPS = 60;
    this.memoryUsage = null;
    this.performanceLevel = 'unknown';
    
    this.callbacks = {
      onPerformanceChange: null,
      onFrameRateChange: null,
      onMemoryWarning: null
    };

    // Start monitoring
    this.startMonitoring();
  }

  /**
   * Start performance monitoring
   */
  startMonitoring() {
    // Memory monitoring
    if (performance.memory) {
      this.memoryInterval = setInterval(() => {
        this.checkMemoryUsage();
      }, this.options.memoryCheckInterval);
    }

    // Logging interval
    this.logInterval = setInterval(() => {
      this.logPerformanceStats();
    }, this.options.logInterval);
  }

  /**
   * Call this method once per frame to track frame rate
   */
  recordFrame() {
    const currentTime = performance.now();
    const frameTime = currentTime - this.lastTime;
    
    this.frameTimes.push(frameTime);
    
    // Keep only the last N frames for averaging
    if (this.frameTimes.length > this.options.sampleSize) {
      this.frameTimes.shift();
    }
    
    // Calculate average FPS
    if (this.frameTimes.length >= 10) {
      const averageFrameTime = this.frameTimes.reduce((a, b) => a + b) / this.frameTimes.length;
      const newAverageFPS = Math.round(1000 / averageFrameTime);
      
      if (Math.abs(newAverageFPS - this.averageFPS) > 5) {
        this.averageFPS = newAverageFPS;
        this.onFrameRateChange(this.averageFPS);
      }
    }
    
    this.lastTime = currentTime;
    this.frameCount++;
  }

  /**
   * Check memory usage and warn if high
   */
  checkMemoryUsage() {
    if (!performance.memory) return;

    const memInfo = {
      used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
      total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
    };

    this.memoryUsage = memInfo;

    // Memory warning if using >75% of available heap
    const memoryUsagePercent = (memInfo.used / memInfo.limit) * 100;
    if (memoryUsagePercent > 75 && this.callbacks.onMemoryWarning) {
      this.callbacks.onMemoryWarning(memInfo, memoryUsagePercent);
    }
  }

  /**
   * Detect device performance capability
   */
  detectDevicePerformance() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    const hasLowFPS = this.averageFPS < 30;

    let performance = 'high';
    
    if (isMobile || isSlowDevice || isLowMemory || hasLowFPS) {
      performance = 'low';
    } else if (navigator.hardwareConcurrency < 8 || this.averageFPS < 45) {
      performance = 'medium';
    }

    if (performance !== this.performanceLevel) {
      this.performanceLevel = performance;
      this.onPerformanceChange(performance);
    }

    return performance;
  }

  /**
   * Get recommended animation parameters based on current performance
   */
  getOptimizedParameters() {
    const performance = this.detectDevicePerformance();
    
    const params = {
      low: {
        resolution: 0.25,
        iterationsPoisson: 8,
        iterationsViscous: 8,
        mouseForce: 10,
        cursorSize: 60,
        frameRateLimit: 30,
        enableBFECC: false,
        quality: 'low'
      },
      medium: {
        resolution: 0.3,
        iterationsPoisson: 12,
        iterationsViscous: 12,
        mouseForce: 12,
        cursorSize: 70,
        frameRateLimit: 45,
        enableBFECC: false,
        quality: 'medium'
      },
      high: {
        resolution: 0.35,
        iterationsPoisson: 16,
        iterationsViscous: 16,
        mouseForce: 15,
        cursorSize: 80,
        frameRateLimit: 60,
        enableBFECC: true,
        quality: 'high'
      }
    };

    return params[performance] || params.medium;
  }

  /**
   * Get current performance statistics
   */
  getStats() {
    return {
      fps: this.averageFPS,
      frameCount: this.frameCount,
      memoryUsage: this.memoryUsage,
      performanceLevel: this.performanceLevel,
      frameTimeVariance: this.getFrameTimeVariance()
    };
  }

  /**
   * Calculate frame time variance (measure of smoothness)
   */
  getFrameTimeVariance() {
    if (this.frameTimes.length < 10) return 0;
    
    const mean = this.frameTimes.reduce((a, b) => a + b) / this.frameTimes.length;
    const variance = this.frameTimes.reduce((acc, time) => acc + Math.pow(time - mean, 2), 0) / this.frameTimes.length;
    return Math.sqrt(variance);
  }

  /**
   * Set callback functions
   */
  onPerformanceChange(callback) {
    this.callbacks.onPerformanceChange = callback;
  }

  onFrameRateChange(fps) {
    if (this.callbacks.onFrameRateChange) {
      this.callbacks.onFrameRateChange(fps);
    }
  }

  onMemoryWarning(callback) {
    this.callbacks.onMemoryWarning = callback;
  }

  /**
   * Log performance statistics to console
   */
  logPerformanceStats() {
    const stats = this.getStats();
    
    console.group('🎮 Animation Performance Stats');
    console.log(`📊 FPS: ${stats.fps} (${stats.performanceLevel} performance)`);
    console.log(`🎯 Frame Count: ${stats.frameCount}`);
    console.log(`📈 Frame Time Variance: ${stats.frameTimeVariance.toFixed(2)}ms`);
    
    if (stats.memoryUsage) {
      console.log(`💾 Memory: ${stats.memoryUsage.used}MB / ${stats.memoryUsage.limit}MB`);
    }
    
    if (stats.fps < 30) {
      console.warn('⚠️ Low frame rate detected. Consider reducing animation quality.');
    }
    
    console.groupEnd();
  }

  /**
   * Stop monitoring and clean up
   */
  dispose() {
    if (this.memoryInterval) {
      clearInterval(this.memoryInterval);
    }
    if (this.logInterval) {
      clearInterval(this.logInterval);
    }
  }
}

export default PerformanceMonitor;