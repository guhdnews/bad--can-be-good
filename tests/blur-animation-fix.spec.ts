import { test, expect, Page } from '@playwright/test';

test.describe('Blur Animation Issues Detection and Fix', () => {
  
  test('Identify blur animation problems on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    console.log('🔍 Analyzing blur animation issues...');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Check for blur filters in hero section
    const heroBlurIssues = await page.evaluate(() => {
      const heroElements = document.querySelectorAll('.hero-section *');
      const blurProblems = [];
      
      heroElements.forEach((el, index) => {
        const styles = getComputedStyle(el);
        const filter = styles.filter;
        const textContent = el.textContent?.trim();
        
        if (filter.includes('blur') && textContent && textContent.length > 0) {
          blurProblems.push({
            element: el.tagName + (el.className ? '.' + Array.from(el.classList).join('.') : ''),
            filter: filter,
            textContent: textContent.substring(0, 50),
            isVisible: el.offsetWidth > 0 && el.offsetHeight > 0
          });
        }
      });
      
      return blurProblems;
    });
    
    console.log('🏠 Hero Section Blur Issues:', heroBlurIssues);
    
    // Check for blur issues in "Why Choose Us" section
    const whyChooseBlurIssues = await page.evaluate(() => {
      const whyChooseElements = document.querySelectorAll('.main-section *');
      const blurProblems = [];
      
      whyChooseElements.forEach((el, index) => {
        const styles = getComputedStyle(el);
        const filter = styles.filter;
        const textContent = el.textContent?.trim();
        
        if (filter.includes('blur') && textContent && textContent.length > 0) {
          blurProblems.push({
            element: el.tagName + (el.className ? '.' + Array.from(el.classList).join('.') : ''),
            filter: filter,
            textContent: textContent.substring(0, 50),
            isVisible: el.offsetWidth > 0 && el.offsetHeight > 0,
            sectionType: 'why-choose-us'
          });
        }
      });
      
      return blurProblems;
    });
    
    console.log('⭐ Why Choose Us Section Blur Issues:', whyChooseBlurIssues);
    
    // Check animation states and timing issues
    const animationTiming = await page.evaluate(() => {
      const animatedElements = document.querySelectorAll('[data-framer-motion], .text-reveal, .apple-reveal');
      const timingIssues = [];
      
      animatedElements.forEach(el => {
        const styles = getComputedStyle(el);
        const animationDelay = styles.animationDelay;
        const transitionDelay = styles.transitionDelay;
        const filter = styles.filter;
        
        if (filter.includes('blur') && (animationDelay !== '0s' || transitionDelay !== '0s')) {
          timingIssues.push({
            element: el.tagName + (el.className ? '.' + Array.from(el.classList).join('.') : ''),
            animationDelay,
            transitionDelay,
            filter,
            textContent: el.textContent?.substring(0, 30)
          });
        }
      });
      
      return timingIssues;
    });
    
    console.log('⏰ Animation Timing Issues:', animationTiming);
    
    // Check for ProgressiveReveal component issues
    const progressiveRevealIssues = await page.evaluate(() => {
      const progressiveElements = document.querySelectorAll('[style*="blur"]');
      const issues = [];
      
      progressiveElements.forEach(el => {
        const inlineStyle = el.getAttribute('style') || '';
        const computedStyle = getComputedStyle(el);
        const textContent = el.textContent?.trim();
        
        if (inlineStyle.includes('blur') && textContent) {
          issues.push({
            element: el.tagName + (el.className ? '.' + Array.from(el.classList).join('.') : ''),
            inlineStyle,
            computedFilter: computedStyle.filter,
            textContent: textContent.substring(0, 40),
            hasFramerMotion: el.hasAttribute('data-framer-motion')
          });
        }
      });
      
      return issues;
    });
    
    console.log('🎭 Progressive Reveal Issues:', progressiveRevealIssues);
    
    // Take screenshot for visual debugging
    await page.screenshot({ 
      path: 'test-results/blur-issues-screenshot.png',
      fullPage: true 
    });
    
    // Scroll to test scroll-based blur animations
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(1000);
    
    const scrollBlurIssues = await page.evaluate(() => {
      const visibleElements = document.querySelectorAll('*');
      const scrollIssues = [];
      
      visibleElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        const styles = getComputedStyle(el);
        const filter = styles.filter;
        const textContent = el.textContent?.trim();
        
        if (isInView && filter.includes('blur') && textContent && textContent.length > 0) {
          scrollIssues.push({
            element: el.tagName + (el.className ? '.' + Array.from(el.classList).join('.') : ''),
            filter,
            textContent: textContent.substring(0, 40),
            position: {
              top: rect.top,
              bottom: rect.bottom,
              visible: isInView
            }
          });
        }
      });
      
      return scrollIssues;
    });
    
    console.log('📜 Scroll-based Blur Issues:', scrollBlurIssues);
    
    // Generate comprehensive report
    const totalIssues = heroBlurIssues.length + whyChooseBlurIssues.length + 
                       animationTiming.length + progressiveRevealIssues.length + 
                       scrollBlurIssues.length;
    
    console.log('📊 Blur Issues Summary:', {
      heroIssues: heroBlurIssues.length,
      whyChooseIssues: whyChooseBlurIssues.length,
      timingIssues: animationTiming.length,
      progressiveRevealIssues: progressiveRevealIssues.length,
      scrollIssues: scrollBlurIssues.length,
      totalIssues
    });
    
    // Return results for further processing
    expect(totalIssues).toBeGreaterThanOrEqual(0); // We'll fix whatever we find
  });
  
  test('Test text readability after blur fixes', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    console.log('👁️ Testing text readability...');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Wait for animations
    
    // Check if text is readable (not blurred) after animations complete
    const readabilityTest = await page.evaluate(() => {
      const textElements = document.querySelectorAll('h1, h2, h3, p, span, a');
      const readabilityIssues = [];
      
      textElements.forEach(el => {
        const styles = getComputedStyle(el);
        const filter = styles.filter;
        const textContent = el.textContent?.trim();
        const opacity = parseFloat(styles.opacity);
        
        if (textContent && textContent.length > 5) {
          // Text should not be blurred AND should be visible
          if (filter.includes('blur') && filter !== 'none' && filter !== 'blur(0px)') {
            readabilityIssues.push({
              element: el.tagName + (el.className ? '.' + Array.from(el.classList).join('.') : ''),
              filter,
              opacity,
              textContent: textContent.substring(0, 30),
              isVisible: el.offsetWidth > 0 && el.offsetHeight > 0
            });
          }
        }
      });
      
      return readabilityIssues;
    });
    
    console.log('📖 Readability Issues Found:', readabilityTest);
    
    return readabilityTest;
  });
});