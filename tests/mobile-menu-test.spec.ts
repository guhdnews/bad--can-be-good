import { test, expect, Page } from '@playwright/test';

test.describe('Mobile Hamburger Menu Test', () => {
  
  test('Verify hamburger menu icon is visible and functional on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    
    console.log('📱 Testing mobile hamburger menu...');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Check if mobile menu toggle is visible
    const mobileMenuToggle = page.locator('.mobile-menu-toggle');
    await expect(mobileMenuToggle).toBeVisible();
    
    // Check if hamburger icon (Menu) is displayed initially
    const menuIcon = mobileMenuToggle.locator('svg[data-lucide="menu"]');
    await expect(menuIcon).toBeVisible();
    
    console.log('✅ Hamburger menu icon is visible');
    
    // Take screenshot of closed menu state
    await page.screenshot({ 
      path: 'test-results/mobile-menu-closed.png' 
    });
    
    // Click to open menu
    await mobileMenuToggle.click();
    await page.waitForTimeout(500);
    
    // Check if X icon is now displayed
    const closeIcon = mobileMenuToggle.locator('svg[data-lucide="x"]');
    await expect(closeIcon).toBeVisible();
    
    // Check if mobile menu is now open
    const mobileMenu = page.locator('.mobile-menu');
    await expect(mobileMenu).toBeVisible();
    
    // Verify navigation links are present
    const navLinks = mobileMenu.locator('.mobile-menu-link');
    await expect(navLinks).toHaveCount(5); // Services, Packages, About, FAQ, Contact
    
    console.log('✅ Mobile menu opens correctly with X icon');
    
    // Take screenshot of open menu state
    await page.screenshot({ 
      path: 'test-results/mobile-menu-open.png' 
    });
    
    // Test navigation links
    const servicesLink = navLinks.filter({ hasText: 'Services' });
    const packagesLink = navLinks.filter({ hasText: 'Packages' });
    const aboutLink = navLinks.filter({ hasText: 'About' });
    const faqLink = navLinks.filter({ hasText: 'FAQ' });
    const contactLink = navLinks.filter({ hasText: 'Contact' });
    
    await expect(servicesLink).toBeVisible();
    await expect(packagesLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
    await expect(faqLink).toBeVisible();
    await expect(contactLink).toBeVisible();
    
    console.log('✅ All navigation links are present and visible');
    
    // Click to close menu
    await mobileMenuToggle.click();
    await page.waitForTimeout(500);
    
    // Verify menu is closed and hamburger icon is back
    await expect(mobileMenu).not.toBeVisible();
    await expect(menuIcon).toBeVisible();
    
    console.log('✅ Mobile menu closes correctly, hamburger icon restored');
    
    // Test menu styling and contrast
    const menuToggleStyles = await mobileMenuToggle.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        width: styles.width,
        height: styles.height,
        backgroundColor: styles.backgroundColor,
        borderColor: styles.borderColor,
        borderRadius: styles.borderRadius,
        color: styles.color
      };
    });
    
    console.log('🎨 Mobile menu toggle styles:', menuToggleStyles);
    
    // Verify the toggle has proper dimensions and styling
    expect(menuToggleStyles.display).toBe('flex');
    expect(menuToggleStyles.width).toBe('44px');
    expect(menuToggleStyles.height).toBe('44px');
    
    console.log('✅ Mobile hamburger menu test completed successfully!');
  });
  
  test('Verify hamburger menu is hidden on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('http://localhost:3000');
    
    console.log('🖥️ Testing desktop menu visibility...');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Mobile menu toggle should be hidden on desktop
    const mobileMenuToggle = page.locator('.mobile-menu-toggle');
    await expect(mobileMenuToggle).not.toBeVisible();
    
    // Desktop menu should be visible
    const desktopMenu = page.locator('.header-menu');
    await expect(desktopMenu).toBeVisible();
    
    console.log('✅ Mobile menu properly hidden on desktop, desktop menu visible');
  });
  
  test('Test menu functionality across different pages', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const pages = ['/services', '/packages', '/about', '/faq', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(`http://localhost:3000${pagePath}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      console.log(`📄 Testing mobile menu on ${pagePath}`);
      
      // Check if mobile menu toggle is visible
      const mobileMenuToggle = page.locator('.mobile-menu-toggle');
      await expect(mobileMenuToggle).toBeVisible();
      
      // Test opening menu
      await mobileMenuToggle.click();
      await page.waitForTimeout(300);
      
      const mobileMenu = page.locator('.mobile-menu');
      await expect(mobileMenu).toBeVisible();
      
      // Close menu
      await mobileMenuToggle.click();
      await page.waitForTimeout(300);
      
      await expect(mobileMenu).not.toBeVisible();
    }
    
    console.log('✅ Mobile menu works correctly across all pages');
  });
});
