import { test, expect } from '@playwright/test';

test('Homepage buttons quick check', async ({ page }) => {
  console.log('🔍 Testing homepage buttons...');
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Check for buttons with new classes
  const buttons = page.locator('.btn');
  const buttonCount = await buttons.count();
  console.log(`  🔘 Found ${buttonCount} .btn buttons`);
  
  // Check specific buttons
  const getStartedBtn = page.locator('text="Get Started"');
  const viewServicesBtn = page.locator('text="View Services"');
  
  if (await getStartedBtn.isVisible()) {
    console.log('  ✅ "Get Started" button is visible');
  } else {
    console.log('  ❌ "Get Started" button not visible');
  }
  
  if (await viewServicesBtn.isVisible()) {
    console.log('  ✅ "View Services" button is visible');
  } else {
    console.log('  ❌ "View Services" button not visible');
  }

  // Check button styles
  for (let i = 0; i < Math.min(buttonCount, 4); i++) {
    const button = buttons.nth(i);
    if (await button.isVisible()) {
      const buttonText = await button.textContent();
      const buttonStyles = await button.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          padding: `${styles.paddingTop} ${styles.paddingRight} ${styles.paddingBottom} ${styles.paddingLeft}`,
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          border: styles.border
        };
      });
      console.log(`  🔘 Button "${buttonText?.trim()}":`, buttonStyles);
    }
  }
  
  console.log('✅ Homepage buttons test complete');
});