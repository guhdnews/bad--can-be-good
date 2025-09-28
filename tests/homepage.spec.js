// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Homepage Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if page loads without errors
    await expect(page).toHaveTitle(/News Can Be Good/);
    
    // Check for main elements
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('navigation menu works on desktop', async ({ page }) => {
    await page.goto('/');
    
    // Test if navigation is visible
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('mobile navigation works', async ({ page, isMobile }) => {
    if (!isMobile) return;
    
    await page.goto('/');
    
    // Look for mobile menu button or hamburger menu
    const mobileMenu = page.locator('[data-testid="mobile-menu-button"], .mobile-menu-button, button[aria-label*="menu" i]');
    
    if (await mobileMenu.count() > 0) {
      await expect(mobileMenu.first()).toBeVisible();
    }
  });

  test('hero section is present', async ({ page }) => {
    await page.goto('/');
    
    // Check for hero section
    const hero = page.locator('.hero-section, [data-testid="hero"], .hero, section:first-of-type');
    await expect(hero.first()).toBeVisible();
  });

  test('articles load and display', async ({ page }) => {
    await page.goto('/');
    
    // Wait for articles to load
    await page.waitForTimeout(2000);
    
    // Check if articles are present
    const articles = page.locator('article, .article, .article-card, [data-testid="article"]');
    const articleCount = await articles.count();
    
    // Should have at least one article
    expect(articleCount).toBeGreaterThan(0);
  });

  test('no console errors on load', async ({ page }) => {
    const errors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    await page.goto('/');
    await page.waitForTimeout(3000);
    
    // Check that there are no critical errors
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('analytics') &&
      !error.includes('gtag')
    );
    
    expect(criticalErrors.length).toBe(0);
  });
});