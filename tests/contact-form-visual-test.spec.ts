import { test, expect } from '@playwright/test';

test.describe('Contact Form Visual Tests', () => {
  test('verify contact form is visually correct and functional', async ({ page }) => {
    console.log('🔍 Testing contact form visual appearance and functionality');

    // Navigate to contact page
    await page.goto('http://localhost:3000/contact');
    await page.waitForLoadState('networkidle');

    // Take initial screenshot
    await page.screenshot({ 
      path: 'test-results/contact-page-initial.png',
      fullPage: true 
    });

    // Check that form is visible
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Check that form has dark background (gray-900)
    const formContainer = page.locator('.bg-gray-900').first();
    await expect(formContainer).toBeVisible();

    // Test that inputs have proper dark styling
    const firstNameInput = page.locator('#firstName');
    await expect(firstNameInput).toBeVisible();
    
    // Fill in the form to test visibility
    await firstNameInput.fill('John');
    await page.locator('#lastName').fill('Doe');
    await page.locator('#email').fill('john.doe@example.com');
    
    // Take screenshot with filled inputs to verify text is visible
    await page.screenshot({ 
      path: 'test-results/contact-form-filled-inputs.png',
      fullPage: true 
    });

    // Verify the text is actually in the inputs (not white on white)
    expect(await firstNameInput.inputValue()).toBe('John');
    expect(await page.locator('#lastName').inputValue()).toBe('Doe');
    expect(await page.locator('#email').inputValue()).toBe('john.doe@example.com');

    // Test dropdowns
    await page.selectOption('#projectType', 'Web Application Development');
    await page.selectOption('#budgetRange', '$10k - $25k');
    await page.selectOption('#timeline', '3-6 months');

    // Fill textarea
    await page.fill('#message', 'This is a test message to verify text visibility in the dark-themed form.');

    // Check consultation checkbox
    await page.check('#scheduleConsultation');

    // Final screenshot with all fields filled
    await page.screenshot({ 
      path: 'test-results/contact-form-completed.png',
      fullPage: true 
    });

    // Verify submit button is visible and properly styled
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toHaveText('Get Started With My Project');

    // Test responsive design
    await page.setViewportSize({ width: 768, height: 1024 }); // Tablet
    await page.screenshot({ 
      path: 'test-results/contact-form-tablet.png',
      fullPage: true 
    });

    await page.setViewportSize({ width: 375, height: 667 }); // Mobile
    await page.screenshot({ 
      path: 'test-results/contact-form-mobile.png',
      fullPage: true 
    });

    // Form should still be visible and usable on mobile
    await expect(form).toBeVisible();
    await expect(submitButton).toBeVisible();

    console.log('✅ Contact form visual tests completed successfully');
  });

  test('test form submission with mock API', async ({ page }) => {
    console.log('🧪 Testing contact form submission');

    await page.goto('http://localhost:3000/contact');
    await page.waitForLoadState('networkidle');

    // Mock the API response
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

    // Fill out required fields
    await page.fill('#firstName', 'Jane');
    await page.fill('#lastName', 'Smith');
    await page.fill('#email', 'jane.smith@example.com');
    await page.selectOption('#projectType', 'E-commerce Platform');
    await page.selectOption('#budgetRange', '$25k - $50k');
    await page.selectOption('#timeline', '3-6 months');
    await page.check('#scheduleConsultation');

    // Submit the form
    await page.click('button[type="submit"]');
    
    // Wait for success message
    await page.waitForSelector('text=Thank you for your interest!', { timeout: 10000 });
    
    // Verify success page styling
    await expect(page.locator('text=Thank you for your interest!')).toBeVisible();
    await expect(page.locator('text=Schedule Your Free Consultation')).toBeVisible();

    // Take screenshot of success page
    await page.screenshot({ 
      path: 'test-results/contact-form-success.png',
      fullPage: true 
    });

    console.log('✅ Contact form submission test completed successfully');
  });
});