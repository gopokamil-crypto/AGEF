/**
 * Playwright Test: Real PDF Download from Admin Portal
 * Flow: Select user → Generate link → Click link → Download receipt
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testRealDownload() {
    console.log('🎭 Starting Playwright test for real PDF download...\n');

    const browser = await chromium.launch({
        headless: false,  // Show browser for debugging
        slowMo: 1000      // Slow down actions to see what's happening
    });

    const context = await browser.newContext({
        acceptDownloads: true
    });

    const page = await context.newPage();

    try {
        // Step 1: Navigate to admin page
        console.log('1️⃣  Navigating to admin page...');
        await page.goto('http://localhost:3000/pages/admin-gestion-clients.html', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
        await page.waitForTimeout(3000); // Wait for dynamic content to load
        console.log('   ✓ Page loaded\n');

        await page.screenshot({ path: 'step1-page-loaded.png' });

        // Step 2: Wait for users list to load
        console.log('2️⃣  Waiting for users list to load...');
        await page.waitForTimeout(2000);
        console.log('   ✓ Users list should be visible\n');

        await page.screenshot({ path: 'step2-users-list.png' });

        // Step 3: Select any user (click on a row or user element)
        console.log('3️⃣  Selecting a user from the list...');

        // Try to find and click on a user row/card
        const userSelectors = [
            'tr[data-user-id]',
            'tr.user-row',
            '.user-item',
            '.client-row',
            'tbody tr',
            '[onclick*="select"]'
        ];

        let userSelected = false;
        for (const selector of userSelectors) {
            try {
                const elements = await page.locator(selector);
                const count = await elements.count();
                if (count > 0) {
                    console.log(`   Found ${count} users with selector: ${selector}`);
                    await elements.first().click();
                    userSelected = true;
                    console.log('   ✓ User selected\n');
                    break;
                }
            } catch (e) {
                continue;
            }
        }

        if (!userSelected) {
            console.log('   ⚠️  Could not select user with standard selectors, clicking first table row...');
            await page.locator('tbody tr').first().click();
            console.log('   ✓ Clicked first row\n');
        }

        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'step3-user-selected.png' });

        // Step 4: Look for and click "Generate" button
        console.log('4️⃣  Looking for Generate button...');

        const generateSelectors = [
            'button:has-text("Générer")',
            'button:has-text("Generate")',
            'button:has-text("générer")',
            'a:has-text("Générer")',
            '[onclick*="generate"]',
            '[onclick*="Générer"]',
            '.generate-btn',
            '#generateBtn'
        ];

        let generateClicked = false;
        for (const selector of generateSelectors) {
            try {
                const btn = page.locator(selector).first();
                if (await btn.count() > 0) {
                    console.log(`   Found Generate button: ${selector}`);
                    await btn.click();
                    generateClicked = true;
                    console.log('   ✓ Generate button clicked\n');
                    break;
                }
            } catch (e) {
                continue;
            }
        }

        if (!generateClicked) {
            throw new Error('Generate button not found');
        }

        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'step4-after-generate.png' });

        // Step 5: Look for the generated link and navigate to it
        console.log('5️⃣  Looking for generated link...');

        // Wait for link to appear
        const linkSelectors = [
            'a[href*="admin-profile-client"]',
            'a[href*="recu"]',
            'a[href*="receipt"]',
            'a:has-text("Cliquer")',
            'a:has-text("Voir")',
            '.generated-link',
            'a[target="_blank"]'
        ];

        let linkHref = null;
        for (const selector of linkSelectors) {
            try {
                const link = page.locator(selector).first();
                if (await link.count() > 0) {
                    console.log(`   Found link: ${selector}`);
                    linkHref = await link.getAttribute('href');
                    console.log(`   Link URL: ${linkHref}`);
                    break;
                }
            } catch (e) {
                continue;
            }
        }

        if (!linkHref) {
            throw new Error('Generated link not found');
        }

        // Navigate to the link URL directly (don't click, to avoid new tab)
        console.log('   Navigating to receipt page...');
        await page.goto(linkHref, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        console.log('   ✓ On receipt page\n');

        console.log('6️⃣  On receipt page:', page.url());
        await page.screenshot({ path: 'step5-receipt-page.png', fullPage: true });

        // Step 6: Scroll to bottom to find Download Receipt button
        console.log('7️⃣  Scrolling to bottom to find Download Receipt button...');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);

        await page.screenshot({ path: 'step6-scrolled-to-bottom.png', fullPage: true });

        // Step 7: Find and click Download Receipt button
        console.log('8️⃣  Looking for Download Receipt button...');

        const downloadSelectors = [
            'button:has-text("Télécharger")',
            'button:has-text("Download")',
            'button:has-text("télécharger le reçu")',
            'button:has-text("Télécharger le reçu")',
            'a:has-text("Télécharger")',
            '#downloadBtn',
            '.download-btn',
            '[onclick*="download"]',
            '[onclick*="PDF"]'
        ];

        let downloadButton = null;
        for (const selector of downloadSelectors) {
            try {
                const btn = page.locator(selector).first();
                if (await btn.count() > 0) {
                    downloadButton = btn;
                    console.log(`   Found Download button: ${selector}`);
                    break;
                }
            } catch (e) {
                continue;
            }
        }

        if (!downloadButton) {
            console.log('   ⚠️  Download button not found, showing page content...');
            const bodyText = await page.locator('body').textContent();
            console.log(bodyText.substring(0, 1000));
            throw new Error('Download Receipt button not found');
        }

        // Step 8: Setup download listener and click button
        console.log('9️⃣  Setting up download listener...');
        const downloadPromise = page.waitForEvent('download', { timeout: 30000 });

        console.log('🔟 Clicking Download Receipt button...');
        await downloadButton.click();
        console.log('   ✓ Button clicked, waiting for download...\n');

        // Wait for download
        const download = await downloadPromise;

        const fileName = download.suggestedFilename();
        const downloadPath = path.join(__dirname, 'downloads', fileName);

        // Create downloads directory
        if (!fs.existsSync(path.join(__dirname, 'downloads'))) {
            fs.mkdirSync(path.join(__dirname, 'downloads'));
        }

        await download.saveAs(downloadPath);
        console.log(`   ✅ PDF downloaded: ${fileName}`);
        console.log(`   📁 Saved to: ${downloadPath}\n`);

        // Verify PDF file
        console.log('1️⃣1️⃣  Verifying PDF file...');
        const stats = fs.statSync(downloadPath);
        console.log(`   📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);

        if (stats.size < 1000) {
            console.log('   ⚠️  File seems too small, might be an error');
            const content = fs.readFileSync(downloadPath, 'utf8');
            console.log('   Content:', content);
            throw new Error('Downloaded file is too small');
        }

        // Check if it's a valid PDF
        const fileBuffer = fs.readFileSync(downloadPath);
        const isPDF = fileBuffer.toString('utf8', 0, 4) === '%PDF';

        if (isPDF) {
            console.log('   ✓ Valid PDF file!\n');
        } else {
            console.log('   ⚠️  File may not be a valid PDF\n');
        }

        console.log('\n✅ ✅ ✅ TEST PASSED! PDF downloaded successfully! ✅ ✅ ✅\n');

        await page.waitForTimeout(3000);

        return { success: true, downloadPath, fileName };

    } catch (error) {
        console.error('\n❌ TEST FAILED:', error.message, '\n');

        await page.screenshot({ path: 'error-screenshot.png', fullPage: true });
        console.log('📸 Error screenshot saved: error-screenshot.png\n');

        console.log('📋 Current URL:', page.url());
        console.log('📋 Page title:', await page.title());

        return { success: false, error: error.message };

    } finally {
        await browser.close();
    }
}

// Run the test
testRealDownload().then(result => {
    if (result.success) {
        console.log('🎉 All tests passed!');
        console.log(`📄 Downloaded PDF: ${result.downloadPath}`);
        process.exit(0);
    } else {
        console.log('💥 Test failed!');
        console.log(`Error: ${result.error}`);
        process.exit(1);
    }
});
