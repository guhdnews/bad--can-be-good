import { test, expect, Page } from '@playwright/test';

// Visual regression analysis and fixes using Playwright
test.describe('Visual Regression Analysis & Fixes', () => {
  
  test.beforeEach(async ({ page }) => {
    // Wait for all animations and transitions to complete
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `
    });
  });

  // Contact Page - Highest failure rate (38.58%, 34.03%, 26.91%, 7.34%)
  test('Contact Page Layout Stability Analysis', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Analyze contact form dimensions and layout
    const contactForm = page.locator('.contact-form, form').first();
    const formBounds = await contactForm.boundingBox();
    
    console.log('Contact Form Dimensions:', formBounds);

    // Check for layout shift causes
    const inputs = page.locator('input, textarea, select');
    for (let i = 0; i < await inputs.count(); i++) {
      const input = inputs.nth(i);
      const bounds = await input.boundingBox();
      const computedStyle = await input.evaluate(el => {
        const style = getComputedStyle(el);
        return {
          height: style.height,
          minHeight: style.minHeight,
          maxHeight: style.maxHeight,
          padding: style.padding,
          margin: style.margin,
          border: style.border
        };
      });
      console.log(`Input ${i} dimensions:`, bounds, computedStyle);
    }

    // Test form interaction stability
    await page.locator('input[type="text"]').first().fill('Test Name');
    await page.waitForTimeout(100);
    
    // Screenshot for comparison
    await page.screenshot({ 
      path: 'test-results/contact-page-analysis.png',
      fullPage: true 
    });
  });

  // Package Cards - High failure on desktop (18.37%)
  test('Package Cards Layout Analysis', async ({ page }) => {
    await page.goto('/packages');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Test at desktop resolution specifically
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(1000);

    const packageCards = page.locator('.package-card, .card').first();
    const cardBounds = await packageCards.boundingBox();
    
    console.log('Package Card Dimensions:', cardBounds);

    // Check card grid layout
    const allCards = page.locator('.package-card, .card');
    const cardCount = await allCards.count();
    
    for (let i = 0; i < cardCount; i++) {
      const card = allCards.nth(i);
      const bounds = await card.boundingBox();
      const styles = await card.evaluate(el => {
        const style = getComputedStyle(el);
        return {
          display: style.display,
          flexGrow: style.flexGrow,
          gridColumn: style.gridColumn,
          height: style.height,
          minHeight: style.minHeight
        };
      });
      console.log(`Card ${i}:`, bounds, styles);
    }

    await page.screenshot({ 
      path: 'test-results/package-cards-analysis.png',
      fullPage: true 
    });
  });

  // CTA Section - Multiple viewport failures (12.64%, 6.60%, 4.49%, 3.21%)
  test('CTA Section Analysis', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Test across different viewports
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1440, height: 900, name: 'desktop' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(1000);

      const ctaSection = page.locator('.cta-section, [class*="cta"]').first();
      
      if (await ctaSection.count() > 0) {
        const bounds = await ctaSection.boundingBox();
        const styles = await ctaSection.evaluate(el => {
          const style = getComputedStyle(el);
          return {
            background: style.background,
            backgroundImage: style.backgroundImage,
            padding: style.padding,
            height: style.height
          };
        });
        
        console.log(`CTA Section ${viewport.name}:`, bounds, styles);
        
        await page.screenshot({ 
          path: `test-results/cta-section-${viewport.name}.png`,
          fullPage: true 
        });
      }
    }
  });

  // Homepage Full - Multiple minor failures requiring investigation
  test('Homepage Layout Shifts Analysis', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Monitor for layout shifts
    await page.addInitScript(() => {
      let cumulativeLayoutShift = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            cumulativeLayoutShift += entry.value;
          }
        }
        (window as any).cumulativeLayoutShift = cumulativeLayoutShift;
      }).observe({ type: 'layout-shift', buffered: true });
    });

    await page.waitForTimeout(3000);

    const cls = await page.evaluate(() => (window as any).cumulativeLayoutShift || 0);
    console.log('Cumulative Layout Shift:', cls);

    // Test hero section stability
    const heroSection = page.locator('.hero-section, [class*="hero"]').first();
    if (await heroSection.count() > 0) {
      const bounds = await heroSection.boundingBox();
      console.log('Hero Section Dimensions:', bounds);
    }

    await page.screenshot({ 
      path: 'test-results/homepage-layout-analysis.png',
      fullPage: true 
    });
  });

  // Icons Test - Reference images missing
  test('Icons Rendering Analysis', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Check for icon elements
    const iconSelectors = [
      '[class*="icon-"]',
      'i[class*="fa-"]',
      'svg'
    ];

    for (const selector of iconSelectors) {
      const elements = page.locator(selector);
      const count = await elements.count();
      console.log(`${selector} count:`, count);
      
      if (count > 0) {
        for (let i = 0; i < Math.min(5, count); i++) {
          const element = elements.nth(i);
          const isVisible = await element.isVisible();
          const bounds = await element.boundingBox();
          console.log(`${selector}[${i}] visible: ${isVisible}, bounds:`, bounds);
        }
      }
    }
  });

  // Performance and loading analysis
  test('Page Load Performance Analysis', async ({ page }) => {
    // Monitor performance metrics
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        loadComplete: navigation.loadEventEnd - navigation.navigationStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
      };
    });
    
    console.log('Performance Metrics:', metrics);
    
    // Check if marker.io or other third-party scripts are still loading
    const scriptSources = await page.evaluate(() => {
      return Array.from(document.scripts).map(script => script.src).filter(src => src);
    });
    
    console.log('Loaded Scripts:', scriptSources);
    
    // Check for marker.io specific elements or globals
    const markerElements = await page.evaluate(() => {
      return {
        markerExists: typeof (window as any).Marker !== 'undefined',
        markerScripts: Array.from(document.scripts).some(script => 
          script.src.includes('marker.io') || script.textContent?.includes('marker')
        ),
        markerElements: document.querySelectorAll('[class*="marker"], [id*="marker"]').length
      };
    });
    
    console.log('Marker.io Detection:', markerElements);
  });
});