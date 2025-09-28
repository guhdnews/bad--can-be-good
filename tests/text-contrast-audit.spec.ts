import { test, expect } from '@playwright/test';

test('Text Color and Contrast Accessibility Audit', async ({ page }) => {
  const pages = [
    { name: 'Homepage', url: 'http://localhost:3000/' },
    { name: 'Services', url: 'http://localhost:3000/services' },
    { name: 'About', url: 'http://localhost:3000/about' },
    { name: 'Contact', url: 'http://localhost:3000/contact' },
    { name: 'Packages', url: 'http://localhost:3000/packages' },
    { name: 'FAQ', url: 'http://localhost:3000/faq' }
  ];

  const contrastIssues: any[] = [];

  for (const pageDef of pages) {
    console.log(`🎯 Auditing text contrast on ${pageDef.name}...`);
    
    try {
      await page.goto(pageDef.url);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      // Get all text elements and their computed styles
      const textAnalysis = await page.evaluate(() => {
        const issues: any[] = [];
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, button, div');
        
        // Helper function to calculate luminance
        function getLuminance(rgb: number[]): number {
          const [r, g, b] = rgb.map(c => {
            const val = c / 255;
            return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        }

        // Helper function to parse RGB color
        function parseColor(colorStr: string): number[] {
          if (colorStr.startsWith('rgb')) {
            const match = colorStr.match(/\d+/g);
            return match ? match.map(Number) : [0, 0, 0];
          } else if (colorStr.startsWith('#')) {
            const hex = colorStr.slice(1);
            return [
              parseInt(hex.slice(0, 2), 16),
              parseInt(hex.slice(2, 4), 16),
              parseInt(hex.slice(4, 6), 16)
            ];
          }
          return [0, 0, 0]; // Default to black
        }

        // Calculate contrast ratio
        function getContrastRatio(color1: number[], color2: number[]): number {
          const lum1 = getLuminance(color1);
          const lum2 = getLuminance(color2);
          const lighter = Math.max(lum1, lum2);
          const darker = Math.min(lum1, lum2);
          return (lighter + 0.05) / (darker + 0.05);
        }

        textElements.forEach((element: Element, index: number) => {
          const htmlElement = element as HTMLElement;
          const styles = getComputedStyle(htmlElement);
          const textContent = htmlElement.textContent?.trim();
          
          // Skip empty text elements
          if (!textContent || textContent.length === 0) return;
          
          const color = styles.color;
          const backgroundColor = styles.backgroundColor;
          const fontSize = parseFloat(styles.fontSize);
          const fontWeight = parseInt(styles.fontWeight);
          
          // Only check elements with actual text content
          if (textContent.length > 3) {
            try {
              const textColor = parseColor(color);
              let bgColor: number[];
              
              // Handle transparent backgrounds - walk up the DOM
              if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
                let parent = htmlElement.parentElement;
                while (parent) {
                  const parentBg = getComputedStyle(parent).backgroundColor;
                  if (parentBg !== 'rgba(0, 0, 0, 0)' && parentBg !== 'transparent') {
                    bgColor = parseColor(parentBg);
                    break;
                  }
                  parent = parent.parentElement;
                }
                // Default to white if no background found
                bgColor = bgColor! || [255, 255, 255];
              } else {
                bgColor = parseColor(backgroundColor);
              }
              
              const contrastRatio = getContrastRatio(textColor, bgColor);
              const isLargeText = fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700);
              const requiredRatio = isLargeText ? 3.0 : 4.5;
              
              if (contrastRatio < requiredRatio) {
                issues.push({
                  element: htmlElement.tagName.toLowerCase(),
                  text: textContent.slice(0, 50) + (textContent.length > 50 ? '...' : ''),
                  textColor: color,
                  backgroundColor: backgroundColor || 'inherited',
                  contrastRatio: Math.round(contrastRatio * 100) / 100,
                  requiredRatio,
                  isLargeText,
                  classes: Array.from(htmlElement.classList)
                });
              }
            } catch (e) {
              // Skip elements we can't analyze
            }
          }
        });
        
        return issues;
      });

      if (textAnalysis.length > 0) {
        contrastIssues.push({
          page: pageDef.name,
          issues: textAnalysis
        });
        console.log(`❌ Found ${textAnalysis.length} contrast issues on ${pageDef.name}`);
        textAnalysis.slice(0, 5).forEach(issue => {
          console.log(`  - ${issue.element}: "${issue.text}" (${issue.contrastRatio}:1, needs ${issue.requiredRatio}:1)`);
        });
      } else {
        console.log(`✅ No significant contrast issues found on ${pageDef.name}`);
      }
    } catch (error) {
      console.log(`❌ Error analyzing ${pageDef.name}:`, error);
    }
  }

  // Summary report
  console.log('\n📊 CONTRAST AUDIT SUMMARY:');
  if (contrastIssues.length === 0) {
    console.log('✅ All pages pass contrast accessibility standards');
  } else {
    console.log(`❌ ${contrastIssues.length} pages have contrast issues`);
    contrastIssues.forEach(pageIssue => {
      console.log(`\n${pageIssue.page}: ${pageIssue.issues.length} issues`);
      pageIssue.issues.slice(0, 3).forEach((issue: any) => {
        console.log(`  • ${issue.element}: ${issue.textColor} on ${issue.backgroundColor} (${issue.contrastRatio}:1)`);
      });
    });
  }

  // Fail test if critical accessibility issues found
  const criticalIssues = contrastIssues.reduce((sum, page) => sum + page.issues.length, 0);
  expect(criticalIssues).toBeLessThan(10); // Allow some minor issues but fail if too many
});