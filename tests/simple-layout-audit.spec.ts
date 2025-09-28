import { test, expect, Page } from '@playwright/test';

const PAGES_TO_AUDIT = [
  { name: 'Homepage', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Packages', path: '/packages' },
  { name: 'FAQ', path: '/faq' }
];

const VIEWPORT_SIZES = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1280, height: 720 }
];

interface LayoutIssue {
  type: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

async function checkBasicLayoutIssues(page: Page): Promise<LayoutIssue[]> {
  const issues: LayoutIssue[] = [];
  
  try {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Check 1: Horizontal scroll (overflow)
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.body.scrollWidth > window.innerWidth;
    });
    
    if (hasHorizontalScroll) {
      issues.push({
        type: 'overflow',
        description: 'Page has horizontal scroll - content extends beyond viewport',
        severity: 'high'
      });
    }
    
    // Check 2: Very small touch targets on mobile
    if (page.viewportSize()?.width && page.viewportSize()!.width < 768) {
      const smallButtons = await page.evaluate(() => {
        const buttons = document.querySelectorAll('button, a[href], input[type="submit"], [role="button"]');
        let count = 0;
        
        buttons.forEach(button => {
          const rect = button.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
            count++;
          }
        });
        
        return count;
      });
      
      if (smallButtons > 0) {
        issues.push({
          type: 'touch-targets',
          description: `${smallButtons} interactive elements are smaller than recommended 44px minimum`,
          severity: 'medium'
        });
      }
    }
    
    // Check 3: Text content overflow
    const overflowingText = await page.evaluate(() => {
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
      let count = 0;
      
      textElements.forEach(element => {
        try {
          const style = window.getComputedStyle(element);
          if (style.display !== 'none' && element.scrollWidth > element.clientWidth + 5) {
            count++;
          }
        } catch (e) {
          // Skip elements that can't be styled
        }
      });
      
      return count;
    });
    
    if (overflowingText > 2) { // Allow a few minor cases
      issues.push({
        type: 'text-overflow',
        description: `${overflowingText} elements have text content overflowing their containers`,
        severity: 'medium'
      });
    }
    
    // Check 4: Invisible or very low contrast elements
    const invisibleElements = await page.evaluate(() => {
      const allElements = document.querySelectorAll('*');
      let count = 0;
      
      allElements.forEach(element => {
        try {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          
          // Skip if element is intentionally hidden
          if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
            return;
          }
          
          // Check if element has content but zero dimensions (potential layout issue)
          if (element.textContent && element.textContent.trim().length > 0 && 
              (rect.width === 0 || rect.height === 0)) {
            count++;
          }
        } catch (e) {
          // Skip problematic elements
        }
      });
      
      return count;
    });
    
    if (invisibleElements > 0) {
      issues.push({
        type: 'invisible-content',
        description: `${invisibleElements} elements have content but zero dimensions`,
        severity: 'high'
      });
    }
    
    // Check 5: Extremely wide elements that might cause layout issues
    const wideElements = await page.evaluate(() => {
      const viewportWidth = window.innerWidth;
      const elements = document.querySelectorAll('*');
      let count = 0;
      
      elements.forEach(element => {
        try {
          const rect = element.getBoundingClientRect();
          if (rect.width > viewportWidth * 1.5) { // 150% of viewport width
            count++;
          }
        } catch (e) {
          // Skip problematic elements
        }
      });
      
      return count;
    });
    
    if (wideElements > 0) {
      issues.push({
        type: 'wide-elements',
        description: `${wideElements} elements are significantly wider than the viewport`,
        severity: 'medium'
      });
    }
    
    // Check 6: Missing alt text on images (accessibility + layout consideration)
    const imagesWithoutAlt = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      let count = 0;
      
      images.forEach(img => {
        if (!img.getAttribute('alt') && img.style.display !== 'none') {
          count++;
        }
      });
      
      return count;
    });
    
    if (imagesWithoutAlt > 0) {
      issues.push({
        type: 'missing-alt',
        description: `${imagesWithoutAlt} images are missing alt attributes`,
        severity: 'low'
      });
    }
    
  } catch (error) {
    issues.push({
      type: 'audit-error',
      description: `Failed to complete layout audit: ${error.message}`,
      severity: 'high'
    });
  }
  
  return issues;
}

