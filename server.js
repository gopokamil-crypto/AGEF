/**
 * AGEF PDF Generation Server
 * Express.js + Puppeteer for Docker deployment
 */

const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('.')); // Serve static files

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'AGEF PDF Generator' });
});

// PDF generation endpoint
app.post('/api/generate-pdf', async (req, res) => {
    let browser = null;

    try {
        console.log('🚀 Starting PDF generation...');

        const clientData = req.body;

        if (!clientData) {
            return res.status(400).json({ error: 'Client data required' });
        }

        // Load template
        const templatePath = path.join(__dirname, 'recu-index.html');

        if (!fs.existsSync(templatePath)) {
            return res.status(500).json({ error: 'Template not found', path: templatePath });
        }

        const templateHTML = fs.readFileSync(templatePath, 'utf-8');

        // Populate template with client data
        const html = populateTemplate(templateHTML, clientData);

        // Launch Puppeteer (uses bundled Chromium on macOS, system Chromium on Linux)
        const launchOptions = {
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-software-rasterizer',
                '--disable-extensions'
            ],
            headless: true,
            timeout: 60000,
            dumpio: false,
            protocolTimeout: 180000
        };

        // Only set executablePath if explicitly provided (for Docker/Linux)
        if (process.env.PUPPETEER_EXECUTABLE_PATH) {
            launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
        } else if (process.platform === 'darwin') {
            // On macOS, explicitly set the path to installed Chrome
            const os = require('os');
            const homeDir = os.homedir();
            launchOptions.executablePath = `${homeDir}/.cache/puppeteer/chrome/mac_arm-121.0.6167.85/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
        }

        console.log('🌐 Launching browser...');
        browser = await puppeteer.launch(launchOptions);
        console.log('✓ Browser launched');

        console.log('📄 Creating new page...');
        const page = await browser.newPage();
        console.log('✓ Page created');

        // Set content
        console.log('🖼️  Loading content (187KB template with SVG images)...');
        await page.setContent(html, {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
        console.log('✓ Content loaded');

        // Generate PDF
        console.log('📄 Generating PDF...');
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0mm',
                right: '0mm',
                bottom: '0mm',
                left: '0mm'
            },
            preferCSSPageSize: false,
            timeout: 120000
        });
        console.log(`✓ PDF generated (${pdf.length} bytes)`);

        await browser.close();
        browser = null;

        console.log('✅ PDF generated successfully');

        // Generate filename
        const clientName = (clientData.name || clientData.full_name || 'Client').replace(/[^a-zA-Z0-9]/g, '_');
        const parcelRef = (clientData.parcelRef || clientData.parcel_ref || '000').replace(/[^a-zA-Z0-9]/g, '_');
        const date = new Date().toISOString().split('T')[0];
        const fileName = `AGEF_Recu_${parcelRef}_${clientName}_${date}.pdf`;

        // Return PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Length', pdf.length);
        res.status(200).send(pdf);

    } catch (error) {
        console.error('❌ PDF generation failed:', error);

        if (browser) {
            await browser.close();
        }

        return res.status(500).json({
            error: 'PDF generation failed',
            message: error.message
        });
    }
});

// Template population function
function populateTemplate(templateHTML, clientData) {
    console.log('🔄 Populating template with client data');

    let html = templateHTML;

    // Calculate amounts
    const surfaceArea = parseSurface(clientData.area || clientData.parcel_area);
    const totalPrice = clientData.price || clientData.priceNumeric || calculatePrice(surfaceArea);
    const depositAmount = clientData.deposit || clientData.depositNumeric || (totalPrice * 0.1);

    // Format currency
    const formattedTotal = formatCurrency(totalPrice);
    const formattedDeposit = formatCurrency(depositAmount);

    // Extract ilot number
    const ilotNumber = extractIlotNumber(clientData.parcelRef || clientData.parcel_ref);

    // Data mapping object
    const replacements = {
        '[NUMERO_LOT]': clientData.parcelRef || clientData.parcel_ref || 'N/A',
        '[NOM_DU_SITE]': clientData.location || 'Bindougousso',
        '[NOM_COMPLET_UTILISATEUR]': clientData.name || clientData.full_name || 'N/A',
        '[NUMERO_TELEPHONE]': clientData.phone || 'N/A',
        '[MONTANT_PAYÉ]': formattedDeposit,
        '[MODE_PAIEMENT]': clientData.paymentMethod || clientData.payment_method || 'N/A',
        '[ID_TRANSACTION_OPERATEUR]': clientData.transactionRef || clientData.transaction_ref || 'N/A',
        '[NUMERO_ILOT]': ilotNumber,
        '[SURFACE]': surfaceArea,
        '{SURFACE}': surfaceArea,
        '[PRIX TOTAL]': formattedTotal,
        '[PRIX_TOTAL]': formattedTotal,
        '[NOM PRÉNOMS]': clientData.name || clientData.full_name || 'N/A',
        '[SITE / LOCALITÉ]': clientData.location || 'Bindougousso',
        '[N° LOT]': clientData.parcelRef || clientData.parcel_ref || 'N/A',
        '[MONTANT PAYÉ]': formattedDeposit
    };

    // Replace all placeholders
    for (const [placeholder, value] of Object.entries(replacements)) {
        const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        html = html.replace(regex, value);
    }

    // Remove example text
    html = html.replace(/\(Ex:[^)]+\)/g, '');

    console.log('✓ Template populated');
    return html;
}

// Helper functions
function parseSurface(areaStr) {
    if (!areaStr) return '0';
    const match = String(areaStr).match(/\d+/);
    return match ? match[0] : '0';
}

function calculatePrice(area) {
    return parseInt(area) * 15000;
}

function formatCurrency(amount) {
    const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d]/g, '')) : amount;
    if (isNaN(num)) return '0';
    return num.toLocaleString('fr-FR').replace(/,/g, ' ');
}

function extractIlotNumber(parcelRef) {
    if (!parcelRef) return 'N/A';
    const parts = parcelRef.split('-');
    return parts.length >= 2 ? parts[1] : 'N/A';
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 AGEF PDF Server running on port ${PORT}`);
    console.log(`📄 Health check: http://localhost:${PORT}/health`);
    console.log(`🎯 PDF API: http://localhost:${PORT}/api/generate-pdf`);
});
