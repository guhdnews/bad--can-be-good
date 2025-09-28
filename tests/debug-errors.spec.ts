import { test, expect } from '@playwright/test';

test.describe('Debug Client-Side Errors', () => {
  test('identify and capture all JavaScript errors', async ({ page }) => {
    console.log('🔍 DEBUGGING CLIENT-SIDE ERRORS...');
    
    const errors: any[] = [];
    const warnings: any[] = [];
    const pageErrors: any[] = [];
    const consoleMessages: any[] = [];
    
    // Capture all console messages
    page.on('console', msg => {
      const message = {
        type: msg.type(),
        text: msg.text(),
        location: msg.location(),
        timestamp: new Date().toISOString()
      };
      consoleMessages.push(message);
      
      if (msg.type() === 'error') {
        errors.push(message);
        console.log(`❌ CONSOLE ERROR: ${msg.text()}`);
      } else if (msg.type() === 'warning') {
        warnings.push(message);
        console.log(`⚠️  CONSOLE WARNING: ${msg.text()}`);
      }
    });
    
    // Capture page errors (uncaught exceptions)
    page.on('pageerror', error => {
      const pageError = {
        message: error.message,
        stack: error.stack,
        name: error.name,
        timestamp: new Date().toISOString()
      };
      pageErrors.push(pageError);
      console.log(`💥 PAGE ERROR: ${error.message}`);
      console.log(`   Stack: ${error.stack}`);
    });
    
    // Capture failed requests
    const failedRequests: any[] = [];
    page.on('requestfailed', request => {
      const failedReq = {
        url: request.url(),
        method: request.method(),
        failure: request.failure()?.errorText
      };
      failedRequests.push(failedReq);
      console.log(`🌐 FAILED REQUEST: ${request.method()} ${request.url()} - ${request.failure()?.errorText}`);
    });
    
    // Test homepage first
    console.log('\n🏠 Testing Homepage...');
    try {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      console.log('✅ Homepage loaded successfully');
    } catch (error) {
      console.log(`❌ Homepage failed to load: ${error.message}`);
    }
    
    // Test other pages
    const pages = ['/services', '/about', '/contact', '/faq'];
    
    for (const pagePath of pages) {
      console.log(`\n📄 Testing ${pagePath}...`);
      try {
        await page.goto(`http://localhost:3000${pagePath}`);
        await page.waitForLoadState('networkidle', { timeout: 5000 });
        console.log(`✅ ${pagePath} loaded successfully`);
      } catch (error) {
        console.log(`❌ ${pagePath} failed to load: ${error.message}`);
      }
    }
    
    // Summary report
    console.log('\n📊 ERROR SUMMARY REPORT:');
    console.log(`💥 Page Errors (Uncaught Exceptions): ${pageErrors.length}`);
    pageErrors.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error.message}`);
      if (error.stack) {
        console.log(`     Stack: ${error.stack.split('\\n')[0]}`);
      }
    });
    
    console.log(`❌ Console Errors: ${errors.length}`);
    errors.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error.text}`);
      if (error.location) {
        console.log(`     Location: ${error.location.url}:${error.location.lineNumber}`);
      }
    });
    
    console.log(`⚠️  Console Warnings: ${warnings.length}`);
    warnings.forEach((warning, index) => {
      console.log(`  ${index + 1}. ${warning.text}`);
    });
    
    console.log(`🌐 Failed Requests: ${failedRequests.length}`);
    failedRequests.forEach((req, index) => {
      console.log(`  ${index + 1}. ${req.method} ${req.url} - ${req.failure}`);
    });
    
    // If we have errors, this indicates what needs to be fixed
    if (pageErrors.length > 0 || errors.length > 0) {
      console.log('\\n🚨 CRITICAL ISSUES FOUND - DO NOT DEPLOY!');
      console.log('These errors must be fixed before deployment.');
    } else {
      console.log('\\n✅ No critical errors found in JavaScript execution.');
    }
  });
});