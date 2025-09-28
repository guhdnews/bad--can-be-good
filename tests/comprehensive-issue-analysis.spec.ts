import { test, expect } from '@playwright/test';

test.describe('Comprehensive Issue Analysis', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('Homepage - Hero button contrast and visibility issues', async ({ page }) => {
    console.log('🔍 Testing Homepage Hero Button Issues...');
    
    // Test hero section buttons
    const getStartedBtn = page.locator('.hero-section .btn').first();
    const viewServicesBtn = page.locator('.hero-section .btn').nth(1);
    
    // Check if buttons exist
    await expect(getStartedBtn).toBeVisible();
    await expect(viewServicesBtn).toBeVisible();
    
    // Get button styles
    const getStartedStyles = await getStartedBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        border: computed.border,
        outline: computed.outline
      };
    });
    
    const viewServicesStyles = await viewServicesBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        border: computed.border,
        outline: computed.outline
      };
    });
    
    console.log('🎨 Get Started button styles:', getStartedStyles);
    console.log('🎨 View Services button styles:', viewServicesStyles);
    
    // Check contrast issues
    const isViewServicesTextBlack = viewServicesStyles.color.includes('rgb(0, 0, 0)');
    const hasProperOutline = viewServicesStyles.outline.includes('white') || viewServicesStyles.border.includes('white');
    
    console.log(`❌ View Services button has black text: ${isViewServicesTextBlack}`);
    console.log(`⚪ View Services button has white outline: ${hasProperOutline}`);
    
    // Take screenshot for manual review
    await page.screenshot({ 
      path: 'test-results/homepage-hero-buttons.png',
      clip: { x: 0, y: 80, width: 1280, height: 400 }
    });
  });

  test('Homepage - Why Choose Upface card spacing', async ({ page }) => {
    console.log('🔍 Testing Homepage Card Spacing Issues...');
    
    const featureCards = page.locator('.features-section .card, .features-section .feature-card');
    const cardCount = await featureCards.count();
    
    console.log(`📦 Found ${cardCount} feature cards`);
    
    for (let i = 0; i < cardCount; i++) {
      const card = featureCards.nth(i);
      const cardBox = await card.boundingBox();
      const cardStyles = await card.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          padding: computed.padding,
          height: computed.height,
          minHeight: computed.minHeight,
          marginBottom: computed.marginBottom
        };
      });
      
      console.log(`📦 Card ${i + 1} dimensions:`, cardBox);
      console.log(`🎨 Card ${i + 1} styles:`, cardStyles);
    }
    
    await page.screenshot({ 
      path: 'test-results/homepage-feature-cards.png',
      clip: { x: 0, y: 600, width: 1280, height: 800 }
    });
  });

  test('Homepage - Services section header and button issues', async ({ page }) => {
    console.log('🔍 Testing Homepage Services Section Issues...');
    
    const servicesHeader = page.locator('h2').filter({ hasText: /our services|services/i }).first();
    const viewAllServicesBtn = page.locator('text=View All Services').first();
    
    if (await servicesHeader.count() > 0) {
      const headerBox = await servicesHeader.boundingBox();
      const headerStyles = await servicesHeader.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          marginTop: computed.marginTop,
          paddingTop: computed.paddingTop,
          position: computed.position
        };
      });
      
      console.log('📋 Services header position:', headerBox);
      console.log('🎨 Services header styles:', headerStyles);
    }
    
    if (await viewAllServicesBtn.count() > 0) {
      const btnStyles = await viewAllServicesBtn.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          border: computed.border,
          outline: computed.outline
        };
      });
      
      console.log('🔘 View All Services button styles:', btnStyles);
    }
    
    await page.screenshot({ path: 'test-results/homepage-services-section.png' });
  });

  test('Services page - Button and layout issues', async ({ page }) => {
    console.log('🔍 Testing Services Page Issues...');
    
    await page.goto('http://localhost:3000/services');
    await page.waitForLoadState('networkidle');
    
    // Test "Get Started Today" button
    const getStartedBtn = page.locator('text=Get Started Today').first();
    if (await getStartedBtn.count() > 0) {
      const btnStyles = await getStartedBtn.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          border: computed.border,
          outline: computed.outline
        };
      });
      
      console.log('🔘 Get Started Today button styles:', btnStyles);
    }
    
    // Test "What We Do" section layout
    const whatWeDoSection = page.locator('.services-grid, .what-we-do');
    if (await whatWeDoSection.count() > 0) {
      const sectionBox = await whatWeDoSection.first().boundingBox();
      const cards = whatWeDoSection.locator('.card, .service-card');
      const cardCount = await cards.count();
      
      console.log(`📦 What We Do section: ${cardCount} cards found`);
      console.log('📏 Section dimensions:', sectionBox);
      
      // Check if cards are properly spaced
      for (let i = 0; i < Math.min(cardCount, 3); i++) {
        const card = cards.nth(i);
        const cardBox = await card.boundingBox();
        console.log(`📦 Card ${i + 1} position:`, cardBox);
      }
    }
    
    // Test process section
    const processSection = page.locator('.process-section');
    if (await processSection.count() > 0) {
      const processCards = processSection.locator('.card, .process-card');
      const processCount = await processCards.count();
      
      console.log(`🔢 Process cards found: ${processCount}`);
      
      // Check process numbers
      for (let i = 0; i < Math.min(processCount, 4); i++) {
        const card = processCards.nth(i);
        const numberElement = card.locator('.number, .step-number, .process-number').first();
        
        if (await numberElement.count() > 0) {
          const numberText = await numberElement.textContent();
          console.log(`🔢 Process ${i + 1} number: ${numberText}`);
        }
      }
    }
    
    await page.screenshot({ path: 'test-results/services-page-issues.png' });
  });

  test('Packages page - Card truncation issues', async ({ page }) => {
    console.log('🔍 Testing Packages Page Card Issues...');
    
    await page.goto('http://localhost:3000/packages');
    await page.waitForLoadState('networkidle');
    
    const packageCards = page.locator('.package-card, .card');
    const cardCount = await packageCards.count();
    
    console.log(`📦 Found ${cardCount} package cards`);
    
    for (let i = 0; i < cardCount; i++) {
      const card = packageCards.nth(i);
      const cardBox = await card.boundingBox();
      
      // Check if card content is visible
      const cardText = await card.textContent();
      const isContentTruncated = cardBox && cardBox.height < 400; // Arbitrary threshold
      
      console.log(`📦 Card ${i + 1}:`);
      console.log(`  📏 Dimensions:`, cardBox);
      console.log(`  📝 Content length: ${cardText?.length || 0} characters`);
      console.log(`  ✂️ Potentially truncated: ${isContentTruncated}`);
    }
    
    await page.screenshot({ path: 'test-results/packages-card-truncation.png' });
  });

  test('FAQ page - Hero padding and dropdown issues', async ({ page }) => {
    console.log('🔍 Testing FAQ Page Issues...');
    
    await page.goto('http://localhost:3000/faq');
    await page.waitForLoadState('networkidle');
    
    // Test hero padding
    const heroSection = page.locator('.hero-section').first();
    if (await heroSection.count() > 0) {
      const heroStyles = await heroSection.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          paddingTop: computed.paddingTop,
          paddingBottom: computed.paddingBottom,
          height: computed.height
        };
      });
      
      console.log('🎭 FAQ Hero styles:', heroStyles);
    }
    
    // Test FAQ dropdowns
    const faqItems = page.locator('.faq-item, .accordion-item');
    const faqCount = await faqItems.count();
    
    console.log(`❓ Found ${faqCount} FAQ items`);
    
    if (faqCount > 0) {
      // Test first FAQ item
      const firstFaq = faqItems.first();
      const question = firstFaq.locator('.question, .accordion-header').first();
      const answer = firstFaq.locator('.answer, .accordion-body').first();
      
      if (await question.count() > 0 && await answer.count() > 0) {
        const answerStyles = await answer.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            display: computed.display,
            height: computed.height,
            maxHeight: computed.maxHeight,
            overflow: computed.overflow
          };
        });
        
        console.log('💬 FAQ answer styles:', answerStyles);
        
        // Test dropdown functionality
        await question.click();
        await page.waitForTimeout(1000);
        
        const isAnswerVisible = await answer.isVisible();
        console.log(`👁️ Answer visible after click: ${isAnswerVisible}`);
      }
    }
    
    await page.screenshot({ path: 'test-results/faq-page-issues.png' });
  });

  test('Contact page - Loading and layout issues', async ({ page }) => {
    console.log('🔍 Testing Contact Page Issues...');
    
    await page.goto('http://localhost:3000/contact');
    await page.waitForLoadState('networkidle');
    
    // Check if contact form is visible
    const contactForm = page.locator('form, .contact-form');
    const formExists = await contactForm.count() > 0;
    
    console.log(`📝 Contact form found: ${formExists}`);
    
    if (formExists) {
      const formBox = await contactForm.first().boundingBox();
      console.log('📏 Contact form dimensions:', formBox);
      
      // Check form fields
      const inputs = contactForm.locator('input, textarea');
      const inputCount = await inputs.count();
      console.log(`📝 Form inputs found: ${inputCount}`);
    }
    
    // Check if page content is cut off
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    
    console.log(`📏 Page height: ${pageHeight}px, Viewport: ${viewportHeight}px`);
    
    const isCutOff = pageHeight > viewportHeight * 2; // If page is unusually long
    console.log(`✂️ Content potentially cut off: ${isCutOff}`);
    
    await page.screenshot({ path: 'test-results/contact-page-issues.png', fullPage: true });
  });

  test('Site-wide - CTA button styling issues', async ({ page }) => {
    console.log('🔍 Testing Site-wide CTA Button Issues...');
    
    const pages = ['/', '/services', '/packages', '/about', '/faq', '/contact'];
    
    for (const pagePath of pages) {
      console.log(`\n🌐 Testing CTA buttons on ${pagePath}`);
      await page.goto(`http://localhost:3000${pagePath}`);
      await page.waitForLoadState('networkidle');
      
      const ctaSections = page.locator('.cta-section, .call-to-action');
      const ctaCount = await ctaSections.count();
      
      if (ctaCount > 0) {
        for (let i = 0; i < ctaCount; i++) {
          const ctaSection = ctaSections.nth(i);
          const ctaButton = ctaSection.locator('button, .btn').first();
          
          if (await ctaButton.count() > 0) {
            const ctaStyles = await ctaButton.evaluate((el) => {
              const computed = window.getComputedStyle(el);
              return {
                backgroundColor: computed.backgroundColor,
                color: computed.color,
                border: computed.border
              };
            });
            
            const sectionStyles = await ctaSection.evaluate((el) => {
              const computed = window.getComputedStyle(el);
              return {
                backgroundColor: computed.backgroundColor
              };
            });
            
            console.log(`  🎨 CTA Section ${i + 1} background:`, sectionStyles.backgroundColor);
            console.log(`  🔘 CTA Button ${i + 1} styles:`, ctaStyles);
            
            // Check if button has good contrast against blue background
            const isBlueBackground = sectionStyles.backgroundColor.includes('30, 58, 138') || 
                                   sectionStyles.backgroundColor.includes('blue');
            const hasWhiteButton = ctaStyles.backgroundColor.includes('255, 255, 255');
            const hasWhiteText = ctaStyles.color.includes('255, 255, 255');
            
            if (isBlueBackground) {
              console.log(`    ⚠️ Blue background with white button: ${hasWhiteButton}`);
              console.log(`    ⚠️ Blue background with white text: ${hasWhiteText}`);
            }
          }
        }
      }
    }
    
    await page.screenshot({ path: 'test-results/site-wide-cta-buttons.png' });
  });
});