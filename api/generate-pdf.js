/**
 * AGEF PDF Generation - Serverless Function
 * Industry-Standard: Puppeteer (Used by Google, Netflix, Amazon, Stripe)
 * Deployment: Vercel Serverless Functions (Free Tier)
 *
 * Uses user's existing template: /recu-index.html
 */

const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    // CORS headers for frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    let browser = null;

    try {
        console.log('🚀 Starting PDF generation...');

        // Get client data from request
        const clientData = req.body;

        if (!clientData) {
            return res.status(400).json({ error: 'Client data required' });
        }

        // Load user's existing template
        const templatePath = path.join(process.cwd(), 'recu-index.html');
        const templateHTML = fs.readFileSync(templatePath, 'utf-8');

        // Populate template with client data
        const html = populateTemplate(templateHTML, clientData);

        // Configure Chromium for Vercel serverless (disable graphics mode for missing libs)
        chromium.setGraphicsMode = false;

        // Launch Puppeteer with Chromium (optimized for serverless)
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless
        });

        const page = await browser.newPage();

        // Set content with proper encoding
        await page.setContent(html, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        // Generate PDF with A4 format
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0mm',
                right: '0mm',
                bottom: '0mm',
                left: '0mm'
            },
            preferCSSPageSize: false
        });

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
};

/**
 * Populate user's existing template with client data
 * Uses the exact /recu-index.html template
 */
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

    // Data mapping object - all placeholders from template
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
        '[MONTANT PAYÉ]': formattedDeposit // Alternative format
    };

    // Replace all placeholders
    for (const [placeholder, value] of Object.entries(replacements)) {
        // Use global regex to replace all occurrences
        const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        html = html.replace(regex, value);
    }

    // Remove example text in parentheses (Ex: ...)
    html = html.replace(/\(Ex:[^)]+\)/g, '');

    console.log('✓ Template populated with data');
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
