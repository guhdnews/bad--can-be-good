import { test, expect } from '@playwright/test';

test.describe('ByHook.com Design Analysis', () => {
  test('analyze byhook.com design patterns and architecture', async ({ page }) => {
    console.log('🔍 Analyzing byhook.com design patterns...');
    
    await page.goto('https://byhook.com');
    await page.waitForLoadState('networkidle');
    
    console.log('📄 Page loaded successfully');
    
    // Analyze fonts and typography
    const bodyFont = await page.evaluate(() => {
      return window.getComputedStyle(document.body).fontFamily;
    });
    console.log(`🔤 Body font: ${bodyFont}`);
    
    // Analyze heading fonts
    const headings = await page.$$('h1, h2, h3, h4, h5, h6');
    if (headings.length > 0) {
      const headingFont = await headings[0].evaluate(el => {
        return window.getComputedStyle(el).fontFamily;
      });
      console.log(`📝 Heading font: ${headingFont}`);
    }
    
    // Analyze color scheme
    const backgroundColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    console.log(`🎨 Body background: ${backgroundColor}`);
    
    // Analyze animation and smooth scrolling
    const animatedElements = await page.$$('[style*="transform"], [style*="transition"], [class*="animate"]');
    console.log(`✨ Animated elements found: ${animatedElements.length}`);
    
    // Check for smooth scroll behavior
    const smoothScroll = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement).scrollBehavior;
    });
    console.log(`📜 Scroll behavior: ${smoothScroll}`);
    
    // Analyze CSS Grid/Flexbox usage
    const gridElements = await page.$$('[style*="grid"], [class*="grid"]');
    const flexElements = await page.$$('[style*="flex"], [class*="flex"]');
    console.log(`📐 Grid elements: ${gridElements.length}, Flex elements: ${flexElements.length}`);
    
    // Check for custom CSS properties/variables
    const cssVariables = await page.evaluate(() => {
      const styles = Array.from(document.styleSheets);
      let variables = [];
      try {
        styles.forEach(sheet => {
          Array.from(sheet.cssRules || []).forEach(rule => {
            if (rule.style) {
              for (let i = 0; i < rule.style.length; i++) {
                const prop = rule.style[i];
                if (prop.startsWith('--')) {
                  variables.push(prop);
                }
              }
            }
          });
        });
      } catch (e) {
        // CORS or access issues
      }
      return [...new Set(variables)];
    });
    console.log(`🎛️ CSS Custom Properties found: ${cssVariables.length}`);
    if (cssVariables.length > 0) {
      console.log(`   Variables: ${cssVariables.slice(0, 10).join(', ')}${cssVariables.length > 10 ? '...' : ''}`);
    }
    
    // Analyze layout structure
    const headerExists = await page.locator('header').isVisible();
    const navExists = await page.locator('nav').isVisible();
    const footerExists = await page.locator('footer').isVisible();
    console.log(`🏗️ Layout structure - Header: ${headerExists}, Nav: ${navExists}, Footer: ${footerExists}`);
    
    // Check for modern CSS features
    const hasClamp = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      for (let el of elements) {
        const styles = window.getComputedStyle(el);
        for (let prop in styles) {
          if (styles[prop] && styles[prop].includes && styles[prop].includes('clamp(')) {
            return true;
          }
        }
      }
      return false;
    });
    console.log(`📏 Uses clamp() function: ${hasClamp}`);
    
    // Performance metrics
    const performanceMetrics = await page.evaluate(() => ({
      loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
      domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
      firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0
    }));
    console.log(`⚡ Performance metrics:`, performanceMetrics);
    
    // Take screenshot for visual reference
    await page.screenshot({ 
      path: 'test-results/byhook-analysis.png',
      fullPage: true 
    });
    console.log('📸 Screenshot saved for design reference');
    
    // Scroll and check for scroll-triggered animations
    await page.evaluate(() => window.scrollTo(0, window.innerHeight));
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
    await page.waitForTimeout(1000);
    
    console.log('🎉 ByHook.com analysis complete!');
  });
});