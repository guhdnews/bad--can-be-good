import { test, expect } from '@playwright/test';

test.describe('Mobile Menu Contrast Analysis', () => {
  test('analyze mobile menu toggle visibility and contrast', async ({ page }) => {
    console.log('🔍 ANALYZING MOBILE MENU TOGGLE CONTRAST...');
    
    // Test in mobile viewport
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Find mobile menu toggle
    const mobileToggle = page.locator('.mobile-menu-toggle').first();
    
    // Check if toggle is visible
    const isVisible = await mobileToggle.isVisible();
    console.log(`📱 Mobile toggle visible: ${isVisible}`);
    
    if (!isVisible) {
      console.log('❌ Mobile menu toggle is not visible!');
      return;
    }
    
    // Get toggle element properties
    const toggleStyles = await mobileToggle.evaluate(el => {
      const computed = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        border: computed.border,
        width: rect.width,
        height: rect.height,
        opacity: computed.opacity,
        visibility: computed.visibility,
        position: computed.position
      };
    });
    
    console.log('🎨 Mobile toggle styles:', toggleStyles);
    
    // Check parent/header background
    const headerStyles = await page.locator('.site-header').evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        backdropFilter: computed.backdropFilter,
        opacity: computed.opacity
      };
    });
    
    console.log('📋 Header styles:', headerStyles);
    
    // Test on different header states (scrolled/not scrolled)
    console.log('\n🔄 Testing header states...');
    
    // Initial state
    const initialHeaderClasses = await page.locator('.site-header').getAttribute('class');
    console.log('Initial header classes:', initialHeaderClasses);
    
    // Scroll down to change header state
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);
    
    const scrolledHeaderClasses = await page.locator('.site-header').getAttribute('class');
    console.log('Scrolled header classes:', scrolledHeaderClasses);
    
    // Get toggle styles after scroll
    const toggleStylesScrolled = await mobileToggle.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        opacity: computed.opacity
      };
    });
    
    console.log('🎨 Mobile toggle styles after scroll:', toggleStylesScrolled);
    
    // Test on different pages to check consistency
    const pages = ['/services', '/packages', '/about', '/contact'];
    
    for (const pagePath of pages) {
      console.log(`\n📄 Testing ${pagePath}...`);
      await page.goto(`http://localhost:3000${pagePath}`);
      await page.waitForLoadState('networkidle');
      
      const toggleVisible = await mobileToggle.isVisible();
      console.log(`Toggle visible on ${pagePath}: ${toggleVisible}`);
      
      if (toggleVisible) {
        const pageToggleStyles = await mobileToggle.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            backgroundColor: computed.backgroundColor,
            color: computed.color
          };
        });
        console.log(`Styles on ${pagePath}:`, pageToggleStyles);
      }
    }
    
    // Recommendations
    console.log('\n💡 CONTRAST RECOMMENDATIONS:');
    console.log('- If header is light: use dark toggle (black or dark gray)');
    console.log('- If header is dark: use light toggle (white or light gray)');
    console.log('- Consider adding background color for better contrast');
    console.log('- Ensure minimum 3:1 contrast ratio (4.5:1 preferred)');
  });

  test('analyze Apple iPhone Air page animations', async ({ page }) => {
    console.log('\n🍎 ANALYZING APPLE IPHONE AIR ANIMATIONS...');
    
    try {
      await page.goto('https://www.apple.com/iphone-air/', { timeout: 30000 });
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      
      console.log('📱 Apple page loaded successfully');
      
      // Analyze scroll-triggered animations
      const animatedElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        const animated = [];
        
        elements.forEach(el => {
          const computed = window.getComputedStyle(el);
          const hasTransition = computed.transition !== 'all 0s ease 0s' && computed.transition !== 'none';
          const hasTransform = computed.transform !== 'none';
          const hasAnimation = computed.animation !== 'none';
          const hasOpacity = parseFloat(computed.opacity) < 1;
          
          if (hasTransition || hasTransform || hasAnimation || hasOpacity) {
            animated.push({
              tagName: el.tagName,
              className: el.className,
              transition: computed.transition,
              transform: computed.transform,
              animation: computed.animation,
              opacity: computed.opacity
            });
          }
        });
        
        return animated.slice(0, 10); // First 10 animated elements
      });
      
      console.log('🎬 Animated elements found:', animatedElements.length);
      animatedElements.forEach((el, i) => {
        console.log(`${i + 1}. ${el.tagName}.${el.className}`);
        console.log(`   Transition: ${el.transition}`);
        console.log(`   Transform: ${el.transform}`);
        console.log(`   Animation: ${el.animation}`);
        console.log(`   Opacity: ${el.opacity}`);
      });
      
      // Test scroll behavior
      console.log('\n📜 Testing scroll animations...');
      
      await page.evaluate(() => {
        window.scrollTo(0, 500);
      });
      await page.waitForTimeout(1000);
      
      await page.evaluate(() => {
        window.scrollTo(0, 1000);
      });
      await page.waitForTimeout(1000);
      
      // Look for intersection observer usage
      const hasIntersectionObserver = await page.evaluate(() => {
        return 'IntersectionObserver' in window;
      });
      
      console.log('🔍 Intersection Observer available:', hasIntersectionObserver);
      
      // Check for common animation libraries
      const animationLibraries = await page.evaluate(() => {
        const libraries = [];
        if (window.gsap) libraries.push('GSAP');
        if (window.anime) libraries.push('Anime.js');
        if (window.ScrollMagic) libraries.push('ScrollMagic');
        if (window.AOS) libraries.push('AOS');
        if (window.Lottie) libraries.push('Lottie');
        return libraries;
      });
      
      console.log('📚 Animation libraries detected:', animationLibraries);
      
    } catch (error) {
      console.log('❌ Could not analyze Apple page:', error.message);
      console.log('💡 Will implement scroll animations based on best practices');
    }
    
    console.log('\n🎯 ANIMATION IMPLEMENTATION PLAN:');
    console.log('1. Use Intersection Observer for scroll-triggered animations');
    console.log('2. Implement fade-in and slide-up animations');
    console.log('3. Use CSS transforms and opacity for smooth 60fps animations');
    console.log('4. Add staggered animations for multiple elements');
    console.log('5. Respect prefers-reduced-motion for accessibility');
  });
});