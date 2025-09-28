import { test, expect, Page } from '@playwright/test';

// Animation smoothness diagnostic test
test.describe('Animation Smoothness Diagnostic', () => {
  
  test('diagnose homepage animation performance issues', async ({ page }) => {
    console.log('🔍 Starting Animation Smoothness Diagnostic Test\n');
    
    // Navigate to homepage
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Wait for initial animations to complete
    await page.waitForTimeout(2000);
    
    console.log('1️⃣ Analyzing Hero Section Performance...\n');
    
    // Check hero section animation performance
    const heroMetrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const hero = document.querySelector('.section--hero');
        if (!hero) {
          resolve({ error: 'Hero section not found' });
          return;
        }
        
        let frameCount = 0;
        let startTime = performance.now();
        let animations = [];
        
        // Check for running animations
        const animatedElements = document.querySelectorAll('[style*="transform"], [style*="opacity"], .motion-div');
        console.log(`Found ${animatedElements.length} potentially animated elements`);
        
        // Measure frame performance during scroll
        function measureFrames() {
          frameCount++;
          if (frameCount < 60) { // Measure for 60 frames
            requestAnimationFrame(measureFrames);
          } else {
            const endTime = performance.now();
            const totalTime = endTime - startTime;
            const averageFrameTime = totalTime / frameCount;
            const fps = 1000 / averageFrameTime;
            
            resolve({
              fps: Math.round(fps),
              averageFrameTime: Math.round(averageFrameTime * 100) / 100,
              animatedElementCount: animatedElements.length,
              totalAnimationTime: Math.round(totalTime),
              heroHeight: hero.offsetHeight,
              heroComputedStyle: window.getComputedStyle(hero)
            });
          }
        }
        
        requestAnimationFrame(measureFrames);
      });
    });
    
    console.log('   📊 Hero Section Metrics:');
    console.log(`   - FPS: ${heroMetrics.fps}`);
    console.log(`   - Average Frame Time: ${heroMetrics.averageFrameTime}ms`);
    console.log(`   - Animated Elements: ${heroMetrics.animatedElementCount}`);
    console.log(`   - Hero Height: ${heroMetrics.heroHeight}px`);
    
    // Check for performance issues
    if (heroMetrics.fps < 30) {
      console.log('   ⚠️  WARNING: Low FPS detected in hero section');
    }
    if (heroMetrics.averageFrameTime > 33) {
      console.log('   ⚠️  WARNING: High frame time (> 33ms) detected');
    }
    
    console.log('\n2️⃣ Testing Button Hover Animations...\n');
    
    // Test button hover performance
    const buttons = page.locator('.btn');
    const buttonCount = await buttons.count();
    console.log(`   Found ${buttonCount} buttons to test`);
    
    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      const button = buttons.nth(i);
      const buttonText = await button.textContent();
      
      // Measure hover performance
      const hoverMetrics = await page.evaluate((btnText) => {
        return new Promise((resolve) => {
          const btn = Array.from(document.querySelectorAll('.btn')).find(b => b.textContent?.includes(btnText));
          if (!btn) {
            resolve({ error: 'Button not found' });
            return;
          }
          
          const startTime = performance.now();
          
          // Simulate hover
          btn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const endTime = performance.now();
              const hoverTime = endTime - startTime;
              
              // Get computed styles
              const computedStyle = window.getComputedStyle(btn);
              
              resolve({
                hoverResponseTime: Math.round(hoverTime * 100) / 100,
                transform: computedStyle.transform,
                transition: computedStyle.transition,
                willChange: computedStyle.willChange
              });
            });
          });
        });
      }, buttonText);
      
      console.log(`   Button "${buttonText}": ${hoverMetrics.hoverResponseTime}ms response time`);
      if (hoverMetrics.hoverResponseTime > 100) {
        console.log(`   ⚠️  WARNING: Slow hover response on "${buttonText}"`);
      }
    }
    
    console.log('\n3️⃣ Analyzing Scroll Performance...\n');
    
    // Test scroll performance
    const scrollMetrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        let frameCount = 0;
        let startTime = performance.now();
        let scrollEvents = 0;
        
        function measureScrollFrames() {
          frameCount++;
          if (frameCount < 30) {
            requestAnimationFrame(measureScrollFrames);
          } else {
            const endTime = performance.now();
            const fps = Math.round(1000 / ((endTime - startTime) / frameCount));
            
            resolve({
              scrollFPS: fps,
              scrollEvents: scrollEvents,
              documentHeight: document.documentElement.scrollHeight,
              windowHeight: window.innerHeight
            });
          }
        }
        
        // Start scroll simulation
        window.scrollTo(0, 100);
        requestAnimationFrame(measureScrollFrames);
        
        // Count scroll events
        window.addEventListener('scroll', () => scrollEvents++);
      });
    });
    
    console.log(`   📊 Scroll Performance: ${scrollMetrics.scrollFPS} FPS`);
    if (scrollMetrics.scrollFPS < 30) {
      console.log('   ⚠️  WARNING: Poor scroll performance detected');
    }
    
    console.log('\n4️⃣ Testing Mobile Viewport Performance...\n');
    
    // Test mobile performance
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    const mobileMetrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        let frameCount = 0;
        let startTime = performance.now();
        
        function measureMobileFrames() {
          frameCount++;
          if (frameCount < 30) {
            requestAnimationFrame(measureMobileFrames);
          } else {
            const endTime = performance.now();
            const fps = Math.round(1000 / ((endTime - startTime) / frameCount));
            
            // Check for mobile-specific issues
            const heroSection = document.querySelector('.section--hero');
            const mobileStyles = window.getComputedStyle(heroSection);
            
            resolve({
              mobileFPS: fps,
              heroMinHeight: mobileStyles.minHeight,
              heroPadding: mobileStyles.padding,
              viewport: `${window.innerWidth}x${window.innerHeight}`
            });
          }
        }
        
        requestAnimationFrame(measureMobileFrames);
      });
    });
    
    console.log(`   📊 Mobile Performance: ${mobileMetrics.mobileFPS} FPS`);
    console.log(`   📱 Mobile Hero Min-Height: ${mobileMetrics.heroMinHeight}`);
    console.log(`   📱 Mobile Hero Padding: ${mobileMetrics.heroPadding}`);
    
    console.log('\n5️⃣ Checking Animation Configuration Issues...\n');
    
    // Check for problematic animation configurations
    const animationIssues = await page.evaluate(() => {
      const issues = [];
      
      // Check for conflicting CSS
      const elementsWithTransform = document.querySelectorAll('[style*="transform"]');
      if (elementsWithTransform.length > 10) {
        issues.push(`Too many inline transforms: ${elementsWithTransform.length}`);
      }
      
      // Check for missing will-change
      const animatedElements = document.querySelectorAll('.motion-div, [class*="animate"], [class*="transition"]');
      let missingWillChange = 0;
      animatedElements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.willChange === 'auto') {
          missingWillChange++;
        }
      });
      
      if (missingWillChange > 0) {
        issues.push(`${missingWillChange} elements missing will-change optimization`);
      }
      
      // Check for hardware acceleration
      const elementsNeedingAcceleration = document.querySelectorAll('.btn, .feature-card, [class*="motion"]');
      let noHardwareAcceleration = 0;
      elementsNeedingAcceleration.forEach(el => {
        const style = window.getComputedStyle(el);
        if (!style.transform.includes('translateZ') && !style.transform.includes('translate3d')) {
          noHardwareAcceleration++;
        }
      });
      
      if (noHardwareAcceleration > 0) {
        issues.push(`${noHardwareAcceleration} elements without hardware acceleration`);
      }
      
      return issues;
    });
    
    console.log('   🔧 Animation Issues Found:');
    if (animationIssues.length === 0) {
      console.log('   ✅ No obvious animation configuration issues');
    } else {
      animationIssues.forEach(issue => {
        console.log(`   ⚠️  ${issue}`);
      });
    }
    
    console.log('\n6️⃣ Final Diagnostic Summary...\n');
    
    // Generate recommendations
    const recommendations = [];
    if (heroMetrics.fps < 40) recommendations.push('Optimize hero section animations');
    if (scrollMetrics.scrollFPS < 40) recommendations.push('Improve scroll performance');
    if (mobileMetrics.mobileFPS < 30) recommendations.push('Optimize mobile animations');
    if (animationIssues.length > 0) recommendations.push('Fix animation configuration issues');
    
    console.log('   📋 RECOMMENDATIONS:');
    if (recommendations.length === 0) {
      console.log('   ✅ No major issues detected');
    } else {
      recommendations.forEach((rec, index) => {
        console.log(`   ${index + 1}. ${rec}`);
      });
    }
    
    // Reset viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    
    console.log('\n🎯 Diagnostic Complete!');
  });
  
  test('compare animation performance before/after hero changes', async ({ page }) => {
    console.log('\n🔄 Comparing Animation Performance...\n');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Check if recent hero changes caused performance issues
    const heroPerformance = await page.evaluate(() => {
      const hero = document.querySelector('.section--hero');
      const heroStyles = window.getComputedStyle(hero);
      
      return {
        minHeight: heroStyles.minHeight,
        padding: heroStyles.padding,
        displayValue: heroStyles.display,
        alignItems: heroStyles.alignItems,
        hasTransform: heroStyles.transform !== 'none'
      };
    });
    
    console.log('   Current Hero Configuration:');
    console.log(`   - Min Height: ${heroPerformance.minHeight}`);
    console.log(`   - Padding: ${heroPerformance.padding}`);
    console.log(`   - Display: ${heroPerformance.displayValue}`);
    console.log(`   - Align Items: ${heroPerformance.alignItems}`);
    
    // The reduced height might be causing layout thrashing
    if (heroPerformance.minHeight === '70vh' || heroPerformance.minHeight === '80vh') {
      console.log('   ⚠️  Recent hero height reduction detected - may be causing reflow issues');
    }
  });
});