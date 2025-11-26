/**
 * AGEF PDF Receipt Generator
 * Loads existing recu-index.html template and populates with client data
 * Dependencies: jsPDF, html2canvas
 */

const AGEFPDFGenerator = {
    // Cache for template HTML to avoid repeated fetches
    templateCache: null,

    /**
     * Main function: Generate PDF from client data
     * @param {Object} clientData - Formatted client object from database
     * @returns {Promise<boolean>} Success status
     */
    async generateReceipt(clientData) {
        try {
            console.log('🎯 Starting PDF generation for:', clientData.name || clientData.full_name);

            // Step 1: Load template HTML
            const templateHTML = await this.loadTemplateHTML();
            if (!templateHTML) {
                throw new Error('Failed to load template');
            }

            // Step 2: Populate template with client data
            const populatedHTML = this.populateTemplate(templateHTML, clientData);

            // Step 3: Inject into hidden container
            this.injectHTMLToContainer(populatedHTML);

            // Step 4: Wait for all images and fonts to load
            await this.waitForImages();
            await this.sleep(500); // Extra time for fonts

            // Step 5: Render to PDF
            await this.renderToPDF(clientData);

            console.log('✅ PDF generated successfully');
            return true;

        } catch (error) {
            console.error('❌ PDF generation failed:', error);
            alert('Erreur lors de la génération du PDF. Veuillez réessayer.\n\nDétails: ' + error.message);
            return false;
        } finally {
            // Clean up hidden container
            this.cleanupContainer();
        }
    },

    /**
     * Load template HTML from recu-index.html
     * @returns {Promise<string>} Template HTML content
     */
    async loadTemplateHTML() {
        // Return cached version if available
        if (this.templateCache) {
            console.log('✓ Using cached template');
            return this.templateCache;
        }

        try {
            console.log('📥 Loading template from /recu-template-word.html');
            const response = await fetch('/recu-template-word.html');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const html = await response.text();
            this.templateCache = html; // Cache for future use
            console.log('✓ Template loaded successfully');
            return html;

        } catch (error) {
            console.error('Failed to load template:', error);
            // Try relative path as fallback
            try {
                const response = await fetch('../recu-template-word.html');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const html = await response.text();
                this.templateCache = html;
                console.log('✓ Template loaded from fallback path');
                return html;
            } catch (fallbackError) {
                console.error('Fallback also failed:', fallbackError);
                throw new Error('Could not load receipt template. Please check if recu-index.html exists.');
            }
        }
    },

    /**
     * Replace placeholder fields with actual client data
     * @param {string} templateHTML - Template HTML content
     * @param {Object} clientData - Client data object
     * @returns {string} Populated HTML
     */
    populateTemplate(templateHTML, clientData) {
        console.log('🔄 Populating template with client data');

        let html = templateHTML;

        // Extract ilot number from parcel reference (e.g., "A-01-04" → "01")
        const ilotNumber = this.extractIlotNumber(clientData.parcelRef || clientData.parcel_ref);

        // Parse surface area (e.g., "300 m²" → "300")
        const surfaceArea = this.parseSurface(clientData.area || clientData.parcel_area);

        // Calculate amounts if not provided
        const totalPrice = clientData.price || clientData.priceNumeric || this.calculatePrice(surfaceArea);
        const depositAmount = clientData.deposit || clientData.depositNumeric || (totalPrice * 0.1);

        // Format amounts for display
        const formattedTotal = this.formatCurrency(totalPrice);
        const formattedDeposit = this.formatCurrency(depositAmount);

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
            '{SURFACE}': surfaceArea, // Alternative placeholder format
            '[PRIX TOTAL]': formattedTotal,
            '[PRIX_TOTAL]': formattedTotal, // Alternative format
            '[NOM PRÉNOMS]': clientData.name || clientData.full_name || 'N/A',
            '[SITE / LOCALITÉ]': clientData.location || 'Bindougousso',
            '[N° LOT]': clientData.parcelRef || clientData.parcel_ref || 'N/A'
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
    },

    /**
     * Extract ilot number from parcel reference
     * @param {string} parcelRef - Parcel reference (e.g., "A-01-04")
     * @returns {string} Ilot number
     */
    extractIlotNumber(parcelRef) {
        if (!parcelRef) return 'N/A';
        const parts = parcelRef.split('-');
        return parts.length >= 2 ? parts[1] : 'N/A';
    },

    /**
     * Parse surface area from string
     * @param {string} areaStr - Area string (e.g., "300 m²" or "300")
     * @returns {string} Numeric area
     */
    parseSurface(areaStr) {
        if (!areaStr) return '0';
        const match = String(areaStr).match(/\d+/);
        return match ? match[0] : '0';
    },

    /**
     * Calculate price based on area (15,000 FCFA per m²)
     * @param {number} area - Area in m²
     * @returns {number} Total price
     */
    calculatePrice(area) {
        return parseInt(area) * 15000;
    },

    /**
     * Format currency for display
     * @param {number|string} amount - Amount to format
     * @returns {string} Formatted currency (e.g., "4 582 500")
     */
    formatCurrency(amount) {
        const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d]/g, '')) : amount;
        if (isNaN(num)) return '0';
        return num.toLocaleString('fr-FR').replace(/,/g, ' ');
    },

    /**
     * Inject populated HTML into hidden container
     * @param {string} html - Populated HTML content
     */
    injectHTMLToContainer(html) {
        // Remove existing container if present
        this.cleanupContainer();

        // Create new hidden container
        const container = document.createElement('div');
        container.id = 'pdfTemplateContainer';
        container.style.cssText = `
            position: fixed;
            top: -10000px;
            left: -10000px;
            width: 909px;
            height: 1286px;
            overflow: hidden;
            background: white;
            z-index: -1;
        `;

        // Extract body content from template HTML
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        const bodyContent = bodyMatch ? bodyMatch[1] : html;

        // Extract and inject styles
        const styleMatches = html.match(/<style[^>]*>[\s\S]*?<\/style>/gi);
        let styles = '';
        if (styleMatches) {
            styles = styleMatches.join('\n');
        }

        container.innerHTML = styles + bodyContent;
        document.body.appendChild(container);

        console.log('✓ Template injected into hidden container');
    },

    /**
     * Wait for all images in container to load
     * @returns {Promise<void>}
     */
    async waitForImages() {
        const container = document.getElementById('pdfTemplateContainer');
        if (!container) return;

        const images = container.querySelectorAll('img');
        const promises = Array.from(images).map(img => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = resolve;
                    img.onerror = resolve; // Continue even if image fails
                }
            });
        });

        await Promise.all(promises);
        console.log('✓ All images loaded');
    },

    /**
     * Sleep utility
     * @param {number} ms - Milliseconds to sleep
     * @returns {Promise<void>}
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Render container to PDF using html2canvas + jsPDF
     * @param {Object} clientData - Client data for filename
     * @returns {Promise<void>}
     */
    async renderToPDF(clientData) {
        const container = document.getElementById('pdfTemplateContainer');
        if (!container) {
            throw new Error('Template container not found');
        }

        console.log('📸 Rendering HTML to canvas...');

        // Render with html2canvas
        const canvas = await html2canvas(container, {
            scale: 2, // Higher quality
            useCORS: true,
            allowTaint: false,
            logging: false,
            backgroundColor: '#ffffff',
            width: 909,
            height: 1286,
            windowWidth: 909,
            windowHeight: 1286
        });

        console.log('✓ Canvas rendered');
        console.log('📄 Creating PDF...');

        // Create PDF with jsPDF
        const { jsPDF } = window.jspdf;

        // A4 dimensions: 210mm x 297mm
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        // Calculate dimensions to fit A4
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Convert canvas to image
        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        // Add image to PDF
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

        console.log('✓ PDF created');

        // Generate filename
        const clientName = (clientData.name || clientData.full_name || 'Client').replace(/[^a-zA-Z0-9]/g, '_');
        const parcelRef = (clientData.parcelRef || clientData.parcel_ref || '000').replace(/[^a-zA-Z0-9]/g, '_');
        const date = new Date().toISOString().split('T')[0];
        const fileName = `AGEF_Recu_${parcelRef}_${clientName}_${date}.pdf`;

        // Download PDF
        pdf.save(fileName);
        console.log('💾 PDF downloaded:', fileName);
    },

    /**
     * Clean up hidden container
     */
    cleanupContainer() {
        const container = document.getElementById('pdfTemplateContainer');
        if (container) {
            container.remove();
        }
    }
};

// Export to global scope
window.AGEFPDFGenerator = AGEFPDFGenerator;
