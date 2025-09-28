import { test, expect } from '@playwright/test';

test.describe('Animation Smoothness Test', () => {
  test('verify all pages have smooth animations and no errors', async ({ page }) => {
    console.log('🎯 TESTING ANIMATION SMOOTHNESS...');
    
    const errors: any[] = [];
    const results = {
      motionEffects: {},
      smoothness: {}
    };
    
    // Capture errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
        console.log(`❌ ERROR: ${msg.text()}`);
      }
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
      console.log(`💥 PAGE ERROR: ${error.message}`);
    });
    
    const pagesToTest = [
      { name: 'Homepage', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'About', url: '/about' },
      { name: 'Contact', url: '/contact' },
      { name: 'FAQ', url: '/faq' }
    ];
    
    for (const pageInfo of pagesToTest) {
      console.log(`\\n🔍 Testing ${pageInfo.name} page:`);
      
      try {
        await page.goto(`http://localhost:3000${pageInfo.url}`);
        await page.waitForLoadState('networkidle', { timeout: 8000 });
        console.log(`  ✅ ${pageInfo.name} loaded without errors`);
        
        // Count animated elements
        const animatedElements = await page.$$('[style*="transform"], [style*="opacity"]');
        console.log(`  🎬 Animated elements: ${animatedElements.length}`);
        results.motionEffects[pageInfo.name] = animatedElements.length;
        
        // Test button smoothness (if buttons exist)
        const buttons = await page.$$('.btn, button');
        if (buttons.length > 0) {
          const firstBtn = buttons[0];
          
          // Test hover performance
          const startTime = Date.now();
          await firstBtn.hover();
          await page.waitForTimeout(50);
          await page.mouse.move(100, 100); // Move away
          const endTime = Date.now();
          
          const hoverTime = endTime - startTime;
          console.log(`  ⚡ Button hover response: ${hoverTime}ms`);
          
          // Determine smoothness: < 100ms = smooth, >= 100ms = needs_work
          const smoothnessStatus = hoverTime < 100 ? 'smooth' : 'needs_work';
          results.smoothness[pageInfo.name] = smoothnessStatus;
          
          const icon = smoothnessStatus === 'smooth' ? '✅' : '⚠️';
          console.log(`  ${icon} Animation smoothness: ${smoothnessStatus}`);
        } else {
          results.smoothness[pageInfo.name] = 'no_buttons';
          console.log(`  ℹ️  No buttons found to test hover performance`);
        }
        
      } catch (error) {
        console.log(`  ❌ Error testing ${pageInfo.name}: ${error.message}`);
        results.smoothness[pageInfo.name] = 'error';
      }
      
      // Small delay between pages
      await page.waitForTimeout(200);
    }
    
    // Final verification
    console.log('\\n📊 FINAL ANIMATION SMOOTHNESS REPORT:');
    
    console.log('Motion Effects by Page:');
    Object.entries(results.motionEffects).forEach(([page, count]) => {
      const status = count > 0 ? '✅' : '❌';
      console.log(`  ${status} ${page}: ${count} animated elements`);
    });
    
    console.log('\\nAnimation Smoothness:');
    let allSmooth = true;
    Object.entries(results.smoothness).forEach(([page, status]) => {
      const icon = status === 'smooth' ? '✅' : '⚠️';
      console.log(`  ${icon} ${page}: ${status}`);
      if (status !== 'smooth' && status !== 'no_buttons') {
        allSmooth = false;
      }
    });
    
    console.log(`\\n🎯 JavaScript Errors Found: ${errors.length}`);
    
    if (errors.length === 0 && allSmooth) {
      console.log('\\n🎉 ALL ANIMATIONS ARE SMOOTH - READY FOR DEPLOYMENT!');
    } else {
      console.log('\\n🚨 ISSUES FOUND - DO NOT DEPLOY UNTIL FIXED!');
      if (errors.length > 0) {
        console.log('JavaScript errors must be resolved.');
      }
      if (!allSmooth) {
        console.log('Animation smoothness issues must be fixed.');
      }
    }
    
    // Fail the test if there are critical issues
    expect(errors.length).toBe(0);
    expect(allSmooth).toBe(true);
  });
});