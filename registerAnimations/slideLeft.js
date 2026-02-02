const slideIn = () => {
  gsap.registerEffect({
    name: "slide-left",
    effect: (targets, config) => {
      gsap.set(targets, { opacity: 0, x: 250 });

      const timelines = targets.map((el) =>
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: config.duration,
          ease: config.ease,
          delay: config.delay,
          stagger: config.stagger || 0,
          scrollTrigger: {
            trigger: el, // each element triggers on itself
            start: "top bottom",
          },
        }),
      );

      return timelines;
    },
    defaults: {
      duration: 1,
      ease: "primary",
    },
  });

  const listGridWrapperSlideLeft = document.querySelectorAll(".list_grid");
  if (listGridWrapperSlideLeft.length) {
    listGridWrapperSlideLeft.forEach((curr, i) => {
      gsap.effects["slide-left"]([curr, curr.nextSibling], {
        delay: i * 0.04,
      });
    });
  }



  
  
};
  
    // grid  initialization
  
     class ElasticGrid {
              constructor(containerElement, options = {}) {
                  // Create canvas element from the div
                  this.container = containerElement;
                  this.canvas = document.createElement('canvas');
                  this.container.appendChild(this.canvas);
                  this.ctx = this.canvas.getContext('2d', { alpha: false });
                  
                  // Configuration
                  this.config = {
                      enableHover: options.enableHover ?? true,
                      gridSize: options.gridSize ?? 20,
                      cellSize: options.cellSize ?? 100,
                      elasticStrength: options.elasticStrength ?? 30,
                      animationSpeed: options.animationSpeed ?? 2,
                      liquidEffect: options.liquidEffect ?? 5,
                      waveAmplitude: options.waveAmplitude ?? 0,
                      waveDensity: options.waveDensity ?? 0.5,
                      smoothingFactor: options.smoothingFactor ?? 0.5,
                      fpsLimit: options.fpsLimit ?? 60
                  };
  
                  // State
                  this.mouse = { x: 0, y: 0 };
                  this.previousMouse = { x: 0, y: 0 };
                  this.time = 0;
                  this.lastFrameTime = 0;
                  this.requestId = null;
                  this.gridPoints = { horizontal: [], vertical: [] };
                  this.isInitialized = false;
                  this.isPaused = false;
                  this.animationProgress = 0; // For entry animation (0 to 1)
  
                  // Bind methods
                  this.handleMouseMove = this.throttle(this.onMouseMove.bind(this), 16);
                  this.handleResize = this.debounce(this.resize.bind(this), 150);
  
                  this.init();
              }
  
              init() {
                  // Setup canvas
                  this.resize();
  
                  // Add event listeners
                  window.addEventListener('resize', this.handleResize);
                  this.container.addEventListener('mousemove', this.handleMouseMove);
  
                  // Start animation
                  this.isInitialized = true;
                  this.animate();
              }
  
              resize() {
                  const rect = this.container.getBoundingClientRect();
                  const width = rect.width;
                  const height = rect.height;
  
                  // Set canvas dimensions with device pixel ratio
                  const dpr = window.devicePixelRatio || 1;
                  this.canvas.width = width * dpr;
                  this.canvas.height = height * dpr;
                  this.canvas.style.width = `${width}px`;
                  this.canvas.style.height = `${height}px`;
  
                  // Scale context
                  this.ctx.scale(dpr, dpr);
  
                  // Set initial mouse position
                  this.previousMouse = { x: width / 2, y: height / 2 };
                  this.mouse = { ...this.previousMouse };
  
                  // Initialize grid
                  this.initializeGridPoints(width, height);
              }
  
              initializeGridPoints(width, height) {
                  const { gridSize, cellSize } = this.config;
                  const horizontal = [];
                  const vertical = [];
  
                  // Calculate how many cells we need to fill the screen
                  const horizontalCellCount = Math.ceil(width / cellSize);
                  const verticalCellCount = Math.ceil(height / cellSize);
  
                  const segmentCount = Math.min(Math.max(10, gridSize * 2), 30);
  
                  // Create horizontal lines (from top to bottom of screen)
                  for (let i = 0; i <= verticalCellCount; i++) {
                      const y = i * cellSize;
                      const line = [];
  
                      for (let j = 0; j <= segmentCount; j++) {
                          const x = (j / segmentCount) * width;
                          line.push({
                              originalX: x,
                              originalY: y,
                              currentX: x,
                              currentY: y,
                              velocityX: 0,
                              velocityY: 0
                          });
                      }
                      horizontal.push(line);
                  }
  
                  // Create vertical lines (from left to right of screen)
                  for (let i = 0; i <= horizontalCellCount; i++) {
                      const x = i * cellSize;
                      const line = [];
  
                      for (let j = 0; j <= segmentCount; j++) {
                          const y = (j / segmentCount) * height;
                          line.push({
                              originalX: x,
                              originalY: y,
                              currentX: x,
                              currentY: y,
                              velocityX: 0,
                              velocityY: 0
                          });
                      }
                      vertical.push(line);
                  }
  
                  this.gridPoints = { horizontal, vertical };
              }
  
              updateGridPoints(mouseX, mouseY) {
                  const { 
                      cellSize, 
                      elasticStrength, 
                      liquidEffect, 
                      waveAmplitude, 
                      waveDensity 
                  } = this.config;
                  
                  const influenceRadius = cellSize * 4;
  
                  // Update horizontal lines
                  this.gridPoints.horizontal.forEach((line) => {
                      line.forEach((point, pointIndex) => {
                          // Base wave effect
                          const wavePhase = this.time + (pointIndex / line.length) * 2 * Math.PI * waveDensity;
                          const baseWaveY = Math.sin(wavePhase) * waveAmplitude;
                          const horizontalWave = Math.cos(this.time * 0.7 + pointIndex * 0.2) * (waveAmplitude * 0.2);
  
                          // Mouse influence
                          let mouseInfluenceX = 0;
                          let mouseInfluenceY = 0;
  
                          const dx = point.originalX - mouseX;
                          const dy = point.originalY - mouseY;
                          const distance = Math.sqrt(dx * dx + dy * dy);
  
                          if (distance < influenceRadius) {
                              const influence = Math.max(0, 1 - distance / influenceRadius) * liquidEffect;
                              mouseInfluenceY = influence * elasticStrength * Math.sign(dy) * (1 - distance / influenceRadius);
                              mouseInfluenceX = horizontalWave * influence * 0.8;
                          }
  
                          // Spring physics
                          const springFactor = 0.1;
                          const dampingFactor = 0.7;
  
                          const targetY = point.originalY + baseWaveY + mouseInfluenceY;
                          const targetX = point.originalX + horizontalWave * 0.5 + mouseInfluenceX;
  
                          point.velocityX += (targetX - point.currentX) * springFactor;
                          point.velocityY += (targetY - point.currentY) * springFactor;
                          point.velocityX *= dampingFactor;
                          point.velocityY *= dampingFactor;
  
                          point.currentX += point.velocityX;
                          point.currentY += point.velocityY;
                      });
                  });
  
                  // Update vertical lines
                  this.gridPoints.vertical.forEach((line) => {
                      line.forEach((point, pointIndex) => {
                          // Base wave effect
                          const wavePhase = this.time + (pointIndex / line.length) * 2 * Math.PI * waveDensity;
                          const baseWaveX = Math.cos(wavePhase) * waveAmplitude;
                          const verticalWave = Math.sin(this.time * 0.7 + pointIndex * 0.2) * (waveAmplitude * 0.2);
  
                          // Mouse influence
                          let mouseInfluenceX = 0;
                          let mouseInfluenceY = 0;
  
                          const dx = point.originalX - mouseX;
                          const dy = point.originalY - mouseY;
                          const distance = Math.sqrt(dx * dx + dy * dy);
  
                          if (distance < influenceRadius) {
                              const influence = Math.max(0, 1 - distance / influenceRadius) * liquidEffect;
                              mouseInfluenceX = influence * elasticStrength * Math.sign(dx) * (1 - distance / influenceRadius);
                              mouseInfluenceY = verticalWave * influence * 0.8;
                          }
  
                          // Spring physics
                          const springFactor = 0.1;
                          const dampingFactor = 0.7;
  
                          const targetX = point.originalX + baseWaveX + mouseInfluenceX;
                          const targetY = point.originalY + verticalWave * 0.5 + mouseInfluenceY;
  
                          point.velocityX += (targetX - point.currentX) * springFactor;
                          point.velocityY += (targetY - point.currentY) * springFactor;
                          point.velocityX *= dampingFactor;
                          point.velocityY *= dampingFactor;
  
                          point.currentX += point.velocityX;
                          point.currentY += point.velocityY;
                      });
                  });
              }
  
              drawGridLines() {
                  const { horizontal, vertical } = this.gridPoints;
  
                  // Apply entry animation opacity
                  const opacity = this.animationProgress;
                  this.ctx.strokeStyle = `rgba(222, 222, 222, ${opacity})`;
                  this.ctx.lineWidth = 2;
  
                  // Draw horizontal lines
                  horizontal.forEach((line) => {
                      if (line.length < 2) return;
  
                      this.ctx.beginPath();
                      this.ctx.moveTo(line[0].currentX, line[0].currentY);
  
                      for (let i = 1; i < line.length; i++) {
                          if (i % 2 === 0 || i === line.length - 1) {
                              const currentPoint = line[i];
                              const prevPoint = line[i - 1];
                              const midX = (prevPoint.currentX + currentPoint.currentX) / 2;
                              const midY = (prevPoint.currentY + currentPoint.currentY) / 2;
  
                              this.ctx.quadraticCurveTo(
                                  prevPoint.currentX,
                                  prevPoint.currentY,
                                  midX,
                                  midY
                              );
                          }
                      }
  
                      this.ctx.stroke();
                  });
  
                  // Draw vertical lines
                  vertical.forEach((line) => {
                      if (line.length < 2) return;
  
                      this.ctx.beginPath();
                      this.ctx.moveTo(line[0].currentX, line[0].currentY);
  
                      for (let i = 1; i < line.length; i++) {
                          if (i % 2 === 0 || i === line.length - 1) {
                              const currentPoint = line[i];
                              const prevPoint = line[i - 1];
                              const midX = (prevPoint.currentX + currentPoint.currentX) / 2;
                              const midY = (prevPoint.currentY + currentPoint.currentY) / 2;
  
                              this.ctx.quadraticCurveTo(
                                  prevPoint.currentX,
                                  prevPoint.currentY,
                                  midX,
                                  midY
                              );
                          }
                      }
  
                      this.ctx.stroke();
                  });
              }
  
              animate(timestamp = 0) {
                  const frameDelay = 1000 / this.config.fpsLimit;
  
                  if (timestamp - this.lastFrameTime < frameDelay) {
                      this.requestId = requestAnimationFrame(this.animate.bind(this));
                      return;
                  }
  
                  this.lastFrameTime = timestamp;
                  
                  // Only update time if not paused
                  if (!this.isPaused) {
                      this.time += 0.01 * this.config.animationSpeed;
                  }
  
                  // Smooth mouse movement
                  this.previousMouse.x += (this.mouse.x - this.previousMouse.x) * this.config.smoothingFactor;
                  this.previousMouse.y += (this.mouse.y - this.previousMouse.y) * this.config.smoothingFactor;
  
                  // Get dimensions
                  const width = this.canvas.width / (window.devicePixelRatio || 1);
                  const height = this.canvas.height / (window.devicePixelRatio || 1);
  
                  // Clear canvas
                  this.ctx.clearRect(0, 0, width, height);
  
                  // Update and draw
                  this.updateGridPoints(this.previousMouse.x, this.previousMouse.y);
                  this.drawGridLines();
  
                  this.requestId = requestAnimationFrame(this.animate.bind(this));
              }
  
              onMouseMove(e) {
                  if (!this.config.enableHover) return;
  
                  const rect = this.container.getBoundingClientRect();
                  this.mouse = {
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top
                  };
              }
  
              updateConfig(newConfig) {
                  const oldGridSize = this.config.gridSize;
                  const oldCellSize = this.config.cellSize;
  
                  Object.assign(this.config, newConfig);
  
                  // Reinitialize grid if size changed
                  if (oldGridSize !== this.config.gridSize || oldCellSize !== this.config.cellSize) {
                      const rect = this.container.getBoundingClientRect();
                      this.initializeGridPoints(rect.width, rect.height);
                  }
              }
  
              throttle(func, delay) {
                  let lastCall = 0;
                  return function(...args) {
                      const now = Date.now();
                      if (now - lastCall < delay) return;
                      lastCall = now;
                      return func.apply(this, args);
                  };
              }
  
              debounce(func, delay) {
                  let timeout;
                  return function(...args) {
                      clearTimeout(timeout);
                      timeout = setTimeout(() => func.apply(this, args), delay);
                  };
              }
  
              destroy() {
                  window.removeEventListener('resize', this.handleResize);
                  this.container.removeEventListener('mousemove', this.handleMouseMove);
                  if (this.requestId) {
                      cancelAnimationFrame(this.requestId);
                  }
              }
  
              // Public API for controlling animation
              pause() {
                  this.isPaused = true;
              }
  
              play() {
                  this.isPaused = false;
              }
  
              reset() {
                  this.animationProgress = 0;
                  const rect = this.container.getBoundingClientRect();
                  this.initializeGridPoints(rect.width, rect.height);
              }
  
              // Play entry animation
              playEntryAnimation(duration = 1000) {
                  return new Promise((resolve) => {
                      this.animationProgress = 0;
                      const startTime = Date.now();
                      
                      const animate = () => {
                          const elapsed = Date.now() - startTime;
                          this.animationProgress = Math.min(elapsed / duration, 1);
                          
                          if (this.animationProgress < 1) {
                              requestAnimationFrame(animate);
                          } else {
                              resolve();
                          }
                      };
                      
                      animate();
                  });
              }
          }
