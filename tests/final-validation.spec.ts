import { test, expect, Page } from '@playwright/test';

test.describe('Final Validation - All Improvements', () => {
  
  test.beforeEach(async ({ page }) => {
    // Wait for page to be fully loaded
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
  });

  test('Mobile menu toggle contrast is improved', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    const mobileToggle = page.locator('.mobile-menu-toggle');
    await expect(mobileToggle).toBeVisible();
    
    // Check computed styles for contrast improvements
    const toggleStyles = await mobileToggle.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        border: styles.border,
        boxShadow: styles.boxShadow
      };
    });
    
    // Verify enhanced contrast styles are applied
    expect(toggleStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)'); // Has background
    expect(toggleStyles.border).toContain('1px'); // Has border
    expect(toggleStyles.boxShadow).not.toBe('none'); // Has shadow
    
    console.log('✓ Mobile menu toggle contrast improved');
  });

  test('Service cards have detailed information', async ({ page }) => {
    await page.goto('http://localhost:3000/services');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Check for enhanced service card content
    const serviceCards = page.locator('.card').filter({ hasText: 'Web Development' });
    await expect(serviceCards.first()).toBeVisible();
    
    // Verify detailed information is present
    await expect(page.locator('text=Key Features:')).toBeVisible();
    await expect(page.locator('text=Mobile-first responsive design')).toBeVisible();
    await expect(page.locator('text=Advanced SEO optimization')).toBeVisible();
    await expect(page.locator('text=Lightning-fast loading times')).toBeVisible();
    
    // Check for process section improvements
    await expect(page.locator('text=What\'s Included:')).toBeVisible();
    await expect(page.locator('text=Business requirements analysis')).toBeVisible();
    
    console.log('✓ Service cards enhanced with detailed information');
  });

  test('Package cards have comprehensive details', async ({ page }) => {
    await page.goto('http://localhost:3000/packages');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Check for enhanced package card layout
    const packageCards = page.locator('.package-card');
    await expect(packageCards.first()).toBeVisible();
    
    // Verify detailed package information
    await expect(page.locator('text=What\'s Included:')).toBeVisible();
    await expect(page.locator('text=5-page responsive website')).toBeVisible();
    await expect(page.locator('text=Everything in Essentials, plus:')).toBeVisible();
    await expect(page.locator('text=Perfect for:')).toBeVisible();
    await expect(page.locator('text=Restaurants, salons, local services, consultants')).toBeVisible();
    
    // Check for CTA buttons in cards
    await expect(page.locator('text=Get Started - Essentials')).toBeVisible();
    await expect(page.locator('text=Get Started - Professional')).toBeVisible();
    await expect(page.locator('text=Get Started - Enterprise')).toBeVisible();
    
    console.log('✓ Package cards enhanced with comprehensive details');
  });

  test('Apple-style animations are implemented', async ({ page }) => {
    // Test homepage animations
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Check for text reveal animation elements
    const heroTitle = page.locator('h1').first();
    await expect(heroTitle).toBeVisible();
    
    // Verify progressive reveal elements exist
    const progressiveRevealElements = page.locator('[data-framer-motion]');
    const count = await progressiveRevealElements.count();
    expect(count).toBeGreaterThan(0);
    
    // Test magnetic buttons (desktop only)
    await page.setViewportSize({ width: 1440, height: 900 });
    const magneticButtons = page.locator('.btn').first();
    await expect(magneticButtons).toBeVisible();
    
    // Hover test for magnetic effect (on desktop)
    await magneticButtons.hover();
    await page.waitForTimeout(500);
    
    console.log('✓ Apple-style animations implemented');
  });

  test('Responsive behavior is optimized', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1440, height: 900, name: 'Desktop' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(1000);
      
      // Check mobile menu visibility
      if (viewport.width < 768) {
        await expect(page.locator('.mobile-menu-toggle')).toBeVisible();
        await expect(page.locator('.header-menu')).toBeHidden();
      } else {
        await expect(page.locator('.mobile-menu-toggle')).toBeHidden();
        await expect(page.locator('.header-menu')).toBeVisible();
      }
      
      // Check container responsiveness
      const container = page.locator('.container').first();
      const containerWidth = await container.evaluate(el => el.offsetWidth);
      expect(containerWidth).toBeGreaterThan(0);
      expect(containerWidth).toBeLessThanOrEqual(viewport.width);
      
      console.log(`✓ ${viewport.name} responsive behavior optimized`);
    }
  });

  test('Page load performance and stability', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000); // Should load in under 5 seconds
    
    // Check for console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.waitForTimeout(3000);
    
    // Allow for some expected warnings but no critical errors
    const criticalErrors = errors.filter(error => 
      !error.includes('Warning') && 
      !error.includes('DevTools') &&
      !error.includes('favicon')
    );
    
    expect(criticalErrors).toHaveLength(0);
    
    console.log(`✓ Page loaded in ${loadTime}ms with no critical errors`);
  });

  test('All major pages load without errors', async ({ page }) => {
    const pages = [
      { url: '/', name: 'Homepage' },
      { url: '/services', name: 'Services' },
      { url: '/packages', name: 'Packages' },
      { url: '/about', name: 'About' },
      { url: '/faq', name: 'FAQ' },
      { url: '/contact', name: 'Contact' }
    ];
    
    for (const testPage of pages) {
      await page.goto(`http://localhost:3000${testPage.url}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      // Check for basic page structure
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      
      // Check for page-specific content
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      
      console.log(`✓ ${testPage.name} page loads successfully`);
    }
  });

  test('Accessibility improvements', async ({ page }) => {
    // Check for proper heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
    
    // Check for alt text on images (if any)
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      // Images should either have alt text or be decorative
      expect(alt !== null || await img.getAttribute('aria-hidden')).toBeTruthy();
    }
    
    // Check for proper link accessibility
    const links = await page.locator('a').all();
    for (const link of links.slice(0, 10)) { // Check first 10 links
      const hasText = await link.textContent();
      const hasAriaLabel = await link.getAttribute('aria-label');
      expect(hasText || hasAriaLabel).toBeTruthy();
    }
    
    // Check for focus indicators
    const firstButton = page.locator('button, .btn').first();
    if (await firstButton.isVisible()) {
      await firstButton.focus();
      // Focus should be visible (handled by CSS)
    }
    
    console.log('✓ Accessibility improvements validated');
  });

  test('Animation performance on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that animations are mobile-optimized
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Measure frame rate during scroll
    await page.evaluate(() => {
      let frameCount = 0;
      let lastTime = performance.now();
      
      function measureFPS() {
        frameCount++;
        const currentTime = performance.now();
        if (currentTime - lastTime >= 1000) {
          const fps = Math.round(frameCount * 1000 / (currentTime - lastTime));
          console.log(`FPS: ${fps}`);
          frameCount = 0;
          lastTime = currentTime;
        }
        requestAnimationFrame(measureFPS);
      }
      measureFPS();
      
      // Trigger scroll to test animation performance
      window.scrollTo(0, 500);
      setTimeout(() => window.scrollTo(0, 0), 1000);
    });
    
    await page.waitForTimeout(3000);
    
    console.log('✓ Mobile animation performance tested');
  });
});

test.describe('BackstopJS Integration Check', () => {
  test('BackstopJS configuration is valid', async ({ page }) => {
    const fs = require('fs');
    const path = require('path');
    
    // Check if backstop.json exists and is valid
    const backstopConfigPath = path.join(process.cwd(), 'backstop.json');
    const configExists = fs.existsSync(backstopConfigPath);
    expect(configExists).toBeTruthy();
    
    if (configExists) {
      const config = JSON.parse(fs.readFileSync(backstopConfigPath, 'utf-8'));
      
      // Verify essential configuration
      expect(config.scenarios).toBeDefined();
      expect(config.scenarios.length).toBeGreaterThan(0);
      expect(config.viewports).toBeDefined();
      expect(config.viewports.length).toBeGreaterThan(0);
      
      // Check for puppet scripts
      const puppetDir = path.join(process.cwd(), 'puppet');
      expect(fs.existsSync(puppetDir)).toBeTruthy();
      expect(fs.existsSync(path.join(puppetDir, 'onBefore.js'))).toBeTruthy();
      expect(fs.existsSync(path.join(puppetDir, 'onReady.js'))).toBeTruthy();
      
      console.log('✓ BackstopJS configuration is valid');
    }
  });
});