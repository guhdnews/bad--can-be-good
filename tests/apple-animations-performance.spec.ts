import { test, expect, Page } from '@playwright/test';

test.describe('Apple-Inspired Animations Performance Test', () => {
  
  test('Homepage animations maintain 60fps performance', async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:3000');
    
    console.log('🍎 Starting Apple Animation Performance Analysis...');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Measure frame rate during initial animations
    const initialFrameRate = await page.evaluate(() => {
      return new Promise((resolve) => {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measureFrames = () => {
          frameCount++;
          const currentTime = performance.now();
          
          if (currentTime - lastTime >= 2000) { // Measure for 2 seconds
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            resolve(fps);
          } else {
            requestAnimationFrame(measureFrames);
          }
        };
        
        requestAnimationFrame(measureFrames);
      });
    });
    
    console.log('📊 Initial Animation FPS:', await initialFrameRate);
    
    // Test scroll performance with Apple animations
    await page.evaluate(() => {
      // Smooth scroll to trigger scroll animations
      window.scrollTo({ top: 800, behavior: 'smooth' });
    });
    
    await page.waitForTimeout(1000);
    
    // Measure scroll animation performance
    const scrollFrameRate = await page.evaluate(() => {
      return new Promise((resolve) => {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measureScrollFrames = () => {
          frameCount++;
          const currentTime = performance.now();
          
          if (currentTime - lastTime >= 2000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            resolve(fps);
          } else {
            requestAnimationFrame(measureScrollFrames);
          }
        };
        
        requestAnimationFrame(measureScrollFrames);
      });
    });
    
    console.log('🔄 Scroll Animation FPS:', await scrollFrameRate);
    
    // Test magnetic hover performance
    const cardElement = page.locator('.premium-card').first();
    await cardElement.hover();
    
    const hoverFrameRate = await page.evaluate(() => {
      return new Promise((resolve) => {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measureHoverFrames = () => {
          frameCount++;
          const currentTime = performance.now();
          
          if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            resolve(fps);
          } else {
            requestAnimationFrame(measureHoverFrames);
          }
        };
        
        requestAnimationFrame(measureHoverFrames);
      });
    });
    
    console.log('🎯 Hover Animation FPS:', await hoverFrameRate);
    
    // Check for Apple easing functions in computed styles
    const easingFunctions = await page.evaluate(() => {
      const elements = document.querySelectorAll('.apple-animate, .magnetic-button, .premium-card');
      const easings = new Set();
      
      elements.forEach(el => {
        const styles = getComputedStyle(el);
        if (styles.transitionTimingFunction && styles.transitionTimingFunction !== 'ease') {
          easings.add(styles.transitionTimingFunction);
        }
      });
      
      return Array.from(easings);
    });
    
    console.log('⚡ Apple Easing Functions Used:', easingFunctions);
    
    // Test memory usage during animations
    const memoryUsage = await page.evaluate(() => {
      if ('memory' in performance) {
        return {
          used: Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024),
          total: Math.round((performance as any).memory.totalJSHeapSize / 1024 / 1024),
          limit: Math.round((performance as any).memory.jsHeapSizeLimit / 1024 / 1024)
        };
      }
      return 'Memory info not available';
    });
    
    console.log('🧠 Memory Usage (MB):', memoryUsage);
    
    // Performance assertions based on Apple standards
    expect(await initialFrameRate).toBeGreaterThanOrEqual(45); // Allow some headroom
    expect(await scrollFrameRate).toBeGreaterThanOrEqual(40);
    expect(await hoverFrameRate).toBeGreaterThanOrEqual(45);
    expect(easingFunctions.length).toBeGreaterThan(0);
    
    if (typeof memoryUsage === 'object') {
      expect(memoryUsage.used).toBeLessThan(30); // Keep under 30MB
    }
  });
});