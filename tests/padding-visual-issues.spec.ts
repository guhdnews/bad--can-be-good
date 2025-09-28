import { test, expect, Page } from '@playwright/test';

test.describe('Padding and Visual Layout Issues Detection', () => {
  
  test('Homepage - Detect and analyze padding inconsistencies', async ({ page }) => {
    await page.goto('http://localhost:3000');
    console.log('🔍 Analyzing homepage padding and visual consistency...');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Check section padding consistency
    const paddingIssues = await page.evaluate(() => {
      const sections = document.querySelectorAll('section');
      const issues = [];
      const expectedPaddings = {
        'hero-section': { top: '120px', bottom: '120px' },
        'main-section': { top: '80px', bottom: '80px' },
        'section--black': { top: '80px', bottom: '80px' },
        'cta-section': { top: '100px', bottom: '100px' }
      };
      
      sections.forEach((section, index) => {
        const styles = getComputedStyle(section);
        const classList = Array.from(section.classList);
        
        const paddingTop = styles.paddingTop;
        const paddingBottom = styles.paddingBottom;
        const paddingLeft = styles.paddingLeft;
        const paddingRight = styles.paddingRight;
        
        // Check for asymmetric horizontal padding
        if (paddingLeft !== paddingRight) {
          issues.push({
            type: 'asymmetric-horizontal-padding',
            element: `section[${index}]`,
            classes: classList,
            paddingLeft,
            paddingRight
          });
        }
        
        // Check for zero padding where it shouldn't be
        if (paddingTop === '0px' || paddingBottom === '0px') {
          issues.push({
            type: 'missing-vertical-padding',
            element: `section[${index}]`,
            classes: classList,
            paddingTop,
            paddingBottom
          });
        }
        
        // Check container padding
        const container = section.querySelector('.container');
        if (container) {
          const containerStyles = getComputedStyle(container);
          const containerPaddingLeft = containerStyles.paddingLeft;
          const containerPaddingRight = containerStyles.paddingRight;
          
          if (containerPaddingLeft !== containerPaddingRight) {
            issues.push({
              type: 'container-asymmetric-padding',
              element: `section[${index}] .container`,
              classes: classList,
              containerPaddingLeft,
              containerPaddingRight
            });
          }
        }
      });
      
      return issues;
    });
    
    console.log('📋 Padding Issues Found:', paddingIssues);
    
    // Check card spacing consistency
    const cardIssues = await page.evaluate(() => {
      const cards = document.querySelectorAll('.card, .premium-card');
      const issues = [];
      
      cards.forEach((card, index) => {
        const styles = getComputedStyle(card);
        const padding = styles.padding;
        const margin = styles.margin;
        
        // Check for inconsistent card padding
        const paddingValues = padding.split(' ');
        if (paddingValues.length > 1 && paddingValues[0] !== paddingValues[2]) {
          issues.push({
            type: 'card-inconsistent-padding',
            element: `card[${index}]`,
            padding: padding
          });
        }
        
        // Check for proper spacing between cards
        const rect = card.getBoundingClientRect();
        const nextCard = cards[index + 1];
        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          const gap = nextRect.top - rect.bottom;
          
          if (gap < 16) { // Less than 1rem spacing
            issues.push({
              type: 'insufficient-card-spacing',
              element: `card[${index}] to card[${index + 1}]`,
              gap: gap + 'px'
            });
          }
        }
      });
      
      return issues;
    });
    
    console.log('🃏 Card Issues Found:', cardIssues);
    
    // Check mobile responsiveness issues
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    const mobileIssues = await page.evaluate(() => {
      const issues = [];
      
      // Check for horizontal overflow
      const body = document.body;
      if (body.scrollWidth > body.clientWidth) {
        issues.push({
          type: 'horizontal-overflow',
          scrollWidth: body.scrollWidth,
          clientWidth: body.clientWidth
        });
      }
      
      // Check for elements extending beyond viewport
      const elements = document.querySelectorAll('*');
      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.right > window.innerWidth + 5) { // 5px tolerance
          issues.push({
            type: 'element-overflow',
            element: element.tagName + (element.className ? `.${element.className.split(' ')[0]}` : ''),
            right: rect.right,
            viewportWidth: window.innerWidth
          });
        }
      });
      
      return issues;
    });
    
    console.log('📱 Mobile Issues Found:', mobileIssues);
    
    // Reset viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Report findings
    const totalIssues = paddingIssues.length + cardIssues.length + mobileIssues.length;
    console.log(`🎯 Total Visual Issues Detected: ${totalIssues}`);
    
    if (totalIssues > 0) {
      console.log('⚠️  VISUAL ISSUES FOUND - These need to be addressed for enterprise-grade quality');
    } else {
      console.log('✅ No major visual issues detected');
    }
    
    // Store issues for fixing
    if (totalIssues > 0) {
      const allIssues = {
        padding: paddingIssues,
        cards: cardIssues,
        mobile: mobileIssues
      };
      
      // Write issues to console for debugging
      console.log('📄 Detailed Issues Report:', JSON.stringify(allIssues, null, 2));
    }
  });
  
  test('All pages - Cross-page padding consistency check', async ({ page }) => {
    const pages = ['/', '/about', '/services', '/packages', '/contact', '/faq'];
    const crossPageIssues = [];
    
    for (const pagePath of pages) {
      await page.goto(`http://localhost:3000${pagePath}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      const pageIssues = await page.evaluate((currentPage) => {
        const issues = [];
        
        // Check header consistency
        const header = document.querySelector('header');
        if (header) {
          const headerStyles = getComputedStyle(header);
          issues.push({
            page: currentPage,
            element: 'header',
            padding: headerStyles.padding,
            margin: headerStyles.margin
          });
        }
        
        // Check footer consistency
        const footer = document.querySelector('footer');
        if (footer) {
          const footerStyles = getComputedStyle(footer);
          issues.push({
            page: currentPage,
            element: 'footer',
            padding: footerStyles.padding,
            margin: footerStyles.margin
          });
        }
        
        // Check main container consistency
        const mainContainer = document.querySelector('.container');
        if (mainContainer) {
          const containerStyles = getComputedStyle(mainContainer);
          issues.push({
            page: currentPage,
            element: '.container',
            padding: containerStyles.padding,
            margin: containerStyles.margin,
            maxWidth: containerStyles.maxWidth
          });
        }
        
        return issues;
      }, pagePath);
      
      crossPageIssues.push(...pageIssues);
    }
    
    console.log('🔄 Cross-page consistency analysis:', crossPageIssues);
    
    // Analyze consistency across pages
    const headerPaddings = crossPageIssues.filter(i => i.element === 'header').map(i => i.padding);
    const footerPaddings = crossPageIssues.filter(i => i.element === 'footer').map(i => i.padding);
    const containerPaddings = crossPageIssues.filter(i => i.element === '.container').map(i => i.padding);
    
    const uniqueHeaderPaddings = [...new Set(headerPaddings)];
    const uniqueFooterPaddings = [...new Set(footerPaddings)];
    const uniqueContainerPaddings = [...new Set(containerPaddings)];
    
    console.log('📊 Consistency Report:');
    console.log(`Header padding variations: ${uniqueHeaderPaddings.length > 1 ? 'INCONSISTENT' : 'CONSISTENT'}`);
    console.log(`Footer padding variations: ${uniqueFooterPaddings.length > 1 ? 'INCONSISTENT' : 'CONSISTENT'}`);
    console.log(`Container padding variations: ${uniqueContainerPaddings.length > 1 ? 'INCONSISTENT' : 'CONSISTENT'}`);
    
    if (uniqueHeaderPaddings.length > 1) {
      console.log('⚠️  Header padding inconsistencies:', uniqueHeaderPaddings);
    }
    if (uniqueFooterPaddings.length > 1) {
      console.log('⚠️  Footer padding inconsistencies:', uniqueFooterPaddings);
    }
    if (uniqueContainerPaddings.length > 1) {
      console.log('⚠️  Container padding inconsistencies:', uniqueContainerPaddings);
    }
  });
  
  test('Visual regression - Element alignment and spacing', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    const alignmentIssues = await page.evaluate(() => {
      const issues = [];
      
      // Check button alignment in CTA sections
      const ctaSections = document.querySelectorAll('.cta-section, .hero-section');
      ctaSections.forEach((section, index) => {
        const buttons = section.querySelectorAll('.btn');
        if (buttons.length > 1) {
          const firstButtonRect = buttons[0].getBoundingClientRect();
          const secondButtonRect = buttons[1].getBoundingClientRect();
          
          // Check if buttons are properly aligned
          const verticalAlignment = Math.abs(firstButtonRect.top - secondButtonRect.top);
          if (verticalAlignment > 2) { // 2px tolerance
            issues.push({
              type: 'button-misalignment',
              section: `cta-section[${index}]`,
              verticalDifference: verticalAlignment + 'px'
            });
          }
        }
      });
      
      // Check grid alignment
      const grids = document.querySelectorAll('.feature-grid');
      grids.forEach((grid, index) => {
        const gridItems = grid.children;
        if (gridItems.length > 2) {
          const firstItemRect = gridItems[0].getBoundingClientRect();
          const secondItemRect = gridItems[1].getBoundingClientRect();
          
          // Check if grid items have consistent heights
          const heightDifference = Math.abs(firstItemRect.height - secondItemRect.height);
          if (heightDifference > 10) { // 10px tolerance
            issues.push({
              type: 'grid-height-inconsistency',
              grid: `feature-grid[${index}]`,
              heightDifference: heightDifference + 'px'
            });
          }
        }
      });
      
      return issues;
    });
    
    console.log('📐 Alignment Issues Found:', alignmentIssues);
    
    // Check text spacing and typography
    const typographyIssues = await page.evaluate(() => {
      const issues = [];
      
      // Check heading spacing
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((heading, index) => {
        const styles = getComputedStyle(heading);
        const lineHeight = parseFloat(styles.lineHeight);
        const fontSize = parseFloat(styles.fontSize);
        
        // Check line-height ratio
        const lineHeightRatio = lineHeight / fontSize;
        if (lineHeightRatio < 1.2 || lineHeightRatio > 1.8) {
          issues.push({
            type: 'heading-line-height',
            element: heading.tagName.toLowerCase(),
            lineHeightRatio: lineHeightRatio.toFixed(2)
          });
        }
      });
      
      // Check paragraph spacing
      const paragraphs = document.querySelectorAll('p');
      paragraphs.forEach((p, index) => {
        const styles = getComputedStyle(p);
        const marginBottom = parseFloat(styles.marginBottom);
        const fontSize = parseFloat(styles.fontSize);
        
        // Check if paragraph spacing is appropriate
        const spacingRatio = marginBottom / fontSize;
        if (spacingRatio < 0.5 || spacingRatio > 2) {
          issues.push({
            type: 'paragraph-spacing',
            element: `p[${index}]`,
            spacingRatio: spacingRatio.toFixed(2)
          });
        }
      });
      
      return issues;
    });
    
    console.log('📝 Typography Issues Found:', typographyIssues);
    
    const totalVisualIssues = alignmentIssues.length + typographyIssues.length;
    console.log(`🎨 Total Visual Quality Issues: ${totalVisualIssues}`);
    
    if (totalVisualIssues === 0) {
      console.log('✅ Enterprise-grade visual quality achieved!');
    } else {
      console.log('⚠️  Visual issues need attention for enterprise-grade quality');
    }
  });
});