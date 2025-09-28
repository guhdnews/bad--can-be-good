import { test, expect } from '@playwright/test';

test.describe('CSS Issues Analysis', () => {
  test('analyze all pages for specific CSS issues', async ({ page }) => {
    console.log('🔍 ANALYZING SPECIFIC CSS ISSUES...\n');
    
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
        path: `test-results/css-issues-${pageInfo.name.toLowerCase()}.png`,
        fullPage: true 
      });

      // 1. Check header menu background and positioning
      const header = page.locator('header, .site-header, .header-nav').first();
      if (await header.isVisible()) {
        const headerStyles = await header.evaluate(el => {
          const styles = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return {
            backgroundColor: styles.backgroundColor,
            color: styles.color,
            position: styles.position,
            height: rect.height,
            top: rect.top
          };
        });
        console.log(`  📋 Header styles:`, headerStyles);
      }

      // 2. Check hero section padding (especially contact page)
      const heroSection = page.locator('.hero-section, section').first();
      if (await heroSection.isVisible()) {
        const heroStyles = await heroSection.evaluate(el => {
          const styles = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return {
            paddingTop: styles.paddingTop,
            paddingBottom: styles.paddingBottom,
            marginTop: styles.marginTop,
            top: rect.top,
            height: rect.height
          };
        });
        console.log(`  🎭 Hero section padding:`, heroStyles);
      }

      // 3. Check icons consistency
      const icons = page.locator('svg, [class*="icon"]');
      const iconCount = await icons.count();
      console.log(`  🎨 Found ${iconCount} icons`);
      
      for (let i = 0; i < Math.min(iconCount, 5); i++) {
        const icon = icons.nth(i);
        if (await icon.isVisible()) {
          const iconStyles = await icon.evaluate(el => {
            const rect = el.getBoundingClientRect();
            const styles = window.getComputedStyle(el);
            return {
              width: rect.width,
              height: rect.height,
              color: styles.color,
              className: el.className
            };
          });
          console.log(`  🎨 Icon ${i + 1}:`, iconStyles);
        }
      }

      // 4. Check buttons in hero sections
      const heroButtons = page.locator('.hero-section .btn, section .btn').first();
      if (await heroButtons.isVisible()) {
        const buttonStyles = await heroButtons.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            border: styles.border,
            outline: styles.outline,
            backgroundColor: styles.backgroundColor,
            color: styles.color,
            padding: `${styles.paddingTop} ${styles.paddingRight}`
          };
        });
        console.log(`  🔘 Hero button styles:`, buttonStyles);
      }

      // 5. Check CTA sections
      const ctaSections = page.locator('.cta-section, [class*="cta"]');
      const ctaCount = await ctaSections.count();
      console.log(`  🎯 Found ${ctaCount} CTA sections`);
      
      for (let i = 0; i < ctaCount; i++) {
        const cta = ctaSections.nth(i);
        const ctaStyles = await cta.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            backgroundColor: styles.backgroundColor,
            color: styles.color,
            padding: `${styles.paddingTop} ${styles.paddingBottom}`
          };
        });
        console.log(`  🎯 CTA ${i + 1} styles:`, ctaStyles);
        
        // Check CTA buttons
        const ctaButtons = cta.locator('.btn');
        const ctaButtonCount = await ctaButtons.count();
        if (ctaButtonCount > 0) {
          const ctaButtonStyles = await ctaButtons.first().evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              backgroundColor: styles.backgroundColor,
              color: styles.color,
              border: styles.border,
              outline: styles.outline
            };
          });
          console.log(`  🎯 CTA button styles:`, ctaButtonStyles);
        }
      }

      // 6. Check package cards (if on packages page)
      if (pageInfo.name === 'Packages') {
        const packageCards = page.locator('.card');
        const cardCount = await packageCards.count();
        console.log(`  📦 Found ${cardCount} package cards`);
        
        if (cardCount > 0) {
          const cardStyles = await packageCards.first().evaluate(el => {
            const styles = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
              width: rect.width,
              height: rect.height,
              padding: `${styles.paddingTop} ${styles.paddingRight}`,
              marginBottom: styles.marginBottom
            };
          });
          console.log(`  📦 Package card size:`, cardStyles);
        }
      }

      // 7. Check footer (if visible)
      const footer = page.locator('footer');
      if (await footer.isVisible()) {
        const footerText = page.locator('footer p, footer .text-center p').first();
        if (await footerText.isVisible()) {
          const footerStyles = await footerText.evaluate(el => {
            const rect = el.getBoundingClientRect();
            return {
              width: rect.width,
              textContent: el.textContent,
              whiteSpace: window.getComputedStyle(el).whiteSpace,
              maxWidth: window.getComputedStyle(el).maxWidth
            };
          });
          console.log(`  🦶 Footer text:`, footerStyles);
        }
      }

      console.log(''); // Empty line for readability
    }

    console.log('✅ CSS issues analysis complete. Check screenshots in test-results/');
  });
});