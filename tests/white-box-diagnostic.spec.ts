import { test, expect } from '@playwright/test';

test.describe('White Box and Mobile Menu Diagnostic', () => {
  test('diagnose white box between header and hero + mobile menu alignment', async ({ page }) => {
    // Test on homepage first
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    console.log('🔍 DIAGNOSING WHITE BOX AND MENU ISSUES...\n');
    
    // 1. Check header-hero spacing issue
    const header = await page.locator('header').first();
    const hero = await page.locator('[class*="hero"]').first();
    
    const headerBox = await header.boundingBox();
    const heroBox = await hero.boundingBox();
    
    console.log('📏 HEADER-HERO SPACING ANALYSIS:');
    console.log(`Header bottom: ${headerBox?.y + headerBox?.height}`);
    console.log(`Hero top: ${heroBox?.y}`);
    console.log(`Gap between header and hero: ${heroBox?.y - (headerBox?.y + headerBox?.height)}px`);
    
    // Check if there's unwanted spacing/margin
    const headerStyles = await header.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        marginBottom: computed.marginBottom,
        paddingBottom: computed.paddingBottom,
        position: computed.position,
        top: computed.top,
        height: computed.height,
        background: computed.background
      };
    });
    
    const heroStyles = await hero.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        marginTop: computed.marginTop,
        paddingTop: computed.paddingTop,
        position: computed.position,
        top: computed.top,
        background: computed.background
      };
    });
    
    console.log('Header styles:', headerStyles);
    console.log('Hero styles:', heroStyles);
    
    // 2. Check for white elements between header and hero
    const elementsInGap = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      return elements
        .filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.y >= 160 && rect.y <= 200; // Approximate gap area
        })
        .map(el => ({
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          rect: el.getBoundingClientRect(),
          styles: {
            background: window.getComputedStyle(el).background,
            display: window.getComputedStyle(el).display,
            position: window.getComputedStyle(el).position
          }
        }));
    });
    
    console.log('\\n🎯 ELEMENTS IN HEADER-HERO GAP:', elementsInGap);
    
    // 3. Test mobile menu button alignment
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile viewport
    await page.waitForTimeout(1000);
    
    const mobileMenuButton = await page.locator('[class*="mobile-menu"], button[aria-label*="menu"], [data-testid="mobile-menu"]').first();
    
    if (await mobileMenuButton.isVisible()) {
      const buttonBox = await mobileMenuButton.boundingBox();
      const buttonStyles = await mobileMenuButton.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          display: computed.display,
          justifyContent: computed.justifyContent,
          alignItems: computed.alignItems,
          padding: computed.padding,
          width: computed.width,
          height: computed.height,
          textAlign: computed.textAlign
        };
      });
      
      // Check the icon/lines inside the button
      const menuIcon = await mobileMenuButton.locator('svg, [class*="line"], [class*="bar"]').first();
      let iconBox = null;
      let iconStyles = null;
      
      if (await menuIcon.isVisible()) {
        iconBox = await menuIcon.boundingBox();
        iconStyles = await menuIcon.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            position: computed.position,
            margin: computed.margin,
            transform: computed.transform,
            width: computed.width,
            height: computed.height
          };
        });
      }
      
      console.log('\\n📱 MOBILE MENU BUTTON ANALYSIS:');
      console.log('Button box:', buttonBox);
      console.log('Button styles:', buttonStyles);
      console.log('Icon box:', iconBox);
      console.log('Icon styles:', iconStyles);
      
      // Check if icon is centered within button
      if (buttonBox && iconBox) {
        const buttonCenterX = buttonBox.x + buttonBox.width / 2;
        const buttonCenterY = buttonBox.y + buttonBox.height / 2;
        const iconCenterX = iconBox.x + iconBox.width / 2;
        const iconCenterY = iconBox.y + iconBox.height / 2;
        
        const offsetX = Math.abs(buttonCenterX - iconCenterX);
        const offsetY = Math.abs(buttonCenterY - iconCenterY);
        
        console.log(`Icon centering offset - X: ${offsetX.toFixed(1)}px, Y: ${offsetY.toFixed(1)}px`);
        console.log(`Icon properly centered: ${offsetX < 2 && offsetY < 2 ? '✅' : '❌'}`);
      }
    } else {
      console.log('❌ Mobile menu button not found');
    }
    
    // 4. Test CTA to footer spacing on different pages
    console.log('\\n🔍 TESTING CTA-FOOTER SPACING ON MULTIPLE PAGES...');
    
    const pages = ['/', '/about', '/services', '/packages', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(`http://localhost:3000${pagePath}`);
      await page.waitForLoadState('networkidle');
      
      const ctaSection = await page.locator('[class*="cta"], [class*="CTA"]').last();
      const footer = await page.locator('footer').first();
      
      if (await ctaSection.isVisible() && await footer.isVisible()) {
        const ctaBox = await ctaSection.boundingBox();
        const footerBox = await footer.boundingBox();
        
        const gap = footerBox?.y - (ctaBox?.y + ctaBox?.height);
        
        console.log(`${pagePath}: CTA-Footer gap: ${gap}px`);
        
        if (gap && gap > 5) {
          console.log(`❌ White line detected on ${pagePath} (${gap}px gap)`);
          
          // Check what's in the gap
          const elementsInFooterGap = await page.evaluate((ctaBottom, footerTop) => {
            const elements = Array.from(document.querySelectorAll('*'));
            return elements
              .filter(el => {
                const rect = el.getBoundingClientRect();
                return rect.y >= ctaBottom && rect.y <= footerTop;
              })
              .map(el => ({
                tagName: el.tagName,
                className: el.className,
                styles: {
                  background: window.getComputedStyle(el).background,
                  height: window.getComputedStyle(el).height,
                  margin: window.getComputedStyle(el).margin,
                  padding: window.getComputedStyle(el).padding
                }
              }));
          }, ctaBox.y + ctaBox.height, footerBox.y);
          
          console.log(`Elements in CTA-Footer gap on ${pagePath}:`, elementsInFooterGap);
        }
      }
    }
    
    console.log('\\n✅ DIAGNOSTIC COMPLETE');
  });
});