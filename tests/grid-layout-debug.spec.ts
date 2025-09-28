import { test, expect, Page } from '@playwright/test';

test.describe('Grid Layout Debug Analysis', () => {
  
  test('Diagnose actual card grid positioning', async ({ page }) => {
    await page.goto('http://localhost:3000');
    console.log('🔧 Starting detailed grid layout diagnosis...');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Get detailed information about each card's positioning
    const cardAnalysis = await page.evaluate(() => {
      const cards = document.querySelectorAll('.card, .premium-card');
      const cardData = [];
      
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const styles = getComputedStyle(card);
        const parent = card.parentElement;
        const parentStyles = parent ? getComputedStyle(parent) : null;
        
        cardData.push({
          index,
          element: card.tagName + '.' + Array.from(card.classList).join('.'),
          position: {
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height
          },
          styles: {
            position: styles.position,
            display: styles.display,
            flexDirection: styles.flexDirection,
            margin: styles.margin,
            padding: styles.padding,
            transform: styles.transform
          },
          parent: parent ? {
            tagName: parent.tagName,
            classes: Array.from(parent.classList),
            display: parentStyles?.display,
            gridTemplateColumns: parentStyles?.gridTemplateColumns,
            gap: parentStyles?.gap,
            justifyItems: parentStyles?.justifyItems,
            alignItems: parentStyles?.alignItems
          } : null
        });
      });
      
      return cardData;
    });
    
    console.log('📋 Card Positioning Analysis:');
    cardAnalysis.forEach((card, index) => {
      console.log(`Card ${index}:`, {
        element: card.element,
        position: card.position,
        parentGrid: card.parent
      });
      
      // Check for overlaps with next card
      if (index < cardAnalysis.length - 1) {
        const nextCard = cardAnalysis[index + 1];
        const gap = nextCard.position.top - card.position.bottom;
        console.log(`  Gap to next card: ${gap}px`);
        
        if (gap < 0) {
          console.log(`  ⚠️  OVERLAP DETECTED: ${Math.abs(gap)}px`);
        }
      }
    });
    
    // Analyze grid containers
    const gridContainers = await page.evaluate(() => {
      const grids = document.querySelectorAll('.feature-grid, .services-grid, .package-grid');
      const gridData = [];
      
      grids.forEach((grid, index) => {
        const styles = getComputedStyle(grid);
        const rect = grid.getBoundingClientRect();
        const children = Array.from(grid.children);
        
        gridData.push({
          index,
          classes: Array.from(grid.classList),
          position: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          },
          styles: {
            display: styles.display,
            gridTemplateColumns: styles.gridTemplateColumns,
            gap: styles.gap,
            justifyItems: styles.justifyItems,
            alignItems: styles.alignItems,
            gridAutoRows: styles.gridAutoRows
          },
          childCount: children.length,
          children: children.map(child => ({
            tagName: child.tagName,
            classes: Array.from(child.classList),
            rect: child.getBoundingClientRect()
          }))
        });
      });
      
      return gridData;
    });
    
    console.log('🔲 Grid Container Analysis:');
    gridContainers.forEach(grid => {
      console.log(`Grid ${grid.index}:`, grid);
    });
    
    // Check for StaggeredGrid component behavior
    const staggeredGridAnalysis = await page.evaluate(() => {
      const staggeredDivs = document.querySelectorAll('div:has(.premium-card)');
      const analysis = [];
      
      staggeredDivs.forEach((div, index) => {
        const styles = getComputedStyle(div);
        const children = Array.from(div.children);
        
        if (children.some(child => child.classList.contains('premium-card'))) {
          analysis.push({
            index,
            element: div.tagName,
            styles: {
              display: styles.display,
              position: styles.position,
              transform: styles.transform,
              zIndex: styles.zIndex
            },
            childrenCount: children.length,
            childPositions: children.map(child => {
              const rect = child.getBoundingClientRect();
              return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
            })
          });
        }
      });
      
      return analysis;
    });
    
    console.log('🎭 StaggeredGrid Component Analysis:');
    staggeredGridAnalysis.forEach(sg => {
      console.log(`StaggeredGrid ${sg.index}:`, sg);
    });
    
    // Summary of issues found - Group cards by grid container first
    const issues = [];
    const cardsByGrid = new Map();
    
    // Group cards by their grid container position
    cardAnalysis.forEach((card, index) => {
      const gridKey = `${card.parent?.tagName || 'unknown'}_${Math.floor(card.position.top / 100)}`;
      if (!cardsByGrid.has(gridKey)) {
        cardsByGrid.set(gridKey, []);
      }
      cardsByGrid.get(gridKey).push({ ...card, originalIndex: index });
    });
    
    // Only check overlaps within the same grid container
    for (const [gridKey, gridCards] of cardsByGrid.entries()) {
      console.log(`\n🔍 Checking overlaps in grid: ${gridKey} (${gridCards.length} cards)`);
      
      for (let i = 0; i < gridCards.length - 1; i++) {
        const current = gridCards[i];
        const next = gridCards[i + 1];
        
        // Check if cards are in same row (approximately same top position)
        if (Math.abs(current.position.top - next.position.top) < 5) {
          // Same row - check horizontal overlap
          const horizontalGap = next.position.left - current.position.right;
          if (horizontalGap < -10) { // Allow for small rounding errors
            console.log(`  ⚠️  HORIZONTAL OVERLAP: cards ${current.originalIndex} and ${next.originalIndex} (${Math.abs(horizontalGap)}px)`);
            issues.push({
              type: 'horizontal-overlap',
              cardIndex: current.originalIndex,
              nextCardIndex: next.originalIndex,
              overlapAmount: Math.abs(horizontalGap)
            });
          }
        } else {
          // Different rows - check vertical overlap  
          const verticalGap = next.position.top - current.position.bottom;
          if (verticalGap < -10) { // Allow for small rounding errors
            console.log(`  ⚠️  VERTICAL OVERLAP: cards ${current.originalIndex} and ${next.originalIndex} (${Math.abs(verticalGap)}px)`);
            issues.push({
              type: 'vertical-overlap',
              cardIndex: current.originalIndex,
              nextCardIndex: next.originalIndex,
              overlapAmount: Math.abs(verticalGap)
            });
          }
        }
      }
    }
    
    console.log(`\n🚨 TOTAL ISSUES FOUND: ${issues.length}`);
    if (issues.length > 0) {
      console.log('Issues:', issues);
    } else {
      console.log('✅ No card overlapping issues detected');
    }
    
    // Return analysis for potential fixes
    return {
      cardCount: cardAnalysis.length,
      gridCount: gridContainers.length,
      staggeredGridCount: staggeredGridAnalysis.length,
      overlapIssues: issues.length,
      analysis: {
        cards: cardAnalysis,
        grids: gridContainers,
        staggered: staggeredGridAnalysis
      }
    };
  });
  
  test('Check CSS specificity and computed styles', async ({ page }) => {
    await page.goto('http://localhost:3000');
    console.log('🎨 Checking CSS specificity and computed styles...');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Check h2 line-height issue
    const h2Analysis = await page.evaluate(() => {
      const h2Elements = document.querySelectorAll('h2');
      const h2Data = [];
      
      h2Elements.forEach((h2, index) => {
        const styles = getComputedStyle(h2);
        const fontSize = parseFloat(styles.fontSize);
        const lineHeight = parseFloat(styles.lineHeight);
        
        h2Data.push({
          index,
          text: h2.textContent?.slice(0, 50) + '...',
          fontSize: fontSize + 'px',
          lineHeight: lineHeight + 'px',
          lineHeightRatio: (lineHeight / fontSize).toFixed(3),
          fontFamily: styles.fontFamily,
          classes: Array.from(h2.classList)
        });
      });
      
      return h2Data;
    });
    
    console.log('📝 H2 Typography Analysis:');
    h2Analysis.forEach(h2 => {
      console.log(`H2 ${h2.index}: "${h2.text}"`);
      console.log(`  Line-height ratio: ${h2.lineHeightRatio} (should be 1.2-1.8)`);
      console.log(`  Font: ${h2.fontFamily}`);
      console.log(`  Classes: ${h2.classes.join(', ')}`);
      
      if (parseFloat(h2.lineHeightRatio) < 1.2) {
        console.log(`  ⚠️  LINE-HEIGHT TOO TIGHT`);
      }
    });
    
    // Check CSS custom properties
    const cssVariables = await page.evaluate(() => {
      const computedStyle = getComputedStyle(document.documentElement);
      const variables = {};
      
      // Check spacing variables
      const spacingVars = [
        '--fluid-space-xs', '--fluid-space-sm', '--fluid-space-md', 
        '--fluid-space-lg', '--fluid-space-xl', '--fluid-space-2xl'
      ];
      
      spacingVars.forEach(varName => {
        variables[varName] = computedStyle.getPropertyValue(varName).trim();
      });
      
      return variables;
    });
    
    console.log('🔧 CSS Custom Properties:', cssVariables);
  });
});