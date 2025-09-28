/**
 * Chrome DevTools MCP Enhanced Testing Script
 * A more advanced alternative to Playwright for visual testing and debugging
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class ChromeDevToolsTest {
  constructor() {
    this.testResults = [];
    this.screenshots = [];
  }

  async runTest(testName, url = 'http://localhost:3000') {
    console.log(`🔍 Running Chrome DevTools MCP Test: ${testName}`);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const logFile = path.join(__dirname, `../test-results/devtools-${testName}-${timestamp}.log`);
    
    return new Promise((resolve, reject) => {
      // Start Chrome DevTools MCP with enhanced options
      const devtoolsProcess = spawn('npx', [
        'chrome-devtools-mcp',
        '--headless',
        '--isolated',
        '--channel', 'stable'
      ], {
        cwd: process.cwd(),
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let output = '';
      let errorOutput = '';

      devtoolsProcess.stdout.on('data', (data) => {
        output += data.toString();
        console.log(`DevTools: ${data.toString().trim()}`);
      });

      devtoolsProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
        console.error(`DevTools Error: ${data.toString().trim()}`);
      });

      devtoolsProcess.on('close', (code) => {
        const result = {
          testName,
          url,
          timestamp,
          exitCode: code,
          output,
          errorOutput,
          success: code === 0
        };

        this.testResults.push(result);
        
        // Save log file
        fs.writeFileSync(logFile, JSON.stringify(result, null, 2));
        
        if (code === 0) {
          console.log(`✅ Test ${testName} completed successfully`);
          resolve(result);
        } else {
          console.error(`❌ Test ${testName} failed with code ${code}`);
          reject(new Error(`Test failed with exit code ${code}`));
        }
      });

      // Send commands to Chrome DevTools MCP
      setTimeout(() => {
        const commands = this.generateTestCommands(url, testName);
        devtoolsProcess.stdin.write(commands);
        devtoolsProcess.stdin.end();
      }, 1000);
    });
  }

  generateTestCommands(url, testName) {
    const commands = [];
    
    // Navigate to URL
    commands.push(`Runtime.evaluate --expression "window.location.href = '${url}'"`);
    
    // Wait for page load
    commands.push('Page.enable');
    commands.push('Runtime.enable');
    commands.push('CSS.enable');
    commands.push('DOM.enable');
    
    switch (testName) {
      case 'visual-inspection':
        commands.push(...this.getVisualInspectionCommands());
        break;
      case 'layout-analysis':
        commands.push(...this.getLayoutAnalysisCommands());
        break;
      case 'performance-check':
        commands.push(...this.getPerformanceCheckCommands());
        break;
      case 'mobile-menu-test':
        commands.push(...this.getMobileMenuTestCommands());
        break;
      default:
        commands.push(...this.getBasicTestCommands());
    }
    
    return commands.join('\n') + '\n';
  }

  getVisualInspectionCommands() {
    return [
      // Check for visual elements
      `Runtime.evaluate --expression "
        const results = {
          headerVisible: !!document.querySelector('header'),
          heroSectionVisible: !!document.querySelector('.hero-section'),
          footerVisible: !!document.querySelector('footer'),
          mobileMenuVisible: !!document.querySelector('.mobile-menu-toggle'),
          ctaSectionVisible: !!document.querySelector('.cta-section')
        };
        console.log('Visual Elements Check:', results);
        results;
      "`,
      
      // Check for visual gaps/white boxes
      `Runtime.evaluate --expression "
        const header = document.querySelector('header');
        const hero = document.querySelector('.hero-section');
        if (header && hero) {
          const headerRect = header.getBoundingClientRect();
          const heroRect = hero.getBoundingClientRect();
          const gap = heroRect.top - (headerRect.top + headerRect.height);
          console.log('Header-Hero Gap:', gap + 'px');
          { headerHeroGap: gap };
        }
      "`,
      
      // Take screenshot
      'Page.captureScreenshot --format png --quality 100'
    ];
  }

  getLayoutAnalysisCommands() {
    return [
      // Analyze layout stability
      `Runtime.evaluate --expression "
        const elements = document.querySelectorAll('.card, .btn, .hero-section, .cta-section');
        const layoutData = Array.from(elements).map(el => ({
          className: el.className,
          rect: el.getBoundingClientRect(),
          computed: window.getComputedStyle(el)
        }));
        console.log('Layout Analysis:', layoutData.length + ' elements analyzed');
        { layoutElements: layoutData.length };
      "`,
      
      // Check for layout shifts
      'Performance.enable',
      `Runtime.evaluate --expression "
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift') {
              console.log('Layout Shift detected:', entry.value);
            }
          }
        }).observe({entryTypes: ['layout-shift']});
      "`
    ];
  }

  getPerformanceCheckCommands() {
    return [
      'Performance.enable',
      'Performance.getMetrics',
      
      // Check animation performance
      `Runtime.evaluate --expression "
        const animationElements = document.querySelectorAll('[class*=\"animate\"], .card:hover, .btn:hover');
        const fps = [];
        const measureFPS = () => {
          let lastTime = performance.now();
          let frames = 0;
          const checkFPS = () => {
            frames++;
            const currentTime = performance.now();
            if (currentTime - lastTime >= 1000) {
              fps.push(frames);
              console.log('Current FPS:', frames);
              frames = 0;
              lastTime = currentTime;
            }
            requestAnimationFrame(checkFPS);
          };
          requestAnimationFrame(checkFPS);
        };
        measureFPS();
        { animationElements: animationElements.length };
      "`
    ];
  }

  getMobileMenuTestCommands() {
    return [
      // Set mobile viewport
      'Emulation.setDeviceMetricsOverride --width 375 --height 667 --deviceScaleFactor 1 --mobile true',
      
      // Check mobile menu button
      `Runtime.evaluate --expression "
        const mobileButton = document.querySelector('.mobile-menu-toggle');
        const icon = mobileButton ? mobileButton.querySelector('svg') : null;
        const buttonRect = mobileButton ? mobileButton.getBoundingClientRect() : null;
        const iconRect = icon ? icon.getBoundingClientRect() : null;
        
        let centeringData = null;
        if (buttonRect && iconRect) {
          const buttonCenterX = buttonRect.left + buttonRect.width / 2;
          const buttonCenterY = buttonRect.top + buttonRect.height / 2;
          const iconCenterX = iconRect.left + iconRect.width / 2;
          const iconCenterY = iconRect.top + iconRect.height / 2;
          
          centeringData = {
            offsetX: Math.abs(buttonCenterX - iconCenterX),
            offsetY: Math.abs(buttonCenterY - iconCenterY),
            perfectlyCentered: Math.abs(buttonCenterX - iconCenterX) < 2 && Math.abs(buttonCenterY - iconCenterY) < 2
          };
        }
        
        const result = {
          mobileButtonExists: !!mobileButton,
          iconExists: !!icon,
          buttonRect,
          iconRect,
          centering: centeringData
        };
        console.log('Mobile Menu Test:', result);
        result;
      "`,
      
      // Test mobile menu interaction
      `Runtime.evaluate --expression "
        const mobileButton = document.querySelector('.mobile-menu-toggle');
        if (mobileButton) {
          mobileButton.click();
          setTimeout(() => {
            const mobileMenu = document.querySelector('.mobile-menu');
            console.log('Mobile menu after click:', mobileMenu ? 'visible' : 'not visible');
          }, 500);
        }
      "`
    ];
  }

  getBasicTestCommands() {
    return [
      // Basic page info
      `Runtime.evaluate --expression "
        const result = {
          title: document.title,
          url: window.location.href,
          readyState: document.readyState,
          elementsCount: document.querySelectorAll('*').length,
          hasErrors: window.onerror ? 'Error handler present' : 'No error handler'
        };
        console.log('Basic Page Info:', result);
        result;
      "`,
      
      // Console errors check
      'Runtime.consoleAPICalled',
      'Runtime.exceptionThrown'
    ];
  }

  async runAllTests() {
    const tests = [
      'visual-inspection',
      'layout-analysis', 
      'mobile-menu-test',
      'performance-check'
    ];

    console.log('🚀 Starting Chrome DevTools MCP Test Suite...\n');

    // Ensure test results directory exists
    const testResultsDir = path.join(__dirname, '../test-results');
    if (!fs.existsSync(testResultsDir)) {
      fs.mkdirSync(testResultsDir, { recursive: true });
    }

    for (const testName of tests) {
      try {
        await this.runTest(testName);
        console.log(`\n`);
      } catch (error) {
        console.error(`Test ${testName} failed:`, error.message);
      }
    }

    this.generateSummaryReport();
  }

  generateSummaryReport() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(__dirname, `../test-results/devtools-summary-${timestamp}.json`);
    
    const summary = {
      timestamp: new Date().toISOString(),
      totalTests: this.testResults.length,
      passedTests: this.testResults.filter(r => r.success).length,
      failedTests: this.testResults.filter(r => !r.success).length,
      results: this.testResults
    };

    fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2));
    
    console.log('\n📊 Chrome DevTools MCP Test Summary:');
    console.log(`✅ Passed: ${summary.passedTests}`);
    console.log(`❌ Failed: ${summary.failedTests}`);
    console.log(`📝 Report saved to: ${reportPath}`);
    
    return summary;
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new ChromeDevToolsTest();
  tester.runAllTests().catch(console.error);
}

module.exports = ChromeDevToolsTest;