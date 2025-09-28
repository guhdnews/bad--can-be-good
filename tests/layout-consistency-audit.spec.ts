import { test, expect, Page } from '@playwright/test';

// Layout audit configuration
const VIEWPORT_SIZES = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Mobile Large', width: 414, height: 896 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1280, height: 720 },
  { name: 'Large Desktop', width: 1920, height: 1080 }
];

const PAGES_TO_AUDIT = [
  { name: 'Homepage', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Packages', path: '/packages' },
  { name: 'FAQ', path: '/faq' }
];

interface LayoutIssue {
  type: 'overflow' | 'overlap' | 'spacing' | 'misalignment' | 'responsive';
  element: string;
  description: string;
  location: { x: number; y: number; width: number; height: number };
  severity: 'critical' | 'high' | 'medium' | 'low';
}

interface PageAuditResult {
  pageName: string;
  viewport: string;
  issues: LayoutIssue[];
  score: number;
}

async function auditPageLayout(page: Page, pageName: string, viewport: string): Promise<PageAuditResult> {
  console.log(`🎯 Auditing layout for ${pageName} on ${viewport}...`);
  
  const issues: LayoutIssue[] = [];
  
  try {
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Allow animations to complete
    
    // Check for horizontal overflow
    const horizontalOverflow = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      const bodyScrollWidth = body.scrollWidth;
      const htmlScrollWidth = html.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      if (bodyScrollWidth > viewportWidth || htmlScrollWidth > viewportWidth) {
        const overflowElements: Array<{
          selector: string;
          rect: { x: number; y: number; width: number; height: number };
          scrollWidth: number;
        }> = [];
        
        document.querySelectorAll('*').forEach((element) => {
          const rect = element.getBoundingClientRect();
          const scrollWidth = element.scrollWidth;
          
          if (rect.right > viewportWidth && element.tagName !== 'HTML' && element.tagName !== 'BODY') {
            const selector = element.tagName.toLowerCase() + 
              (element.id ? `#${element.id}` : '') + 
              (element.className && typeof element.className === 'string' ? `.${element.className.split(' ').join('.')}` : '');
            
            overflowElements.push({
              selector,
              rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
              scrollWidth
            });
          }
        });
        
        return overflowElements.slice(0, 5); // Limit to first 5 issues
      }
      
      return [];
    });
    
    horizontalOverflow.forEach(overflow => {
      issues.push({
        type: 'overflow',
        element: overflow.selector,
        description: `Element extends beyond viewport width (${overflow.rect.width}px vs ${viewport.split('x')[0]}px)`,
        location: overflow.rect,
        severity: 'high'
      });
    });
    
    // Check for element overlaps
    const overlaps = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*')).filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && 
               !['HTML', 'BODY', 'SCRIPT', 'STYLE', 'META', 'HEAD', 'TITLE'].includes(el.tagName);
      });
      
      const overlapIssues: Array<{
        element1: string;
        element2: string;
        rect1: { x: number; y: number; width: number; height: number };
        rect2: { x: number; y: number; width: number; height: number };
      }> = [];
      
      for (let i = 0; i < elements.length && overlapIssues.length < 10; i++) {
        for (let j = i + 1; j < elements.length && overlapIssues.length < 10; j++) {
          const el1 = elements[i];
          const el2 = elements[j];
          
          // Skip if one element contains the other
          if (el1.contains(el2) || el2.contains(el1)) continue;
          
          const rect1 = el1.getBoundingClientRect();
          const rect2 = el2.getBoundingClientRect();
          
          // Check for overlap
          if (rect1.left < rect2.right && rect2.left < rect1.right &&
              rect1.top < rect2.bottom && rect2.top < rect1.bottom) {
            
            const getSelector = (element: Element) => {
              const tag = element.tagName.toLowerCase();
              const id = element.id ? `#${element.id}` : '';
              let classes = '';
              try {
                if (element.className && typeof element.className === 'string') {
                  classes = `.${element.className.split(' ').filter(c => c).slice(0, 2).join('.')}`;
                }
              } catch (e) {
                // Handle non-string className or other errors
              }
              return `${tag}${id}${classes}`;
            };
            
            overlapIssues.push({
              element1: getSelector(el1),
              element2: getSelector(el2),
              rect1: { x: rect1.x, y: rect1.y, width: rect1.width, height: rect1.height },
              rect2: { x: rect2.x, y: rect2.y, width: rect2.width, height: rect2.height }
            });
          }
        }
      }
      
      return overlapIssues;
    });
    
    overlaps.forEach(overlap => {
      issues.push({
        type: 'overlap',
        element: `${overlap.element1} & ${overlap.element2}`,
        description: `Elements are overlapping`,
        location: overlap.rect1,
        severity: 'high'
      });
    });
    
    // Check for inconsistent spacing in grids and card layouts
    const spacingIssues = await page.evaluate(() => {
      const spacingProblems: Array<{
        container: string;
        description: string;
        rect: { x: number; y: number; width: number; height: number };
      }> = [];
      
      // Check grid containers
      const gridContainers = document.querySelectorAll('[class*="grid"], [class*="feature-grid"], [class*="package-grid"]');
      
      gridContainers.forEach(container => {
        const children = Array.from(container.children).filter(child => {
          const rect = child.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        });
        
        if (children.length > 1) {
          const gaps: number[] = [];
          const containerRect = container.getBoundingClientRect();
          
          for (let i = 0; i < children.length - 1; i++) {
            const rect1 = children[i].getBoundingClientRect();
            const rect2 = children[i + 1].getBoundingClientRect();
            
            // Calculate horizontal gap
            if (rect1.top === rect2.top) { // Same row
              const gap = rect2.left - rect1.right;
              gaps.push(gap);
            }
          }
          
          // Check if gaps are consistent (within 5px tolerance)
          if (gaps.length > 1) {
            const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;
            const inconsistentGaps = gaps.filter(gap => Math.abs(gap - avgGap) > 5);
            
            if (inconsistentGaps.length > 0) {
              const selector = container.tagName.toLowerCase() + 
                (container.id ? `#${container.id}` : '') + 
                (container.className && typeof container.className === 'string' ? `.${container.className.split(' ').slice(0, 2).join('.')}` : '');
              
              spacingProblems.push({
                container: selector,
                description: `Inconsistent spacing in grid layout (gaps vary by ${Math.max(...gaps) - Math.min(...gaps)}px)`,
                rect: { x: containerRect.x, y: containerRect.y, width: containerRect.width, height: containerRect.height }
              });
            }
          }
        }
      });
      
      return spacingProblems;
    });
    
    spacingIssues.forEach(spacing => {
      issues.push({
        type: 'spacing',
        element: spacing.container,
        description: spacing.description,
        location: spacing.rect,
        severity: 'medium'
      });
    });
    
    // Check for text that's cut off or improperly wrapped
    const textIssues = await page.evaluate(() => {
      const textProblems: Array<{
        element: string;
        description: string;
        rect: { x: number; y: number; width: number; height: number };
      }> = [];
      
      document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div').forEach(element => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        
        // Skip hidden or very small elements
        if (rect.width < 10 || rect.height < 10 || style.display === 'none') return;
        
        // Check if text is overflowing
        if (element.scrollWidth > element.clientWidth + 2) { // 2px tolerance
          const selector = element.tagName.toLowerCase() + 
            (element.id ? `#${element.id}` : '') + 
            (element.className && typeof element.className === 'string' ? `.${element.className.split(' ').slice(0, 2).join('.')}` : '');
          
          textProblems.push({
            element: selector,
            description: `Text content overflowing container (${element.scrollWidth}px content in ${element.clientWidth}px container)`,
            rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
          });
        }
      });
      
      return textProblems.slice(0, 5); // Limit results
    });
    
    textIssues.forEach(textIssue => {
      issues.push({
        type: 'overflow',
        element: textIssue.element,
        description: textIssue.description,
        location: textIssue.rect,
        severity: 'medium'
      });
    });
    
    // Check for minimum touch target sizes on mobile
    if (viewport.includes('Mobile')) {
      const touchTargetIssues = await page.evaluate(() => {
        const touchIssues: Array<{
          element: string;
          description: string;
          rect: { x: number; y: number; width: number; height: number };
        }> = [];
        
        document.querySelectorAll('button, a, input, select, textarea, [role="button"], [onclick]').forEach(element => {
          const rect = element.getBoundingClientRect();
          
          // Check if touch target is too small (minimum 44px x 44px recommended)
          if ((rect.width > 0 && rect.width < 44) || (rect.height > 0 && rect.height < 44)) {
            const selector = element.tagName.toLowerCase() + 
              (element.id ? `#${element.id}` : '') + 
              (element.className && typeof element.className === 'string' ? `.${element.className.split(' ').slice(0, 2).join('.')}` : '');
            
            touchIssues.push({
              element: selector,
              description: `Touch target too small: ${rect.width.toFixed(0)}x${rect.height.toFixed(0)}px (min 44x44px recommended)`,
              rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
            });
          }
        });
        
        return touchIssues.slice(0, 5);
      });
      
      touchTargetIssues.forEach(touchIssue => {
        issues.push({
          type: 'responsive',
          element: touchIssue.element,
          description: touchIssue.description,
          location: touchIssue.rect,
          severity: 'medium'
        });
      });
    }
    
  } catch (error) {
    console.error(`❌ Error auditing layout for ${pageName} on ${viewport}:`, error);
    issues.push({
      type: 'responsive',
      element: 'page',
      description: `Failed to complete layout audit: ${error.message}`,
      location: { x: 0, y: 0, width: 0, height: 0 },
      severity: 'high'
    });
  }
  
  // Calculate score based on issues (100 - penalty for each issue)
  const severityPenalties = { critical: 25, high: 15, medium: 8, low: 3 };
  const totalPenalty = issues.reduce((sum, issue) => sum + severityPenalties[issue.severity], 0);
  const score = Math.max(0, 100 - totalPenalty);
  
  if (issues.length > 0) {
    console.log(`❌ Found ${issues.length} layout issues on ${pageName} (${viewport})`);
    issues.slice(0, 3).forEach(issue => {
      console.log(`  - ${issue.type}: ${issue.element} - ${issue.description}`);
    });
  } else {
    console.log(`✅ No significant layout issues found on ${pageName} (${viewport})`);
  }
  
  return {
    pageName,
    viewport,
    issues,
    score
  };
}

