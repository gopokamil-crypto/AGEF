/**
 * AGEF PDF Generation Server
 * Express.js + Playwright (simpler, more reliable than Puppeteer)
 * Uses receipt template from /receipt-agef folder
 */

const express = require('express');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('.'));

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
        const templatePath = path.join(__dirname, 'receipt-agef', 'receipt.html');

        if (!fs.existsSync(templatePath)) {
            return res.status(500).json({ error: 'Template not found', path: templatePath });
        }

        let templateHTML = fs.readFileSync(templatePath, 'utf-8');

        // Populate template with client data
        const html = populateTemplate(templateHTML, clientData);

        // Write populated template to temp file (Playwright works better with file URLs)
        const tempFilePath = path.join(__dirname, 'receipt-agef', 'temp-receipt.html');
        fs.writeFileSync(tempFilePath, html, 'utf-8');

        // Launch Playwright browser
        console.log('🌐 Launching browser...');
        browser = await chromium.launch({
            headless: true
        });

        const page = await browser.newPage();
        console.log('✓ Page created');

        // Navigate to the temp file (this preserves relative image paths)
        console.log('🖼️  Loading template...');
        await page.goto(`file://${tempFilePath}`, {
            waitUntil: 'load',
            timeout: 30000
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
            }
        });
        console.log(`✓ PDF generated (${pdf.length} bytes)`);

        await browser.close();
        browser = null;

        // Clean up temp file
        fs.unlinkSync(tempFilePath);

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

/**
 * Populate template with client data
 * Uses clean placeholder format: [PLACEHOLDER_NAME]
 */
function populateTemplate(templateHTML, clientData) {
    console.log('🔄 Populating template with client data');

    let html = templateHTML;

    // Extract data from clientData
    const fullName = clientData.name || clientData.full_name || 'N/A';
    const phone = clientData.phone || 'N/A';
    const parcelRef = clientData.parcelRef || clientData.parcel_ref || 'N/A';
    const location = clientData.location || 'Bindougousso';
    const landType = clientData.landType || clientData.land_type || clientData.type || 'HABITATION'; // Habitation or Commercial from user selection
    const paymentMethod = clientData.paymentMethod || clientData.payment_method || 'N/A';
    const surfaceArea = parseSurface(clientData.area || clientData.parcel_area);

    // Get price from database (or calculate if not available)
    const totalPrice = clientData.price || clientData.priceNumeric || calculatePrice(surfaceArea);
    const formattedTotal = formatCurrency(totalPrice);

    // Get civility from gender (male -> M., female -> Mme)
    const civility = getCivility(clientData.gender);

    // Data mapping - clean placeholder format
    const replacements = {
        // Header/Title placeholders
        '[NUMERO_LOT]': parcelRef.toUpperCase(),
        '[LOCATION]': location.toUpperCase(),
        '[TYPE_TERRAIN]': landType.toUpperCase(), // HABITATION or COMMERCIAL from user selection

        // Client info
        '[NOM_COMPLET]': fullName,
        '[TELEPHONE]': phone,

        // Fixed amount (50 000 FCFA for procedure opening)
        '[MONTANT_PAYE]': '50 000',

        // Payment method from database
        '[MODE_PAIEMENT]': paymentMethod,

        // Site/Location
        '[SITE]': location,

        // Surface area (number only, m² is in template)
        '[SUPERFICIE]': surfaceArea,

        // Total price from database
        '[PRIX_TOTAL]': formattedTotal,

        // Civility (M. or Mme based on gender)
        '[CIVILITE]': civility
    };

    // Replace all placeholders
    for (const [placeholder, value] of Object.entries(replacements)) {
        const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        html = html.replace(regex, value);
    }

    console.log('✓ Template populated with:', {
        name: fullName,
        phone: phone,
        lot: parcelRef.toUpperCase(),
        location: location,
        surface: surfaceArea,
        price: formattedTotal,
        civility: civility
    });

    return html;
}

// Helper functions
function getCivility(gender) {
    if (!gender) return 'M./Mme';
    const g = gender.toLowerCase();
    if (g === 'female' || g === 'f' || g === 'femme' || g === 'féminin') {
        return 'Mme';
    }
    return 'M.';
}

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

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 AGEF PDF Server running on port ${PORT}`);
    console.log(`📄 Health check: http://localhost:${PORT}/health`);
    console.log(`🎯 PDF API: http://localhost:${PORT}/api/generate-pdf`);
    console.log(`📋 Using Playwright for PDF generation`);
});
