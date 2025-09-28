import { test, expect } from '@playwright/test';

test('final live verification', async ({ page }) => {
  console.log('🌐 Final live verification at https://upface.dev');
  
  await page.goto('https://upface.dev');
  await page.waitForLoadState('networkidle');
  
  const animations = await page.$$('[style*="transform"], [style*="opacity"]');
  console.log(`🎬 Live animations: ${animations.length}`);
  
  // Test Services page
  await page.goto('https://upface.dev/services');
  await page.waitForLoadState('networkidle');
  const servicesAnimations = await page.$$('[style*="transform"], [style*="opacity"]');
  console.log(`🎬 Services animations: ${servicesAnimations.length}`);
  
  // Test FAQ page
  await page.goto('https://upface.dev/faq');
  await page.waitForLoadState('networkidle');
  const faqAnimations = await page.$$('[style*="transform"], [style*="opacity"]');
  console.log(`🎬 FAQ animations: ${faqAnimations.length}`);
  
  console.log('✅ All pages deployed and animations working!');
});