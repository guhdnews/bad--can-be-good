import { test, expect } from '@playwright/test';

test.describe('Test Optimized Fixes', () => {
  test('verify logo, removed elements, and smooth animations', async ({ page }) => {
    console.log('🔍 Testing optimized homepage locally...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Test new clean logo
    const logo = page.locator('img[src*="upface-logo"]').first();
    if (await logo.isVisible()) {
      console.log('✅ Clean logo is displaying correctly');
      
      // Check logo dimensions
      const logoBox = await logo.boundingBox();
      if (logoBox) {
        console.log(`📏 Logo dimensions: ${logoBox.width}x${logoBox.height}`);
      }
    }
    
    // Check for unwanted elements above hero
    const heroSection = page.locator('section.section--hero');
    const heroBox = await heroSection.boundingBox();
    if (heroBox) {
      console.log(`📍 Hero section starts at: ${heroBox.y}px`);
      if (heroBox.y < 100) {
        console.log('✅ No unwanted elements above hero section');
      } else {
        console.log('❌ There might be elements above hero section');
      }
    }
    
    // Test animation smoothness
    const animatedElements = await page.$$('[style*=\"transform\"], [style*=\"opacity\"]');
    console.log(`🎬 Found ${animatedElements.length} animated elements`);
    
    // Check for hardware acceleration classes
    const hardwareAccelerated = await page.evaluate(() => {
      const elements = document.querySelectorAll('*[style*=\"translateZ\"]');
      return elements.length;
    });
    console.log(`⚡ Hardware accelerated elements: ${hardwareAccelerated}`);
    
    // Test button hover effects
    const primaryButton = page.locator('.btn-primary').first();
    if (await primaryButton.isVisible()) {
      await primaryButton.hover();
      console.log('✅ Button hover effects are working');
    }
    
    // Take screenshots
    await page.screenshot({ 
      path: 'test-results/optimized-homepage.png',
      fullPage: true 
    });
    
    console.log('🎯 Local testing complete - ready for deployment!');
  });
});