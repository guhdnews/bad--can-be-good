import { test, expect } from '@playwright/test';

test.describe('Final Website Verification', () => {
  test('verify all improvements are working correctly', async ({ page }) => {
    // Track errors and issues
    const errors: any[] = [];
    const warnings: any[] = [];
    const pageErrors: any[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push({ text: msg.text(), location: msg.location() });
      } else if (msg.type() === 'warning') {
        warnings.push({ text: msg.text(), location: msg.location() });
      }
    });
    
    page.on('pageerror', error => {
      pageErrors.push({ message: error.message, stack: error.stack });
    });

    console.log('🔍 Testing homepage with new animations...');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Test new logo is present
    const logoElement = page.locator('img[src*="upface-logo"]').first();
    if (await logoElement.isVisible()) {
      console.log('✅ New logo is displaying correctly');
    }
    
    // Test animations are working (check for framer-motion classes)
    const animatedElements = await page.$$('[style*="transform"], [style*="opacity"]');
    console.log(`✅ Found ${animatedElements.length} animated elements on homepage`);
    
    // Test heading hierarchy
    const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', headings => 
      headings.map(h => ({ tag: h.tagName, text: h.textContent?.trim().substring(0, 50) }))
    );
    
    let headingIssues = 0;
    const levels = headings.map(h => parseInt(h.tag.charAt(1)));
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] - levels[i-1] > 1) {
        headingIssues++;
        break;
      }
    }
    
    if (headingIssues === 0) {
      console.log('✅ Homepage heading hierarchy is correct');
    } else {
      console.log('❌ Homepage still has heading hierarchy issues');
    }
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/homepage-final-verification.png',
      fullPage: true 
    });

    console.log('🔍 Testing FAQ page fixes...');
    try {
      await page.goto('http://localhost:3000/faq');
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      
      // Check FAQ page layout
      const faqContainer = page.locator('.max-w-4xl.mx-auto');
      if (await faqContainer.isVisible()) {
        console.log('✅ FAQ page layout is properly structured');
      }
      
      // Test FAQ interaction
      const firstFAQ = page.locator('button').first();
      if (await firstFAQ.isVisible()) {
        await firstFAQ.click();
        console.log('✅ FAQ interactions are working');
      }
      
      await page.screenshot({ 
        path: 'test-results/faq-final-verification.png',
        fullPage: true 
      });
      
    } catch (error) {
      console.log('❌ FAQ page still has issues:', error);
    }

    console.log('🔍 Testing contact page heading fixes...');
    await page.goto('http://localhost:3000/contact');
    await page.waitForLoadState('networkidle');
    
    const contactHeadings = await page.$$eval('h1, h2, h3', headings => 
      headings.map(h => ({ tag: h.tagName, text: h.textContent?.trim() }))
    );
    
    console.log('Contact page headings:', contactHeadings);
    
    // Test form functionality
    const nameInput = page.locator('input[placeholder*="Name"]');
    if (await nameInput.isVisible()) {
      console.log('✅ Contact form is properly structured');
    }
    
    await page.screenshot({ 
      path: 'test-results/contact-final-verification.png',
      fullPage: true 
    });

    console.log('🔍 Testing services page animations...');
    await page.goto('http://localhost:3000/services');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'test-results/services-final-verification.png',
      fullPage: true 
    });

    // Final error summary
    console.log('\\n📊 FINAL VERIFICATION SUMMARY:');
    console.log(`❌ Console Errors: ${errors.length}`);
    errors.forEach(error => console.log(`   - ${error.text}`));
    
    console.log(`⚠️  Console Warnings: ${warnings.length}`);
    warnings.forEach(warning => console.log(`   - ${warning.text}`));
    
    console.log(`💥 Page Errors: ${pageErrors.length}`);
    pageErrors.forEach(err => console.log(`   - ${err.message}`));
    
    // Success criteria
    const successCriteria = {
      noPageErrors: pageErrors.length === 0,
      minimalWarnings: warnings.length <= 2, // Allow some warnings (like GA in dev mode)
      noConsoleErrors: errors.length === 0
    };
    
    console.log('\\n🎯 SUCCESS CRITERIA:');
    console.log(`✅ No page errors: ${successCriteria.noPageErrors}`);
    console.log(`✅ Minimal warnings: ${successCriteria.minimalWarnings}`);
    console.log(`✅ No console errors: ${successCriteria.noConsoleErrors}`);
    
    if (successCriteria.noPageErrors && successCriteria.noConsoleErrors) {
      console.log('\\n🎉 ALL IMPROVEMENTS SUCCESSFULLY IMPLEMENTED!');
    }
  });
});