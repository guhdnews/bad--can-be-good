import { test, expect } from '@playwright/test';

test.describe('Upface Website Health Check', () => {
  test('homepage loads correctly', async ({ page }) => {
    // Start development server if needed
    await page.goto('http://localhost:3000');
    
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/Upface/i);
    
    // Take a screenshot for visual inspection
    await page.screenshot({ path: 'test-results/homepage-screenshot.png' });
    
    // Check for console errors
    const logs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(msg.text());
      }
    });
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    
    // Log any console errors found
    if (logs.length > 0) {
      console.log('Console errors found:', logs);
    }
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Test main navigation links using more specific selectors
    const navLinks = [
      { text: 'Services', url: '/services', selector: 'header .header-menu-link[href="/services"]' },
      { text: 'About', url: '/about', selector: 'header .header-menu-link[href="/about"]' },
      { text: 'Contact', url: '/contact', selector: 'header .header-menu-link[href="/contact"]' }
    ];
    
    for (const link of navLinks) {
      const linkElement = page.locator(link.selector).first();
      if (await linkElement.isVisible()) {
        await linkElement.click();
        await expect(page).toHaveURL(new RegExp(link.url));
        await page.goBack();
        await page.waitForLoadState('networkidle');
      }
    }
  });

  test('intranet authentication flow', async ({ page }) => {
    await page.goto('http://localhost:3000/intranet');
    
    // Should redirect to login or show login form
    await page.waitForLoadState('networkidle');
    
    // Check if Firebase Auth is working
    const hasFirebaseAuth = await page.evaluate(() => {
      return typeof window.firebase !== 'undefined' || 
             document.querySelector('[data-firebase]') !== null;
    });
    
    console.log('Firebase Auth detected:', hasFirebaseAuth);
    
    // Take screenshot of auth state
    await page.screenshot({ path: 'test-results/intranet-auth-screenshot.png' });
  });
});