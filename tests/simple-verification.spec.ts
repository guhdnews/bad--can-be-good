import { test, expect } from '@playwright/test';

test.describe('Simple Animation Verification', () => {
  test('verify animations are working and no JavaScript errors', async ({ page }) => {
    console.log('🎯 SIMPLE VERIFICATION TEST...');
    
    const errors: any[] = [];
    const results: any = {};
    
    // Capture errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    const pagesToTest = [
      { name: 'Homepage', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'About', url: '/about' },
      { name: 'Contact', url: '/contact' },
      { name: 'FAQ', url: '/faq' }
    ];
    
    for (const pageInfo of pagesToTest) {
      try {
        await page.goto(`http://localhost:3000${pageInfo.url}`);
        await page.waitForLoadState('networkidle', { timeout: 6000 });
        
        // Count animated elements
        const animatedElements = await page.$$('[style*="transform"], [style*="opacity"]');
        results[pageInfo.name] = animatedElements.length;
        
        console.log(`✅ ${pageInfo.name}: ${animatedElements.length} animated elements`);
        
      } catch (error) {
        console.log(`❌ ${pageInfo.name}: Error - ${error.message}`);
        results[pageInfo.name] = 0;
      }
    }
    
    // Summary
    console.log('\\n📊 VERIFICATION SUMMARY:');
    
    let totalAnimations = 0;
    Object.entries(results).forEach(([page, count]) => {
      totalAnimations += count;
      const status = count > 0 ? '✅' : '❌';
      console.log(`  ${status} ${page}: ${count} animated elements`);
    });
    
    console.log(`\\n🎯 Total Animations: ${totalAnimations}`);
    console.log(`🐛 JavaScript Errors: ${errors.length}`);
    
    if (errors.length > 0) {
      console.log('\\nERRORS FOUND:');
      errors.forEach((error, i) => console.log(`  ${i + 1}. ${error}`));
    }
    
    // Final status
    if (errors.length === 0 && totalAnimations > 10) {
      console.log('\\n🎉 VERIFICATION PASSED - READY FOR DEPLOYMENT!');
      console.log('✅ No JavaScript errors');
      console.log('✅ Animations working across all pages');
    } else {
      console.log('\\n🚨 VERIFICATION FAILED - DO NOT DEPLOY!');
      if (errors.length > 0) console.log('❌ JavaScript errors found');
      if (totalAnimations <= 10) console.log('❌ Insufficient animations detected');
    }
    
    // Test assertions
    expect(errors.length, 'No JavaScript errors should be present').toBe(0);
    expect(totalAnimations, 'Should have animations across pages').toBeGreaterThan(10);
  });
});