import { test, expect } from '@playwright/test';

test.describe('Comprehensive Website Analysis', () => {
  test('full website error detection and analysis', async ({ page }) => {
    // Error tracking arrays
    const errors: any[] = [];
    const warnings: any[] = [];
    const failedRequests: any[] = [];
    const pageErrors: any[] = [];
    const brokenLinks: any[] = [];
    const accessibilityIssues: any[] = [];
    
    // Set up error listeners
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
    
    page.on('requestfailed', request => {
      failedRequests.push({
        url: request.url(),
        method: request.method(),
        failure: request.failure()?.errorText
      });
    });

    const pagesToTest = [
      { name: 'Homepage', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Packages', url: '/packages' },
      { name: 'About', url: '/about' },
      { name: 'Contact', url: '/contact' },
      { name: 'FAQ', url: '/faq' },
      { name: 'Intranet', url: '/intranet' }
    ];

    for (const pageInfo of pagesToTest) {
      console.log(`🔍 Analyzing: ${pageInfo.name} (${pageInfo.url})`);
      
      try {
        await page.goto(`http://localhost:3000${pageInfo.url}`);
        await page.waitForLoadState('networkidle', { timeout: 10000 });
        
        // Take screenshot
        await page.screenshot({ 
          path: `test-results/${pageInfo.name.toLowerCase()}-analysis.png`,
          fullPage: true 
        });
        
        // Check for broken images
        const brokenImages = await page.evaluate(() => {
          const images = Array.from(document.querySelectorAll('img'));
          return images.filter(img => !img.complete || img.naturalHeight === 0)
                      .map(img => ({ src: img.src, alt: img.alt }));
        });
        
        if (brokenImages.length > 0) {
          console.log(`❌ Broken images on ${pageInfo.name}:`, brokenImages);
        }
        
        // Check links
        const links = await page.$$eval('a[href]', links => 
          links.map(link => ({
            text: link.textContent?.trim(),
            href: link.href,
            target: link.target
          }))
        );
        
        // Test internal links
        for (const link of links.filter(l => l.href.includes('localhost:3000'))) {
          try {
            const response = await page.request.head(link.href);
            if (!response.ok()) {
              brokenLinks.push({
                page: pageInfo.name,
                link: link.href,
                text: link.text,
                status: response.status()
              });
            }
          } catch (error) {
            brokenLinks.push({
              page: pageInfo.name,
              link: link.href,
              text: link.text,
              error: error.message
            });
          }
        }
        
        // Check for accessibility issues
        const accessibilityCheck = await page.evaluate(() => {
          const issues = [];
          
          // Check for images without alt text
          const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
          if (imagesWithoutAlt.length > 0) {
            issues.push(`${imagesWithoutAlt.length} images without alt text`);
          }
          
          // Check for buttons without text or aria-label
          const buttonsWithoutText = document.querySelectorAll('button:not([aria-label]):empty');
          if (buttonsWithoutText.length > 0) {
            issues.push(`${buttonsWithoutText.length} buttons without text or aria-label`);
          }
          
          // Check for headings order
          const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
          const headingLevels = headings.map(h => parseInt(h.tagName.charAt(1)));
          for (let i = 1; i < headingLevels.length; i++) {
            if (headingLevels[i] - headingLevels[i-1] > 1) {
              issues.push('Heading levels skip (e.g., h1 to h3)');
              break;
            }
          }
          
          return issues;
        });
        
        if (accessibilityCheck.length > 0) {
          accessibilityIssues.push({
            page: pageInfo.name,
            issues: accessibilityCheck
          });
        }
        
        // Check CSS layout issues
        const layoutIssues = await page.evaluate(() => {
          const issues = [];
          
          // Check for elements with overflow
          const overflowElements = Array.from(document.querySelectorAll('*')).filter(el => {
            const style = window.getComputedStyle(el);
            return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
          });
          
          if (overflowElements.length > 0) {
            issues.push(`${overflowElements.length} elements with potential overflow issues`);
          }
          
          // Check for very small text
          const smallText = Array.from(document.querySelectorAll('*')).filter(el => {
            const style = window.getComputedStyle(el);
            const fontSize = parseFloat(style.fontSize);
            return fontSize < 12 && el.textContent?.trim();
          });
          
          if (smallText.length > 0) {
            issues.push(`${smallText.length} elements with very small text (< 12px)`);
          }
          
          return issues;
        });
        
        if (layoutIssues.length > 0) {
          console.log(`⚠️  Layout issues on ${pageInfo.name}:`, layoutIssues);
        }
        
      } catch (error) {
        console.log(`❌ Error analyzing ${pageInfo.name}:`, error.message);
      }
    }

    // Final report
    console.log('\n📊 COMPREHENSIVE ANALYSIS REPORT:');
    console.log(`❌ Console Errors: ${errors.length}`);
    errors.forEach(error => console.log(`   - ${error.text}`));
    
    console.log(`⚠️  Console Warnings: ${warnings.length}`);
    warnings.forEach(warning => console.log(`   - ${warning.text}`));
    
    console.log(`🔗 Broken Links: ${brokenLinks.length}`);
    brokenLinks.forEach(link => console.log(`   - ${link.page}: ${link.link} (${link.status || link.error})`));
    
    console.log(`🌐 Failed Requests: ${failedRequests.length}`);
    failedRequests.forEach(req => console.log(`   - ${req.method} ${req.url}: ${req.failure}`));
    
    console.log(`♿ Accessibility Issues: ${accessibilityIssues.length}`);
    accessibilityIssues.forEach(issue => console.log(`   - ${issue.page}: ${issue.issues.join(', ')}`));
    
    console.log(`💥 Page Errors: ${pageErrors.length}`);
    pageErrors.forEach(err => console.log(`   - ${err.message}`));
  });
});