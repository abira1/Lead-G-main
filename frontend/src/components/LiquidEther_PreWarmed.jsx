import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  style = {},
  className = '',
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6,
  preWarmFrames = 120, // NEW: Number of frames to pre-warm the simulation
  initialNoiseStrength = 0.3 // NEW: Strength of initial velocity noise
}) {
  const mountRef = useRef(null);
  const webglRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const rafRef = useRef(null);
  const intersectionObserverRef = useRef(null);
  const isVisibleRef = useRef(true);
  const resizeRafRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    function makePaletteTexture(stops) {
      let arr;
      if (Array.isArray(stops) && stops.length > 0) {
        if (stops.length === 1) {
          arr = [stops[0], stops[0]];
        } else {
          arr = stops;
        }
      } else {
        arr = ['#ffffff', '#ffffff'];
      }
      const w = arr.length;
      const data = new Uint8Array(w * 4);
      for (let i = 0; i < w; i++) {
        const c = new THREE.Color(arr[i]);
        data[i * 4 + 0] = Math.round(c.r * 255);
        data[i * 4 + 1] = Math.round(c.g * 255);
        data[i * 4 + 2] = Math.round(c.b * 255);
        data[i * 4 + 3] = 255;
      }
      const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);
      tex.magFilter = THREE.LinearFilter;
      tex.minFilter = THREE.LinearFilter;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
      return tex;
    }

    // NEW: Function to create initial velocity noise texture
    function createInitialVelocityTexture(width, height) {
      const size = width * height;
      const data = new Float32Array(size * 4);
      
      for (let i = 0; i < size; i++) {
        const idx = i * 4;
        // Create smooth noise pattern for initial velocity
        const x = (i % width) / width;
        const y = Math.floor(i / width) / height;
        
        // Multiple octaves of noise for more organic motion
        const noise1 = Math.sin(x * Math.PI * 4) * Math.cos(y * Math.PI * 3);
        const noise2 = Math.sin(x * Math.PI * 8 + 1.5) * Math.cos(y * Math.PI * 6 + 0.8);
        const noise3 = Math.sin(x * Math.PI * 16 + 2.1) * Math.cos(y * Math.PI * 12 + 1.3);
        
        // Combine noise octaves
        const combinedNoise = (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2);
        
        // Convert to velocity components
        data[idx + 0] = combinedNoise * initialNoiseStrength; // X velocity
        data[idx + 1] = Math.sin(y * Math.PI * 2 + x * Math.PI) * initialNoiseStrength * 0.8; // Y velocity
        data[idx + 2] = 0; // Z (unused)
        data[idx + 3] = 1; // Alpha
      }
      
      const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.FloatType);
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.generateMipmaps = false;
      texture.needsUpdate = true;
      return texture;
    }

    const paletteTex = makePaletteTexture(colors);
    const bgVec4 = new THREE.Vector4(0, 0, 0, 0);

    // ... [Include all the existing shader and class code from LiquidEther.jsx] ...
    // [For brevity, I'll include the key parts and indicate where the full code goes]

    class CommonClass {
      constructor() {
        this.width = 0;
        this.height = 0;
        this.aspect = 1;
        this.pixelRatio = 1;
        this.isMobile = false;
        this.breakpoint = 768;
        this.fboWidth = null;
        this.fboHeight = null;
        this.time = 0;
        this.delta = 0;
        this.container = null;
        this.renderer = null;
        this.clock = null;
      }
      init(container) {
        this.container = container;
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        this.resize();
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.autoClear = false;
        this.renderer.setClearColor(new THREE.Color(0x000000), 0);
        this.renderer.setPixelRatio(this.pixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        this.renderer.domElement.style.display = 'block';
        this.clock = new THREE.Clock();
        this.clock.start();
      }
      resize() {
        if (!this.container) return;
        const rect = this.container.getBoundingClientRect();
        this.width = Math.max(1, Math.floor(rect.width));
        this.height = Math.max(1, Math.floor(rect.height));
        this.aspect = this.width / this.height;
        if (this.renderer) this.renderer.setSize(this.width, this.height, false);
      }
      update() {
        this.delta = this.clock.getDelta();
        this.time += this.delta;
      }
    }
    const Common = new CommonClass();

    // [Include MouseClass, AutoDriver, and shader code from original...]
    
    // [All the existing shader code and classes would go here - copying from LiquidEther.jsx]
    const face_vert = `
  attribute vec3 position;
  uniform vec2 px;
  uniform vec2 boundarySpace;
  varying vec2 uv;
  precision highp float;
  void main(){
  vec3 pos = position;
  vec2 scale = 1.0 - boundarySpace * 2.0;
  pos.xy = pos.xy * scale;
  uv = vec2(0.5)+(pos.xy)*0.5;
  gl_Position = vec4(pos, 1.0);
}
`;

    // [Include all other shader code...]

    // MODIFIED Simulation class with pre-warming capability
    class Simulation {
      constructor(options) {
        this.options = {
          iterations_poisson: 32,
          iterations_viscous: 32,
          mouse_force: 20,
          resolution: 0.5,
          cursor_size: 100,
          viscous: 30,
          isBounce: false,
          dt: 0.014,
          isViscous: false,
          BFECC: true,
          ...options
        };
        this.fbos = {
          vel_0: null,
          vel_1: null,
          vel_viscous0: null,
          vel_viscous1: null,
          div: null,
          pressure_0: null,
          pressure_1: null
        };
        this.fboSize = new THREE.Vector2();
        this.cellScale = new THREE.Vector2();
        this.boundarySpace = new THREE.Vector2();
        this.preWarmed = false; // NEW: Track if pre-warming is complete
        this.init();
      }
      
      init() {
        this.calcSize();
        this.createAllFBO();
        this.createShaderPass();
        // NEW: Initialize with velocity noise
        this.initializeWithNoise();
      }

      // NEW: Initialize velocity textures with noise for instant motion
      initializeWithNoise() {
        const width = this.fboSize.x;
        const height = this.fboSize.y;
        
        // Create initial velocity texture with noise
        const initialVelTexture = createInitialVelocityTexture(width, height);
        
        // Copy the noise texture to both velocity buffers
        const tempScene = new THREE.Scene();
        const tempCamera = new THREE.Camera();
        const tempMaterial = new THREE.MeshBasicMaterial({ map: initialVelTexture });
        const tempMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), tempMaterial);
        tempScene.add(tempMesh);
        
        // Render to velocity textures
        Common.renderer.setRenderTarget(this.fbos.vel_0);
        Common.renderer.render(tempScene, tempCamera);
        Common.renderer.setRenderTarget(this.fbos.vel_1);
        Common.renderer.render(tempScene, tempCamera);
        Common.renderer.setRenderTarget(null);
        
        // Clean up
        tempMaterial.dispose();
        initialVelTexture.dispose();
      }

      // [Include all existing methods: getFloatType, createAllFBO, createShaderPass, etc...]
      
      getFloatType() {
        const isIOS = /(iPad|iPhone|iPod)/i.test(navigator.userAgent);
        return isIOS ? THREE.HalfFloatType : THREE.FloatType;
      }

      createAllFBO() {
        const type = this.getFloatType();
        const opts = {
          type,
          depthBuffer: false,
          stencilBuffer: false,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          wrapS: THREE.ClampToEdgeWrapping,
          wrapT: THREE.ClampToEdgeWrapping
        };
        for (let key in this.fbos) {
          this.fbos[key] = new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts);
        }
      }

      // [Include createShaderPass and other methods from original...]
      
      calcSize() {
        const width = Math.max(1, Math.round(this.options.resolution * Common.width));
        const height = Math.max(1, Math.round(this.options.resolution * Common.height));
        const px_x = 1.0 / width;
        const px_y = 1.0 / height;
        this.cellScale.set(px_x, px_y);
        this.fboSize.set(width, height);
      }

      resize() {
        this.calcSize();
        for (let key in this.fbos) {
          this.fbos[key].setSize(this.fboSize.x, this.fboSize.y);
        }
        // Re-initialize with noise after resize
        this.initializeWithNoise();
      }

      update() {
        // [Include existing update logic...]
      }
    }

    // MODIFIED Output class with pre-warming
    class Output {
      constructor() {
        this.preWarmCounter = 0;
        this.isPreWarming = true;
        this.init();
      }
      
      init() {
        this.simulation = new Simulation();
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.output = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          new THREE.RawShaderMaterial({
            vertexShader: face_vert,
            fragmentShader: color_frag,
            transparent: true,
            depthWrite: false,
            uniforms: {
              velocity: { value: this.simulation.fbos.vel_0.texture },
              boundarySpace: { value: new THREE.Vector2() },
              palette: { value: paletteTex },
              bgColor: { value: bgVec4 }
            }
          })
        );
        this.scene.add(this.output);
        
        // NEW: Start pre-warming
        this.startPreWarming();
      }
      
      // NEW: Pre-warm the simulation
      startPreWarming() {
        const preWarmLoop = () => {
          if (this.preWarmCounter < preWarmFrames) {
            // Simulate some mouse movement during pre-warming for more dynamic patterns
            const time = this.preWarmCounter * 0.1;
            Mouse.setNormalized(
              Math.sin(time) * 0.5,
              Math.cos(time * 0.7) * 0.5
            );
            Mouse.diff.set(
              Math.cos(time * 2) * 0.02,
              Math.sin(time * 1.5) * 0.02
            );
            
            this.simulation.update();
            this.preWarmCounter++;
            requestAnimationFrame(preWarmLoop);
          } else {
            this.isPreWarming = false;
            console.log('🔥 LiquidEther pre-warming complete - animation ready!');
          }
        };
        preWarmLoop();
      }
      
      update() {
        this.simulation.update();
        if (!this.isPreWarming) {
          this.render(); // Only render to screen after pre-warming
        }
      }
      
      render() {
        Common.renderer.setRenderTarget(null);
        Common.renderer.render(this.scene, this.camera);
      }
      
      resize() {
        this.simulation.resize();
      }
    }

    // [Include WebGLManager and Mouse classes from original...]
    // [For brevity, assuming all other classes are included]

    const container = mountRef.current;
    container.style.position = container.style.position || 'relative';
    container.style.overflow = container.style.overflow || 'hidden';

    const webgl = new WebGLManager({
      $wrapper: container,
      autoDemo,
      autoSpeed,
      autoIntensity,
      takeoverDuration,
      autoResumeDelay,
      autoRampDuration
    });
    webglRef.current = webgl;

    // Apply options and start
    const applyOptionsFromProps = () => {
      if (!webglRef.current) return;
      const sim = webglRef.current.output?.simulation;
      if (!sim) return;
      const prevRes = sim.options.resolution;
      Object.assign(sim.options, {
        mouse_force: mouseForce,
        cursor_size: cursorSize,
        isViscous,
        viscous,
        iterations_viscous: iterationsViscous,
        iterations_poisson: iterationsPoisson,
        dt,
        BFECC,
        resolution,
        isBounce
      });
      if (resolution !== prevRes) {
        sim.resize();
      }
    };
    applyOptionsFromProps();

    webgl.start();

    // [Include all the existing intersection observer and resize observer code...]

    return () => {
      // [Include cleanup code from original...]
    };
  }, [
    BFECC,
    cursorSize,
    dt,
    isBounce,
    isViscous,
    iterationsPoisson,
    iterationsViscous,
    mouseForce,
    resolution,
    viscous,
    colors,
    autoDemo,
    autoSpeed,
    autoIntensity,
    takeoverDuration,
    autoResumeDelay,
    autoRampDuration,
    preWarmFrames,
    initialNoiseStrength
  ]);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full relative overflow-hidden pointer-events-none touch-none ${className || ''}`}
      style={style}
    />
  );
}