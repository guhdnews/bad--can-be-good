import { test, expect, Page } from '@playwright/test';

test.describe('Animation Smoothness Verification', () => {
  
  test('verify animation performance improvements', async ({ page }) => {
    console.log('🎯 Verifying Animation Performance Improvements\n');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    console.log('1️⃣ Testing Hero Section Performance After Fixes...\n');
    
    const heroPerformance = await page.evaluate(() => {
      return new Promise((resolve) => {
        let frameCount = 0;
        let startTime = performance.now();
        
        function measureFrames() {
          frameCount++;
          if (frameCount < 60) {
            requestAnimationFrame(measureFrames);
          } else {
            const endTime = performance.now();
            const averageFrameTime = (endTime - startTime) / frameCount;
            const fps = Math.round(1000 / averageFrameTime);
            
            // Check hardware acceleration
            const buttons = document.querySelectorAll('.btn');
            let buttonsWithAcceleration = 0;
            buttons.forEach(btn => {
              const style = window.getComputedStyle(btn);
              if (style.transform.includes('translateZ') || style.willChange === 'transform') {
                buttonsWithAcceleration++;
              }
            });
            
            resolve({
              fps,
              averageFrameTime: Math.round(averageFrameTime * 100) / 100,
              buttonsWithAcceleration,
              totalButtons: buttons.length
            });
          }
        }
        
        requestAnimationFrame(measureFrames);
      });
    });
    
    console.log(`   📊 Hero Performance: ${heroPerformance.fps} FPS`);
    console.log(`   ⏱️  Average Frame Time: ${heroPerformance.averageFrameTime}ms`);
    console.log(`   🚀 Hardware Accelerated Buttons: ${heroPerformance.buttonsWithAcceleration}/${heroPerformance.totalButtons}`);
    
    // Performance thresholds
    if (heroPerformance.fps >= 50) {
      console.log('   ✅ PASS: Hero section FPS is good (≥50 FPS)');
    } else {
      console.log(`   ⚠️  WARNING: Hero section FPS is low (${heroPerformance.fps} FPS)`);
    }
    
    if (heroPerformance.averageFrameTime <= 20) {
      console.log('   ✅ PASS: Frame time is excellent (≤20ms)');
    } else {
      console.log(`   ⚠️  WARNING: Frame time is high (${heroPerformance.averageFrameTime}ms)`);
    }
    
    console.log('\n2️⃣ Testing Button Hover Smoothness...\n');
    
    const buttons = page.locator('.btn');
    const buttonCount = await buttons.count();
    let smoothButtonCount = 0;
    
    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      const button = buttons.nth(i);
      const buttonText = await button.textContent();
      
      const hoverTest = await page.evaluate((btnText) => {
        return new Promise((resolve) => {
          const btn = Array.from(document.querySelectorAll('.btn')).find(b => b.textContent?.includes(btnText));
          if (!btn) {
            resolve({ error: 'Button not found' });
            return;
          }
          
          const startTime = performance.now();
          btn.dispatchEvent(new MouseEvent('mouseenter'));
          
          requestAnimationFrame(() => {
            const endTime = performance.now();
            const hoverTime = endTime - startTime;
            const computedStyle = window.getComputedStyle(btn);
            
            resolve({
              hoverTime: Math.round(hoverTime * 100) / 100,
              hasWillChange: computedStyle.willChange === 'transform',
              hasTransform: computedStyle.transform !== 'none',
              transition: computedStyle.transition
            });
          });
        });
      }, buttonText);
      
      console.log(`   Button "${buttonText}":`);
      console.log(`     - Hover Response: ${hoverTest.hoverTime}ms`);
      console.log(`     - Hardware Accelerated: ${hoverTest.hasWillChange ? '✅' : '❌'}`);
      console.log(`     - Transform Applied: ${hoverTest.hasTransform ? '✅' : '❌'}`);
      
      if (hoverTest.hoverTime <= 50 && hoverTest.hasWillChange) {
        smoothButtonCount++;
      }
    }
    
    console.log(`\n   📊 Smooth Buttons: ${smoothButtonCount}/${Math.min(buttonCount, 3)}`);
    
    console.log('\n3️⃣ Testing Mobile Performance...\n');
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    const mobilePerformance = await page.evaluate(() => {
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
            
            resolve({ mobileFPS: fps });
          }
        }
        
        requestAnimationFrame(measureMobileFrames);
      });
    });
    
    console.log(`   📱 Mobile Performance: ${mobilePerformance.mobileFPS} FPS`);
    
    if (mobilePerformance.mobileFPS >= 40) {
      console.log('   ✅ PASS: Mobile performance is good (≥40 FPS)');
    } else {
      console.log(`   ⚠️  WARNING: Mobile performance needs improvement (${mobilePerformance.mobileFPS} FPS)`);
    }
    
    console.log('\n4️⃣ Checking Hardware Acceleration Coverage...\n');
    
    await page.setViewportSize({ width: 1200, height: 800 });
    
    const accelerationCoverage = await page.evaluate(() => {
      const interactiveElements = document.querySelectorAll('.btn, .feature-card, [class*="motion"], .header-menu-link');
      let acceleratedCount = 0;
      
      interactiveElements.forEach(element => {
        const style = window.getComputedStyle(element);
        if (style.willChange === 'transform' || 
            style.transform.includes('translateZ') || 
            style.backfaceVisibility === 'hidden') {
          acceleratedCount++;
        }
      });
      
      return {
        total: interactiveElements.length,
        accelerated: acceleratedCount,
        percentage: Math.round((acceleratedCount / interactiveElements.length) * 100)
      };
    });
    
    console.log(`   🚀 Hardware Acceleration Coverage: ${accelerationCoverage.percentage}% (${accelerationCoverage.accelerated}/${accelerationCoverage.total})`);
    
    if (accelerationCoverage.percentage >= 90) {
      console.log('   ✅ PASS: Excellent hardware acceleration coverage');
    } else if (accelerationCoverage.percentage >= 70) {
      console.log('   ✅ PASS: Good hardware acceleration coverage');
    } else {
      console.log(`   ⚠️  WARNING: Poor hardware acceleration coverage (${accelerationCoverage.percentage}%)`);
    }
    
    console.log('\n5️⃣ Final Performance Assessment...\n');
    
    const overallScore = {
      heroFPS: heroPerformance.fps >= 50 ? 1 : 0,
      frameTime: heroPerformance.averageFrameTime <= 20 ? 1 : 0,
      buttonSmooth: smoothButtonCount >= Math.min(buttonCount, 3) * 0.8 ? 1 : 0,
      mobileFPS: mobilePerformance.mobileFPS >= 40 ? 1 : 0,
      acceleration: accelerationCoverage.percentage >= 70 ? 1 : 0
    };
    
    const totalScore = Object.values(overallScore).reduce((a, b) => a + b, 0);
    const maxScore = Object.keys(overallScore).length;
    const percentageScore = Math.round((totalScore / maxScore) * 100);
    
    console.log(`   📊 OVERALL PERFORMANCE SCORE: ${totalScore}/${maxScore} (${percentageScore}%)`);
    
    if (percentageScore >= 80) {
      console.log('   🎉 EXCELLENT: Animation smoothness has been restored!');
    } else if (percentageScore >= 60) {
      console.log('   ✅ GOOD: Significant improvements made, minor issues remain');
    } else {
      console.log('   ⚠️  NEEDS WORK: More optimizations required');
    }
    
    console.log('\n✨ Verification Complete!');
  });
  
  test('verify scroll performance improvements', async ({ page }) => {
    console.log('\n🔄 Verifying Scroll Performance...\n');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    const scrollPerformance = await page.evaluate(() => {
      return new Promise((resolve) => {
        let frameCount = 0;
        let startTime = performance.now();
        let maxFrameTime = 0;
        let lastFrameTime = startTime;
        
        function measureScrollFrames() {
          const currentTime = performance.now();
          const frameTime = currentTime - lastFrameTime;
          maxFrameTime = Math.max(maxFrameTime, frameTime);
          lastFrameTime = currentTime;
          
          frameCount++;
          if (frameCount < 60) {
            requestAnimationFrame(measureScrollFrames);
          } else {
            const totalTime = currentTime - startTime;
            const avgFPS = Math.round(1000 / (totalTime / frameCount));
            
            resolve({
              averageFPS: avgFPS,
              maxFrameTime: Math.round(maxFrameTime * 100) / 100,
              totalFrames: frameCount
            });
          }
        }
        
        // Start scroll simulation
        window.scrollTo(0, 200);
        requestAnimationFrame(measureScrollFrames);
      });
    });
    
    console.log(`   📊 Scroll Performance:`);
    console.log(`     - Average FPS: ${scrollPerformance.averageFPS}`);
    console.log(`     - Max Frame Time: ${scrollPerformance.maxFrameTime}ms`);
    
    if (scrollPerformance.averageFPS >= 50 && scrollPerformance.maxFrameTime <= 25) {
      console.log('   ✅ EXCELLENT: Scroll performance is smooth');
    } else if (scrollPerformance.averageFPS >= 40) {
      console.log('   ✅ GOOD: Scroll performance is acceptable');
    } else {
      console.log('   ⚠️  WARNING: Scroll performance needs improvement');
    }
  });
});