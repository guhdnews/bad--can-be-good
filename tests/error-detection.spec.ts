import { test, expect } from '@playwright/test';

test.describe('Enhanced Error Detection', () => {
  test('comprehensive error analysis', async ({ page }) => {
    // Listen for all console messages
    const consoleMessages: any[] = [];
    const errors: any[] = [];
    const warnings: any[] = [];
    
    page.on('console', msg => {
      consoleMessages.push({
        type: msg.type(),
        text: msg.text(),
        location: msg.location()
      });
      
      if (msg.type() === 'error') {
        errors.push(msg.text());
      } else if (msg.type() === 'warning') {
        warnings.push(msg.text());
      }
    });

    // Listen for page errors
    const pageErrors: any[] = [];
    page.on('pageerror', error => {
      pageErrors.push({
        message: error.message,
        stack: error.stack
      });
    });

    // Listen for failed requests
    const failedRequests: any[] = [];
    page.on('requestfailed', request => {
      failedRequests.push({
        url: request.url(),
        method: request.method(),
        failure: request.failure()
      });
    });

    // Go to homepage
    console.log('🔍 Analyzing homepage...');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Take homepage screenshot
    await page.screenshot({ 
      path: 'test-results/homepage-analysis.png',
      fullPage: true 
    });

    // Check for basic page structure
    const title = await page.title();
    console.log('📄 Page Title:', title);
    
    // Check navigation structure
    const navLinks = await page.$$eval('nav a, header a[href]', links => 
      links.map(link => ({
        text: link.textContent?.trim(),
        href: link.getAttribute('href'),
        classes: link.className
      }))
    );
    console.log('🔗 Navigation Links Found:', navLinks.length);
    navLinks.forEach(link => console.log(`   - ${link.text} → ${link.href}`));

    // Test intranet page
    console.log('🔍 Analyzing intranet page...');
    await page.goto('http://localhost:3000/intranet');
    await page.waitForLoadState('networkidle');
    
    // Take intranet screenshot
    await page.screenshot({ 
      path: 'test-results/intranet-analysis.png',
      fullPage: true 
    });

    // Check Firebase/Auth presence
    const authElements = await page.evaluate(() => {
      const firebaseScripts = Array.from(document.querySelectorAll('script[src*="firebase"]'));
      const authForms = Array.from(document.querySelectorAll('form, [data-auth], [class*="auth"], [id*="auth"]'));
      
      return {
        firebaseScripts: firebaseScripts.length,
        authElements: authForms.length,
        hasFirebaseGlobal: typeof (window as any).firebase !== 'undefined',
        hasAuthContext: document.querySelector('[data-testid="auth-context"]') !== null
      };
    });
    
    console.log('🔐 Authentication Analysis:', authElements);

    // Final error summary
    console.log('\n📊 ERROR ANALYSIS SUMMARY:');
    console.log(`❌ Console Errors: ${errors.length}`);
    errors.forEach(error => console.log(`   - ${error}`));
    
    console.log(`⚠️  Console Warnings: ${warnings.length}`);
    warnings.forEach(warning => console.log(`   - ${warning}`));
    
    console.log(`🌐 Failed Requests: ${failedRequests.length}`);
    failedRequests.forEach(req => console.log(`   - ${req.method} ${req.url}: ${req.failure?.errorText}`));
    
    console.log(`💥 Page Errors: ${pageErrors.length}`);
    pageErrors.forEach(err => console.log(`   - ${err.message}`));
    
    // Write detailed report
    const report = {
      timestamp: new Date().toISOString(),
      homepage: {
        title,
        navigationLinks: navLinks,
        consoleErrors: errors,
        consoleWarnings: warnings,
        pageErrors,
        failedRequests
      },
      intranet: {
        authentication: authElements
      }
    };
    
    await page.evaluate((reportData) => {
      console.log('📋 DETAILED REPORT:', JSON.stringify(reportData, null, 2));
    }, report);
  });
});