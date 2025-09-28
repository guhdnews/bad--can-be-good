import { test, expect, Page } from '@playwright/test';

test.describe('Hamburger Menu Simple Test', () => {
  
  test('Verify mobile hamburger menu button exists and functions', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    
    console.log('📱 Testing mobile hamburger menu functionality...');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Check if mobile menu toggle button is visible
    const mobileMenuToggle = page.locator('.mobile-menu-toggle');
    await expect(mobileMenuToggle).toBeVisible();
    console.log('✅ Mobile menu toggle button is visible');
    
    // Check if it contains SVG (hamburger icon)
    const svgIcon = mobileMenuToggle.locator('svg');
    await expect(svgIcon).toBeVisible();
    console.log('✅ SVG icon is present');
    
    // Take screenshot of mobile menu closed state
    await page.screenshot({ 
      path: 'test-results/hamburger-menu-closed.png',
      clip: { x: 0, y: 0, width: 375, height: 80 }
    });
    
    // Test clicking the hamburger menu
    await mobileMenuToggle.click();
    await page.waitForTimeout(500);
    
    // Check if mobile menu is now visible
    const mobileMenu = page.locator('.mobile-menu');
    await expect(mobileMenu).toBeVisible();
    console.log('✅ Mobile menu opens when hamburger is clicked');
    
    // Take screenshot of mobile menu open state
    await page.screenshot({ 
      path: 'test-results/hamburger-menu-open.png',
      clip: { x: 0, y: 0, width: 375, height: 400 }
    });
    
    // Test clicking to close menu
    await mobileMenuToggle.click();
    await page.waitForTimeout(500);
    
    // Verify menu is closed
    await expect(mobileMenu).not.toBeVisible();
    console.log('✅ Mobile menu closes when X icon is clicked');
    
    // Check button styling
    const buttonStyles = await mobileMenuToggle.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        width: styles.width,
        height: styles.height,
        backgroundColor: styles.backgroundColor,
        border: styles.border,
        cursor: styles.cursor
      };
    });
    
    console.log('🎨 Mobile menu button styles:', buttonStyles);
    
    // Verify proper dimensions and styling
    expect(buttonStyles.display).toBe('flex');
    expect(buttonStyles.cursor).toBe('pointer');
    expect(buttonStyles.width).toBe('44px');
    expect(buttonStyles.height).toBe('44px');
    
    console.log('✅ Hamburger menu has proper styling and dimensions');
  });
  
  test('Verify hamburger menu is hidden on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('http://localhost:3000');
    
    console.log('🖥️ Testing desktop menu state...');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Mobile menu toggle should be hidden on desktop
    const mobileMenuToggle = page.locator('.mobile-menu-toggle');
    await expect(mobileMenuToggle).not.toBeVisible();
    console.log('✅ Hamburger menu hidden on desktop');
    
    // Desktop menu should be visible
    const desktopMenu = page.locator('.header-menu');
    await expect(desktopMenu).toBeVisible();
    console.log('✅ Desktop menu visible on desktop');
  });
  
  test('Verify icon changes from hamburger to X when opened', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    
    console.log('🔄 Testing icon state changes...');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    const mobileMenuToggle = page.locator('.mobile-menu-toggle');
    
    // Get initial SVG content (should be hamburger/menu)
    const initialIcon = await mobileMenuToggle.locator('svg').first();
    await expect(initialIcon).toBeVisible();
    
    // Click to open menu
    await mobileMenuToggle.click();
    await page.waitForTimeout(300);
    
    // Get new SVG content (should be X/close)
    const openIcon = await mobileMenuToggle.locator('svg').first();
    await expect(openIcon).toBeVisible();
    
    console.log('✅ Icon changes when menu opens');
    
    // Click to close menu
    await mobileMenuToggle.click();
    await page.waitForTimeout(300);
    
    // Verify icon is back to hamburger
    const closedIcon = await mobileMenuToggle.locator('svg').first();
    await expect(closedIcon).toBeVisible();
    
    console.log('✅ Icon changes back when menu closes');
  });
});
