import { test, expect } from '@playwright/test';

test.describe('CSS Analysis - Padding and Visual Issues', () => {
  test('analyze all pages for CSS issues', async ({ page }) => {
    console.log('🔍 ANALYZING CSS ISSUES ACROSS ALL PAGES...\n');
    
    const pages = [
      { name: 'Homepage', url: 'http://localhost:3000' },
      { name: 'Services', url: 'http://localhost:3000/services' },
      { name: 'Packages', url: 'http://localhost:3000/packages' },
      { name: 'About', url: 'http://localhost:3000/about' },
      { name: 'Contact', url: 'http://localhost:3000/contact' },
      { name: 'FAQ', url: 'http://localhost:3000/faq' }
    ];

    for (const pageInfo of pages) {
      console.log(`📄 Analyzing ${pageInfo.name} page:`);
      
      await page.goto(pageInfo.url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      // Take full page screenshot
      await page.screenshot({ 
        path: `test-results/css-analysis-${pageInfo.name.toLowerCase()}.png`,
        fullPage: true 
      });

      // Analyze hero section
      const heroSection = page.locator('.hero-section, section').first();
      if (await heroSection.isVisible()) {
        const heroBox = await heroSection.boundingBox();
        if (heroBox) {
          console.log(`  🎭 Hero section: ${heroBox.width}x${heroBox.height} at ${heroBox.y}`);
          
          // Check hero padding
          const heroPadding = await heroSection.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              paddingTop: styles.paddingTop,
              paddingBottom: styles.paddingBottom,
              paddingLeft: styles.paddingLeft,
              paddingRight: styles.paddingRight
            };
          });
          console.log(`  📏 Hero padding:`, heroPadding);
        }
      } else {
        console.log(`  ❌ No hero section found on ${pageInfo.name}`);
      }

      // Analyze buttons
      const buttons = page.locator('.btn, button[class*="btn"]');
      const buttonCount = await buttons.count();
      console.log(`  🔘 Found ${buttonCount} buttons`);
      
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        if (await button.isVisible()) {
          const buttonText = await button.textContent();
          const buttonStyles = await button.evaluate(el => {
            const styles = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
              text: el.textContent?.trim(),
              visible: rect.width > 0 && rect.height > 0,
              padding: `${styles.paddingTop} ${styles.paddingRight} ${styles.paddingBottom} ${styles.paddingLeft}`,
              backgroundColor: styles.backgroundColor,
              color: styles.color,
              border: styles.border,
              width: rect.width,
              height: rect.height
            };
          });
          console.log(`  🔘 Button "${buttonText?.trim()}":`, buttonStyles);
        }
      }

      // Check for contrast issues in CTA sections
      const ctaSections = page.locator('.cta-section, [class*="cta"]');
      const ctaCount = await ctaSections.count();
      if (ctaCount > 0) {
        console.log(`  🎯 Found ${ctaCount} CTA sections`);
        for (let i = 0; i < ctaCount; i++) {
          const cta = ctaSections.nth(i);
          const ctaStyles = await cta.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              backgroundColor: styles.backgroundColor,
              color: styles.color,
              padding: `${styles.paddingTop} ${styles.paddingRight} ${styles.paddingBottom} ${styles.paddingLeft}`
            };
          });
          console.log(`  🎯 CTA ${i + 1} styles:`, ctaStyles);
        }
      }

      // Check specific homepage issues
      if (pageInfo.name === 'Homepage') {
        // Check for view services button
        const viewServicesBtn = page.locator('text="View Services", a[href="/services"]').first();
        if (await viewServicesBtn.isVisible()) {
          const btnBox = await viewServicesBtn.boundingBox();
          console.log(`  👀 View Services button visible: ${btnBox?.width}x${btnBox?.height}`);
        } else {
          console.log(`  ❌ View Services button not visible or not found`);
        }

        // Check hero boxes for outlines
        const heroBoxes = page.locator('.hero-section .card, .hero-section [class*="box"]');
        const heroBoxCount = await heroBoxes.count();
        console.log(`  📦 Hero boxes found: ${heroBoxCount}`);
        for (let i = 0; i < heroBoxCount; i++) {
          const box = heroBoxes.nth(i);
          const boxStyles = await box.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              border: styles.border,
              outline: styles.outline,
              boxShadow: styles.boxShadow
            };
          });
          console.log(`  📦 Hero box ${i + 1} outline:`, boxStyles);
        }
      }

      console.log(''); // Empty line for readability
    }

    console.log('✅ CSS analysis complete. Check screenshots in test-results/');
  });
});