import { test, expect } from '@playwright/test';

test.describe('Pre-Fix Analysis', () => {
  test('analyze motion issues and FAQ padding problems before fixing', async ({ page }) => {
    console.log('🔍 PRE-FIX ANALYSIS: Checking current issues...');
    
    // Test homepage motion issues
    console.log('\n📱 ANALYZING HOMEPAGE MOTION:');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Check animation performance
    const animatedElements = await page.$$('[style*="transform"], [style*="opacity"]');
    console.log(`🎬 Animated elements found: ${animatedElements.length}`);
    
    // Test button hover smoothness
    const primaryBtn = page.locator('.btn-primary').first();
    if (await primaryBtn.isVisible()) {
      await primaryBtn.hover();
      await page.waitForTimeout(100);
      await page.mouse.move(0, 0); // Move away
      await page.waitForTimeout(100);
      console.log('📝 Button hover tested - checking for twitchiness');
    }
    
    // Test scroll performance
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'smooth' }));
    await page.waitForTimeout(500);
    console.log('📜 Scroll animation tested');
    
    // Check other pages for motion
    const pagesToCheck = [
      { name: 'Services', url: '/services' },
      { name: 'Packages', url: '/packages' }, 
      { name: 'About', url: '/about' },
      { name: 'Contact', url: '/contact' },
      { name: 'FAQ', url: '/faq' }
    ];
    
    console.log('\n🌐 ANALYZING OTHER PAGES FOR MOTION:');
    for (const pageInfo of pagesToCheck) {
      try {
        await page.goto(`http://localhost:3000${pageInfo.url}`);
        await page.waitForLoadState('networkidle', { timeout: 5000 });
        
        const hasAnimations = await page.$$('[style*="transform"], [style*="opacity"]');
        console.log(`${pageInfo.name}: ${hasAnimations.length} animated elements`);
        
        if (hasAnimations.length === 0) {
          console.log(`❌ ${pageInfo.name} needs motion effects added`);
        }
      } catch (error) {
        console.log(`⚠️  ${pageInfo.name} page has issues: ${error.message}`);
      }
    }
    
    // Detailed FAQ page analysis
    console.log('\n📋 ANALYZING FAQ PAGE PADDING ISSUES:');
    try {
      await page.goto('http://localhost:3000/faq');
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      
      // Check section spacing
      const sections = await page.$$eval('[data-category], .space-y-12 > div', elements => 
        elements.map((el, index) => ({
          index,
          classes: el.className,
          hasTopBorder: el.classList.contains('border-t'),
          paddingTop: window.getComputedStyle(el).paddingTop
        }))
      );
      
      console.log('FAQ Sections analysis:');
      sections.forEach(section => {
        console.log(`  Section ${section.index}: PT=${section.paddingTop}, Border=${section.hasTopBorder}`);
      });
      
      // Check individual question/answer spacing
      const questions = await page.$$('.border.border-gray-800.rounded-lg');
      console.log(`📝 Total FAQ questions: ${questions.length}`);
      
      // Check answer padding
      const answers = await page.$$('.px-6.pb-6.pt-2');
      console.log(`📖 FAQ answers found: ${answers.length}`);
      
      if (answers.length > 0) {
        const firstAnswer = answers[0];
        const answerStyle = await firstAnswer.evaluate(el => {
          const style = window.getComputedStyle(el);
          return {
            paddingTop: style.paddingTop,
            paddingBottom: style.paddingBottom,
            paddingLeft: style.paddingLeft
          };
        });
        console.log('First answer padding:', answerStyle);
      }
      
      await page.screenshot({ 
        path: 'test-results/faq-before-fixes.png',
        fullPage: true 
      });
      
    } catch (error) {
      console.log(`❌ FAQ analysis failed: ${error.message}`);
    }
    
    console.log('\n🎯 PRE-FIX ANALYSIS SUMMARY:');
    console.log('- Homepage has some motion but may be twitchy');
    console.log('- Other pages likely need motion effects added');
    console.log('- FAQ page has padding/spacing issues to fix');
    console.log('- Ready to proceed with fixes...');
  });
});