test('Simple Layout Consistency Audit', async ({ browser }) => {
  const allResults: Array<{
    page: string;
    viewport: string;
    issues: LayoutIssue[];
    score: number;
  }> = [];
  
  for (const viewport of VIEWPORT_SIZES) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height }
    });
    
    const page = await context.newPage();
    
    for (const pageInfo of PAGES_TO_AUDIT) {
      try {
        console.log(`🔍 Checking ${pageInfo.name} on ${viewport.name}...`);
        
        await page.goto(`http://localhost:3000${pageInfo.path}`, {
          waitUntil: 'networkidle',
          timeout: 15000
        });
        
        const issues = await checkBasicLayoutIssues(page);
        
        // Calculate score (100 - penalties)
        const penalties = issues.reduce((sum, issue) => {
          return sum + (issue.severity === 'high' ? 20 : issue.severity === 'medium' ? 10 : 5);
        }, 0);
        const score = Math.max(0, 100 - penalties);
        
        allResults.push({
          page: pageInfo.name,
          viewport: viewport.name,
          issues,
          score
        });
        
        if (issues.length > 0) {
          console.log(`❌ Found ${issues.length} layout issues on ${pageInfo.name} (${viewport.name})`);
          issues.forEach(issue => {
            console.log(`  - ${issue.type}: ${issue.description} [${issue.severity}]`);
          });
        } else {
          console.log(`✅ No layout issues found on ${pageInfo.name} (${viewport.name})`);
        }
        
      } catch (error) {
        console.error(`❌ Error checking ${pageInfo.name} on ${viewport.name}:`, error.message);
        allResults.push({
          page: pageInfo.name,
          viewport: viewport.name,
          issues: [{
            type: 'page-error',
            description: `Failed to load or analyze page: ${error.message}`,
            severity: 'high'
          }],
          score: 0
        });
      }
    }
    
    await context.close();
  }
  
  // Generate summary
  console.log('\n📊 LAYOUT AUDIT SUMMARY:');
  
  const totalIssues = allResults.reduce((sum, result) => sum + result.issues.length, 0);
  const avgScore = allResults.reduce((sum, result) => sum + result.score, 0) / allResults.length;
  
  console.log(`\n🎯 Overall Results:`);
  console.log(`• Total issues found: ${totalIssues}`);
  console.log(`• Average score: ${avgScore.toFixed(1)}/100`);
  console.log(`• Pages tested: ${PAGES_TO_AUDIT.length}`);
  console.log(`• Viewports tested: ${VIEWPORT_SIZES.length}`);
  
  // Show issues by severity
  const highSeverityIssues = allResults.filter(r => r.issues.some(i => i.severity === 'high'));
  if (highSeverityIssues.length > 0) {
    console.log(`\n🚨 High Severity Issues:`);
    highSeverityIssues.forEach(result => {
      const highIssues = result.issues.filter(i => i.severity === 'high');
      if (highIssues.length > 0) {
        console.log(`\n${result.page} (${result.viewport}):`);
        highIssues.forEach(issue => {
          console.log(`  • ${issue.type}: ${issue.description}`);
        });
      }
    });
  }
  
  // Show performance by viewport
  console.log(`\n📱 Performance by Viewport:`);
  VIEWPORT_SIZES.forEach(viewport => {
    const viewportResults = allResults.filter(r => r.viewport === viewport.name);
    const avgViewportScore = viewportResults.reduce((sum, r) => sum + r.score, 0) / viewportResults.length;
    console.log(`• ${viewport.name}: ${avgViewportScore.toFixed(1)}/100`);
  });
  
  // Show performance by page
  console.log(`\n📄 Performance by Page:`);
  PAGES_TO_AUDIT.forEach(pageInfo => {
    const pageResults = allResults.filter(r => r.page === pageInfo.name);
    const avgPageScore = pageResults.reduce((sum, r) => sum + r.score, 0) / pageResults.length;
    console.log(`• ${pageInfo.name}: ${avgPageScore.toFixed(1)}/100`);
  });
  
  // Set reasonable expectations
  const highSeverityCount = allResults.reduce((sum, r) => 
    sum + r.issues.filter(i => i.severity === 'high').length, 0
  );
  
  console.log(`\n🏆 Final Assessment:`);
  console.log(`• High severity issues: ${highSeverityCount}`);
  console.log(`• Overall health score: ${avgScore.toFixed(1)}/100`);
  
  // Test expectations
  expect(highSeverityCount).toBeLessThan(10); // Allow some high severity issues
  expect(avgScore).toBeGreaterThan(60); // Minimum acceptable average score
  expect(totalIssues).toBeLessThan(50); // Keep total issues reasonable
});