test('Comprehensive Layout and Padding Consistency Audit', async ({ browser }) => {
  const auditResults: PageAuditResult[] = [];
  
  for (const viewport of VIEWPORT_SIZES) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height }
    });
    
    const page = await context.newPage();
    
    // Navigate to localhost (assuming dev server is running)
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    for (const pageInfo of PAGES_TO_AUDIT) {
      try {
        await page.goto(`http://localhost:3000${pageInfo.path}`, { 
          waitUntil: 'networkidle',
          timeout: 30000
        });
        
        const result = await auditPageLayout(page, pageInfo.name, `${viewport.name} (${viewport.width}x${viewport.height})`);
        auditResults.push(result);
        
      } catch (error) {
        console.error(`❌ Error testing ${pageInfo.name} on ${viewport.name}:`, error);
        auditResults.push({
          pageName: pageInfo.name,
          viewport: `${viewport.name} (${viewport.width}x${viewport.height})`,
          issues: [{
            type: 'responsive',
            element: 'page',
            description: `Failed to load page: ${error.message}`,
            location: { x: 0, y: 0, width: 0, height: 0 },
            severity: 'critical'
          }],
          score: 0
        });
      }
    }
    
    await context.close();
  }
  
  // Generate summary report
  console.log('\n📊 LAYOUT CONSISTENCY AUDIT SUMMARY:');
  
  const pageScores = new Map<string, number[]>();
  const viewportScores = new Map<string, number[]>();
  let totalIssues = 0;
  
  auditResults.forEach(result => {
    if (!pageScores.has(result.pageName)) {
      pageScores.set(result.pageName, []);
    }
    pageScores.get(result.pageName)!.push(result.score);
    
    if (!viewportScores.has(result.viewport)) {
      viewportScores.set(result.viewport, []);
    }
    viewportScores.get(result.viewport)!.push(result.score);
    
    totalIssues += result.issues.length;
  });
  
  console.log(`\n🎯 Overall Results:`);
  console.log(`• Total issues found: ${totalIssues}`);
  console.log(`• Pages tested: ${PAGES_TO_AUDIT.length}`);
  console.log(`• Viewports tested: ${VIEWPORT_SIZES.length}`);
  
  console.log(`\n📱 Performance by Viewport:`);
  viewportScores.forEach((scores, viewport) => {
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    console.log(`• ${viewport}: ${avgScore.toFixed(1)}/100`);
  });
  
  console.log(`\n📄 Performance by Page:`);
  pageScores.forEach((scores, pageName) => {
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    console.log(`• ${pageName}: ${avgScore.toFixed(1)}/100`);
  });
  
  // Show critical issues
  const criticalIssues = auditResults.filter(result => 
    result.issues.some(issue => issue.severity === 'critical' || issue.severity === 'high')
  );
  
  if (criticalIssues.length > 0) {
    console.log(`\n🚨 Critical/High Priority Issues:`);
    criticalIssues.forEach(result => {
      const highPriorityIssues = result.issues.filter(issue => 
        issue.severity === 'critical' || issue.severity === 'high'
      );
      
      console.log(`\n${result.pageName} (${result.viewport}):`);
      highPriorityIssues.slice(0, 3).forEach(issue => {
        console.log(`  • ${issue.type}: ${issue.element}`);
        console.log(`    ${issue.description}`);
      });
    });
  }
  
  // Calculate overall health score
  const overallScore = auditResults.reduce((sum, result) => sum + result.score, 0) / auditResults.length;
  console.log(`\n🏆 Overall Layout Health Score: ${overallScore.toFixed(1)}/100`);
  
  // Set expectations for CI
  const highPriorityIssuesCount = auditResults.reduce((sum, result) => 
    sum + result.issues.filter(issue => issue.severity === 'critical' || issue.severity === 'high').length, 0
  );
  
  // Allow some minor issues but fail if there are too many critical/high priority problems
  expect(highPriorityIssuesCount).toBeLessThan(15); // Adjust threshold as needed
  expect(overallScore).toBeGreaterThan(65); // Minimum acceptable score
});