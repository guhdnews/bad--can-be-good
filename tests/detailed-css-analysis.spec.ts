import { test, expect } from '@playwright/test';

test('Detailed CSS analysis for specific issues', async ({ page }) => {
  console.log('🔍 DETAILED CSS ISSUES ANALYSIS...\n');
  
  // 1. Contact page hero padding issue
  console.log('📧 Analyzing Contact page hero padding:');
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  const contactHero = page.locator('section').first();
  if (await contactHero.isVisible()) {
    const heroInfo = await contactHero.evaluate(el => {
      const rect = el.getBoundingClientRect();
      const styles = window.getComputedStyle(el);
      return {
        top: rect.top,
        paddingTop: styles.paddingTop,
        marginTop: styles.marginTop,
        className: el.className
      };
    });
    console.log('  Contact hero position and padding:', heroInfo);
  }
  
  // 2. Check services page "Get Started Today" button
  console.log('\n🛠️  Analyzing Services page button:');
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  const servicesHeroBtn = page.locator('text="Get Started Today"');
  if (await servicesHeroBtn.isVisible()) {
    const btnInfo = await servicesHeroBtn.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        border: styles.border,
        outline: styles.outline,
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        className: el.className
      };
    });
    console.log('  Services button styles:', btnInfo);
  }
  
  // 3. Check package cards
  console.log('\n📦 Analyzing Packages page cards:');
  await page.goto('http://localhost:3000/packages', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  const allDivs = page.locator('div');
  const divCount = await allDivs.count();
  console.log(`  Found ${divCount} div elements`);
  
  // Look for cards containing package information
  const packageElements = page.locator('h2:has-text("Essentials"), h2:has-text("Professional"), h2:has-text("Enterprise")');
  const packageCount = await packageElements.count();
  console.log(`  Found ${packageCount} packages`);
  
  if (packageCount > 0) {
    const firstPackage = packageElements.first();
    const packageCard = firstPackage.locator('xpath=ancestor::div[contains(@class, "card") or contains(@class, "grid") or position() <= 3]').first();
    
    if (await packageCard.isVisible()) {
      const cardInfo = await packageCard.evaluate(el => {
        const rect = el.getBoundingClientRect();
        const styles = window.getComputedStyle(el);
        return {
          width: rect.width,
          height: rect.height,
          padding: styles.padding,
          className: el.className
        };
      });
      console.log('  Package card dimensions:', cardInfo);
    }
  }
  
  // 4. Check CTA sections across pages
  console.log('\n🎯 Analyzing CTA sections:');
  
  const pagesToCheck = [
    { name: 'Homepage', url: 'http://localhost:3000', ctaText: 'Ready to get started' },
    { name: 'Services', url: 'http://localhost:3000/services', ctaText: 'Ready to Start Your Project' },
    { name: 'About', url: 'http://localhost:3000/about', ctaText: 'Ready to work together' },
    { name: 'FAQ', url: 'http://localhost:3000/faq', ctaText: 'Still have questions' }
  ];
  
  for (const pageCheck of pagesToCheck) {
    await page.goto(pageCheck.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    const ctaElement = page.locator(`h2:has-text("${pageCheck.ctaText}")`).first();
    if (await ctaElement.isVisible()) {
      const ctaSection = ctaElement.locator('xpath=ancestor::section[1]').first();
      if (await ctaSection.isVisible()) {
        const ctaInfo = await ctaSection.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            backgroundColor: styles.backgroundColor,
            color: styles.color,
            className: el.className
          };
        });
        console.log(`  ${pageCheck.name} CTA section:`, ctaInfo);
      }
    }
  }
  
  // 5. Check footer text width
  console.log('\n🦶 Analyzing Footer:');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  const footerText = page.locator('footer p, footer div p').first();
  if (await footerText.isVisible()) {
    const footerInfo = await footerText.evaluate(el => {
      const rect = el.getBoundingClientRect();
      const styles = window.getComputedStyle(el);
      return {
        textContent: el.textContent?.substring(0, 100),
        width: rect.width,
        maxWidth: styles.maxWidth,
        whiteSpace: styles.whiteSpace
      };
    });
    console.log('  Footer text info:', footerInfo);
  }
  
  // 6. Check icons across pages
  console.log('\n🎨 Analyzing Icons:');
  const iconPages = ['http://localhost:3000', 'http://localhost:3000/packages', 'http://localhost:3000/services'];
  
  for (const iconUrl of iconPages) {
    await page.goto(iconUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    // Look for Lucide React icons
    const lucideIcons = page.locator('svg[class*="lucide"], svg');
    const iconCount = await lucideIcons.count();
    console.log(`  ${iconUrl.split('/').pop() || 'home'}: Found ${iconCount} SVG icons`);
    
    if (iconCount > 0) {
      const firstIcon = await lucideIcons.first().evaluate(el => {
        const rect = el.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          className: el.className || 'no-class'
        };
      });
      console.log(`    First icon: ${firstIcon.width}x${firstIcon.height}, class: ${firstIcon.className}`);
    }
  }
  
  console.log('\n✅ Detailed analysis complete!');
});