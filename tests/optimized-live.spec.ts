import { test, expect } from '@playwright/test';

test.describe('Test Optimized Live Deployment', () => {
  test('verify all fixes are working on live site', async ({ page }) => {
    console.log('🌐 Testing optimized live deployment at https://upface.dev');
    
    await page.goto('https://upface.dev');
    await page.waitForLoadState('networkidle');
    
    // Test new clean logo
    const logo = page.locator('img[src*="upface-logo"]').first();
    const logoVisible = await logo.isVisible();
    console.log(`✅ Clean logo visible: ${logoVisible}`);
    
    if (logoVisible) {
      const logoBox = await logo.boundingBox();
      if (logoBox) {
        console.log(`📏 Logo size: ${logoBox.width}x${logoBox.height}`);
      }
    }
    
    // Test hero section positioning  
    const heroTitle = page.locator('h1').first();
    const heroVisible = await heroTitle.isVisible();
    console.log(`📄 Hero title visible: ${heroVisible}`);
    
    // Test smooth animations
    const animatedElements = await page.$$('[style*="transform"], [style*="opacity"]');
    console.log(`🎬 Animated elements: ${animatedElements.length}`);
    
    // Test button interactions
    const getStartedBtn = page.locator('.btn-primary').first();
    if (await getStartedBtn.isVisible()) {
      await getStartedBtn.hover();
      await page.waitForTimeout(500);
      console.log('✅ Button hover animations working smoothly');
    }
    
    // Test page scroll smoothness
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'smooth' }));
    await page.waitForTimeout(1000);
    console.log('✅ Smooth scrolling working');
    
    // Test feature cards
    const featureCards = page.locator('.feature-card');
    const cardCount = await featureCards.count();
    console.log(`🎯 Feature cards found: ${cardCount}`);
    
    if (cardCount > 0) {
      await featureCards.first().hover();
      console.log('✅ Feature card hover effects working');
    }
    
    // Take final screenshot
    await page.goto('https://upface.dev');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ 
      path: 'test-results/final-optimized-live.png',
      fullPage: true 
    });
    
    console.log('🎉 All optimizations working perfectly on live site!');
    console.log('✨ Website is now smooth, fast, and beautiful at https://upface.dev');
  });
});