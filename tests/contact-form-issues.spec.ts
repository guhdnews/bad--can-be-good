import { test, expect } from '@playwright/test';

test.describe('Contact Form Issues Analysis', () => {
  test('analyze contact form styling and usability issues', async ({ page, browserName }) => {
    console.log(`🔍 Testing contact form on ${browserName}`);

    // Navigate to contact page
    await page.goto('http://localhost:3000/contact');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot for visual inspection
    await page.screenshot({ 
      path: `test-results/contact-form-${browserName}.png`,
      fullPage: true 
    });

    // Check if form is visible
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Test form background and contrast
    console.log('🎨 Testing form styling...');
    
    const formContainer = page.locator('div:has(form)');
    const formStyles = await formContainer.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        padding: computed.padding
      };
    });
    
    console.log('Form container styles:', formStyles);

    // Test input field styling
    const firstNameInput = page.locator('#firstName');
    await expect(firstNameInput).toBeVisible();
    
    const inputStyles = await firstNameInput.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        border: computed.border,
        borderColor: computed.borderColor
      };
    });
    
    console.log('Input field styles:', inputStyles);

    // Test input text visibility by typing
    console.log('⌨️ Testing input text visibility...');
    
    await firstNameInput.fill('Test User');
    await page.waitForTimeout(1000);
    
    // Check if text is visible (not white on white)
    const inputValue = await firstNameInput.inputValue();
    expect(inputValue).toBe('Test User');
    
    // Test if text color contrasts with background
    const textColor = await firstNameInput.evaluate(el => {
      return window.getComputedStyle(el).color;
    });
    
    console.log('Input text color:', textColor);

    // Test all form fields for styling issues
    const formFields = [
      '#firstName',
      '#lastName', 
      '#email',
      '#company',
      '#phone',
      '#website',
      '#projectType',
      '#budgetRange',
      '#timeline',
      '#message'
    ];

    console.log('🔍 Testing all form fields...');
    
    for (const fieldSelector of formFields) {
      const field = page.locator(fieldSelector);
      await expect(field).toBeVisible();
      
      // Get field styles
      const fieldStyles = await field.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          border: computed.border
        };
      });
      
      console.log(`${fieldSelector} styles:`, fieldStyles);
      
      // Test field interaction
      if (fieldSelector === '#projectType' || fieldSelector === '#budgetRange' || fieldSelector === '#timeline') {
        // Select dropdown
        await field.selectOption({ index: 1 });
      } else if (fieldSelector === '#message') {
        // Textarea
        await field.fill('This is a test message to check visibility');
      } else if (fieldSelector !== '#firstName') {
        // Regular input
        await field.fill('test input');
      }
      
      await page.waitForTimeout(500);
    }

    // Test form submission styling
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    
    const buttonStyles = await submitButton.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        padding: computed.padding,
        borderRadius: computed.borderRadius
      };
    });
    
    console.log('Submit button styles:', buttonStyles);

    // Check for any overlapping or hidden elements
    console.log('🔍 Checking for layout issues...');
    
    const formBounds = await form.boundingBox();
    const viewportSize = page.viewportSize();
    
    console.log('Form bounds:', formBounds);
    console.log('Viewport size:', viewportSize);

    // Test form responsiveness
    await page.setViewportSize({ width: 768, height: 1024 }); // Tablet
    await page.waitForTimeout(1000);
    await expect(form).toBeVisible();
    
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile
    await page.waitForTimeout(1000);
    await expect(form).toBeVisible();
    
    // Reset viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    // Test if form labels are readable
    const labels = page.locator('label');
    const labelCount = await labels.count();
    console.log(`Found ${labelCount} labels`);
    
    for (let i = 0; i < labelCount; i++) {
      const label = labels.nth(i);
      const labelStyles = await label.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight
        };
      });
      
      const labelText = await label.textContent();
      console.log(`Label "${labelText}" styles:`, labelStyles);
    }

    // Final screenshot with filled form
    await page.screenshot({ 
      path: `test-results/contact-form-filled-${browserName}.png`,
      fullPage: true 
    });

    console.log(`✅ Contact form analysis complete for ${browserName}`);
  });

  test('test contact form functionality', async ({ page, browserName }) => {
    console.log(`🧪 Testing contact form functionality on ${browserName}`);

    await page.goto('http://localhost:3000/contact');
    await page.waitForLoadState('networkidle');

    // Fill out the form
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john.doe@example.com');
    await page.fill('#company', 'Test Company');
    await page.fill('#phone', '+1234567890');
    await page.fill('#website', 'https://example.com');
    await page.selectOption('#projectType', 'Web Application Development');
    await page.selectOption('#budgetRange', '$10k - $25k');
    await page.selectOption('#timeline', '3-6 months');
    await page.fill('#message', 'This is a test project inquiry to verify the form works correctly.');
    
    // Check the consultation checkbox
    await page.check('#scheduleConsultation');

    // Take screenshot before submission
    await page.screenshot({ 
      path: `test-results/contact-form-ready-submit-${browserName}.png`,
      fullPage: true 
    });

    // Mock the API call to avoid actual submission
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Contact form submitted successfully',
          data: {
            contactCreated: true,
            dealCreated: true,
            companyCreated: true,
            schedulingUrl: 'https://calendly.com/upface/consultation'
          }
        })
      });
    });

    // Submit the form
    await page.click('button[type="submit"]');
    
    // Wait for success message
    await page.waitForSelector('text=Thank you for your interest!', { timeout: 10000 });
    
    // Verify success page is displayed
    await expect(page.locator('text=Thank you for your interest!')).toBeVisible();
    await expect(page.locator('text=Schedule Your Free Consultation')).toBeVisible();

    // Take final screenshot
    await page.screenshot({ 
      path: `test-results/contact-form-success-${browserName}.png`,
      fullPage: true 
    });

    console.log(`✅ Contact form functionality test complete for ${browserName}`);
  });
});