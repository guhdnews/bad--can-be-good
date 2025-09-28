import { test, expect, Page } from '@playwright/test';

test.describe('Hamburger Menu Functionality Test', () => {
  
  test('Verify hamburger menu works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    
    console.log('📱 Testing hamburger menu functionality...');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Check if mobile menu toggle button exists and is clickable
    const mobileMenuToggle = page.locator('.mobile-menu-toggle');
    await expect(mobileMenuToggle).toBeVisible();
    console.log('✅ Mobile menu toggle button is visible');
    
    // Take screenshot before opening
    await page.screenshot({ 
      path: 'test-results/mobile-before-menu.png',
      clip: { x: 0, y: 0, width: 375, height: 200 }
    });
    
    // Click to open menu
    await mobileMenuToggle.click();
    await page.waitForTimeout(500);
    
    // Check if mobile menu appeared
    const mobileMenu = page.locator('.mobile-menu');
    await expect(mobileMenu).toBeVisible();
    console.log('✅ Mobile menu opens when clicked');
    
    // Verify navigation links are visible
    const navLinks = mobileMenu.locator('.mobile-menu-link');
    const linkCount = await navLinks.count();
    expect(linkCount).toBe(5); // Services, Packages, About, FAQ, Contact
    console.log(`✅ Found ${linkCount} navigation links`);
    
    // Take screenshot with menu open
    await page.screenshot({ 
      path: 'test-results/mobile-with-menu.png',
      clip: { x: 0, y: 0, width: 375, height: 400 }
    });
    
    // Click to close menu
    await mobileMenuToggle.click();
    await page.waitForTimeout(500);
    
    // Verify menu is closed
    await expect(mobileMenu).not.toBeVisible();
    console.log('✅ Mobile menu closes when clicked again');
    
    console.log('✅ Hamburger menu functionality test PASSED');
  });
  
  test('Verify menu button has proper styling', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    
    console.log('🎨 Testing hamburger menu styling...');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    const mobileMenuToggle = page.locator('.mobile-menu-toggle');
    
    // Check button dimensions and styling
    const buttonStyles = await mobileMenuToggle.evaluate(el => {
      const styles = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
        display: styles.display,
        cursor: styles.cursor,
        hasBackground: styles.backgroundColor !== 'rgba(0, 0, 0, 0)',
        hasBorder: styles.border !== 'none',
        isClickable: el.offsetWidth > 0 && el.offsetHeight > 0
      };
    });
    
    console.log('📊 Button properties:', buttonStyles);
    
    // Verify proper button properties
    expect(buttonStyles.width).toBe(44);
    expect(buttonStyles.height).toBe(44);
    expect(buttonStyles.display).toBe('flex');
    expect(buttonStyles.cursor).toBe('pointer');
    expect(buttonStyles.isClickable).toBe(true);
    
    console.log('✅ Hamburger menu has proper dimensions and styling');
  });
});
