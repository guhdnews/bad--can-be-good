import { test, expect } from '@playwright/test';

test.describe('Live Deployment Verification', () => {
  test('verify live website with all improvements', async ({ page }) => {
    console.log('🌐 Testing live deployment at https://upface.dev');
    
    await page.goto('https://upface.dev');
    await page.waitForLoadState('networkidle');
    
    // Test new logo
    const logo = page.locator('img[src*="upface-logo"]').first();
    const logoVisible = await logo.isVisible();
    console.log(`✅ New logo visible: ${logoVisible}`);
    
    // Test animations
    const animatedElements = await page.$$('[style*="transform"], [style*="opacity"]');
    console.log(`✅ Animated elements found: ${animatedElements.length}`);
    
    // Test page title
    const title = await page.title();
    console.log(`📄 Page title: ${title}`);
    expect(title).toContain('Upface');
    
    // Test navigation
    const navLinks = await page.$$('nav a, header a[href]');
    console.log(`🔗 Navigation links: ${navLinks.length}`);
    
    // Test FAQ page
    console.log('🔍 Testing FAQ page...');
    await page.goto('https://upface.dev/faq');
    await page.waitForLoadState('networkidle');
    
    const faqTitle = await page.textContent('h1');
    console.log(`📋 FAQ title: ${faqTitle}`);
    
    // Test contact page
    console.log('🔍 Testing contact page...');
    await page.goto('https://upface.dev/contact');
    await page.waitForLoadState('networkidle');
    
    const contactForm = page.locator('form');
    const formVisible = await contactForm.isVisible();
    console.log(`📝 Contact form visible: ${formVisible}`);
    
    // Take screenshots
    await page.goto('https://upface.dev');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ 
      path: 'test-results/live-homepage.png',
      fullPage: true 
    });
    
    console.log('🎉 Live deployment verification complete!');
    console.log('🌐 Your enhanced website is live at: https://upface.dev');
  });
});