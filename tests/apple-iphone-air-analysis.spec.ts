import { test, expect, Page } from '@playwright/test';

test.describe('Apple iPhone Air Animation Analysis', () => {
  
  test('Comprehensive animation analysis of Apple iPhone Air page', async ({ page }) => {
    // Navigate to Apple iPhone Air page
    await page.goto('https://www.apple.com/iphone-air/', { 
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    await page.waitForTimeout(3000);
    
    console.log('📱 Starting Apple iPhone Air Animation Analysis...');
    
    // 1. Detect Animation Libraries and Frameworks
    const animationLibraries = await page.evaluate(() => {
      const libraries = [];
      
      // Check for common animation libraries
      if (typeof window.requestAnimationFrame !== 'undefined') libraries.push('requestAnimationFrame');
      if (window.GSAP || window.gsap) libraries.push('GSAP');
      if (window.anime) libraries.push('Anime.js');
      if (window.Lottie) libraries.push('Lottie');
      if (document.querySelector('[data-aos]')) libraries.push('AOS');
      if (window.ScrollMagic) libraries.push('ScrollMagic');
      if (window.Framer) libraries.push('Framer Motion');
      
      // Check for Apple's custom animation system
      const appleAnimationElements = document.querySelectorAll('[data-analytics-section-engagement], [data-module-template], [class*="animation"], [class*="animate"]');
      if (appleAnimationElements.length > 0) libraries.push('Apple Custom Animation System');
      
      return libraries;
    });
    
    console.log('🎬 Animation Libraries Detected:', animationLibraries);
    
    // 2. Analyze Scroll-Based Animations
    const scrollAnimations = await page.evaluate(() => {
      const scrollElements = [];
      
      // Find elements with transform/opacity changes
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        const computedStyle = window.getComputedStyle(el);
        const hasTransform = computedStyle.transform !== 'none';
        const hasOpacity = computedStyle.opacity !== '1';
        const hasTransition = computedStyle.transition !== 'all 0s ease 0s';
        
        if (hasTransform || hasOpacity || hasTransition) {
          scrollElements.push({
            tagName: el.tagName,
            classes: Array.from(el.classList),
            transform: computedStyle.transform,
            opacity: computedStyle.opacity,
            transition: computedStyle.transition,
            animation: computedStyle.animation
          });
        }
      });
      
      return scrollElements.slice(0, 20); // Limit to first 20 for performance
    });
    
    console.log('🔄 Scroll Animation Elements Found:', scrollAnimations.length);
    
    // 3. Test Intersection Observer Usage
    const intersectionObserverUsage = await page.evaluate(() => {
      // Check if Intersection Observer is being used
      const hasIntersectionObserver = 'IntersectionObserver' in window;
      const observerCount = window.IntersectionObserver ? 1 : 0;
      
      return {
        supported: hasIntersectionObserver,
        inUse: observerCount > 0,
        apiAvailable: typeof window.IntersectionObserver === 'function'
      };
    });
    
    console.log('👀 Intersection Observer Usage:', intersectionObserverUsage);
    
    // 4. Analyze CSS Animation Properties
    const cssAnimationAnalysis = await page.evaluate(() => {
      const animations = [];
      const stylesheets = Array.from(document.styleSheets);
      
      try {
        stylesheets.forEach(sheet => {
          try {
            const rules = Array.from(sheet.cssRules || sheet.rules || []);
            rules.forEach(rule => {
              if (rule.style) {
                const hasKeyframes = rule.type === CSSRule.KEYFRAMES_RULE;
                const hasAnimation = rule.style.animation || rule.style.animationName;
                const hasTransform = rule.style.transform;
                const hasTransition = rule.style.transition;
                
                if (hasKeyframes || hasAnimation || hasTransform || hasTransition) {
                  animations.push({
                    selector: rule.selectorText || 'keyframes',
                    type: hasKeyframes ? 'keyframes' : 'property',
                    animation: rule.style.animation || '',
                    transform: rule.style.transform || '',
                    transition: rule.style.transition || ''
                  });
                }
              }
            });
          } catch (e) {
            // Cross-origin or other CSS access issues
          }
        });
      } catch (e) {
        console.log('CSS analysis limited due to cross-origin restrictions');
      }
      
      return animations.slice(0, 15); // Limit results
    });
    
    console.log('🎨 CSS Animations Found:', cssAnimationAnalysis.length);
    
    // 5. Test Animation Performance and Timing
    const performanceMetrics = await page.evaluate(() => {
      let frameCount = 0;
      let lastTime = performance.now();
      let fps = 0;
      
      const measureFPS = () => {
        frameCount++;
        const currentTime = performance.now();
        if (currentTime - lastTime >= 1000) {
          fps = Math.round(frameCount * 1000 / (currentTime - lastTime));
          frameCount = 0;
          lastTime = currentTime;
        }
        if (frameCount < 60) { // Only measure for 1 second
          requestAnimationFrame(measureFPS);
        }
      };
      
      measureFPS();
      
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            averageFPS: fps,
            timestamp: performance.now(),
            memoryUsage: (performance as any).memory ? {
              used: (performance as any).memory.usedJSHeapSize,
              total: (performance as any).memory.totalJSHeapSize,
              limit: (performance as any).memory.jsHeapSizeLimit
            } : 'Not available'
          });
        }, 2000);
      });
    });
    
    console.log('📊 Performance Metrics:', await performanceMetrics);
    
    // 6. Test Scroll Behavior and Animation Triggers
    await page.evaluate(() => {
      window.scrollTo(0, 500);
    });
    
    await page.waitForTimeout(1000);
    
    const scrollAnimationTriggers = await page.evaluate(() => {
      const triggers = [];
      
      // Look for elements that change on scroll
      const elementsWithAnimations = document.querySelectorAll('[style*="transform"], [style*="opacity"], [class*="animate"]');
      elementsWithAnimations.forEach((el, index) => {
        if (index < 10) { // Limit to 10 elements
          const rect = el.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          
          triggers.push({
            element: el.tagName + '.' + Array.from(el.classList).join('.'),
            isVisible,
            position: {
              top: rect.top,
              bottom: rect.bottom,
              left: rect.left,
              right: rect.right
            },
            styles: {
              transform: el.style.transform || getComputedStyle(el).transform,
              opacity: el.style.opacity || getComputedStyle(el).opacity
            }
          });
        }
      });
      
      return triggers;
    });
    
    console.log('🎯 Scroll Animation Triggers:', scrollAnimationTriggers.length);
    
    // 7. Analyze Animation Easing and Timing Functions
    const easingAnalysis = await page.evaluate(() => {
      const easingFunctions = new Set();
      const elements = document.querySelectorAll('*');
      
      elements.forEach(el => {
        const styles = getComputedStyle(el);
        if (styles.transitionTimingFunction && styles.transitionTimingFunction !== 'ease') {
          easingFunctions.add(styles.transitionTimingFunction);
        }
        if (styles.animationTimingFunction && styles.animationTimingFunction !== 'ease') {
          easingFunctions.add(styles.animationTimingFunction);
        }
      });
      
      return Array.from(easingFunctions);
    });
    
    console.log('⏱️ Easing Functions Used:', easingAnalysis);
    
    // 8. Test Animation Performance During Scroll
    await page.evaluate(() => {
      // Rapid scroll test to see how animations perform
      let scrollPosition = 0;
      const scrollInterval = setInterval(() => {
        scrollPosition += 50;
        window.scrollTo(0, scrollPosition);
        if (scrollPosition > 2000) {
          clearInterval(scrollInterval);
        }
      }, 16); // ~60fps
    });
    
    await page.waitForTimeout(2000);
    
    // 9. Capture Animation Screenshots for Analysis
    await page.screenshot({ 
      path: 'test-results/apple-iphone-air-animations.png',
      fullPage: true 
    });
    
    // 10. Generate Summary Report
    const analysisReport = {
      libraries: animationLibraries,
      scrollElements: scrollAnimations.length,
      intersectionObserver: intersectionObserverUsage,
      cssAnimations: cssAnimationAnalysis.length,
      performanceMetrics: await performanceMetrics,
      scrollTriggers: scrollAnimationTriggers.length,
      easingFunctions: easingAnalysis,
      timestamp: new Date().toISOString()
    };
    
    console.log('📋 Final Analysis Report:', JSON.stringify(analysisReport, null, 2));
    
    // Validate key findings
    expect(animationLibraries.length).toBeGreaterThan(0);
    expect(scrollAnimations.length).toBeGreaterThan(0);
    expect(intersectionObserverUsage.supported).toBe(true);
  });
  
  test('BackstopJS reference generation for Apple iPhone Air', async ({ page }) => {
    // This test helps us understand Apple's visual design patterns
    await page.goto('https://www.apple.com/iphone-air/', { 
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    await page.waitForTimeout(5000);
    
    // Take screenshots at different scroll positions to understand layout changes
    const scrollPositions = [0, 500, 1000, 1500, 2000];
    
    for (let i = 0; i < scrollPositions.length; i++) {
      await page.evaluate((position) => {
        window.scrollTo(0, position);
      }, scrollPositions[i]);
      
      await page.waitForTimeout(1000);
      
      await page.screenshot({ 
        path: `test-results/apple-scroll-${scrollPositions[i]}.png`,
        fullPage: false 
      });
    }
    
    console.log('📸 Apple iPhone Air visual analysis complete');
  });
});