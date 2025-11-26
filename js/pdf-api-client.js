/**
 * AGEF PDF API Client
 * Calls serverless Puppeteer function for industry-standard PDF generation
 */

const PDFAPIClient = {
    // API endpoint (Local server for testing)
    API_URL: 'http://localhost:3000/api/generate-pdf',

    /**
     * Generate and download PDF receipt
     * @param {Object} clientData - Formatted client object from database
     * @returns {Promise<boolean>} Success status
     */
    async generateReceipt(clientData) {
        try {
            console.log('🎯 Calling serverless PDF API for:', clientData.name || clientData.full_name);

            // Show loading state
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `HTTP error! status: ${response.status}`);
            }

            // Get PDF as blob
            const blob = await response.blob();

            // Extract filename from Content-Disposition header
            const contentDisposition = response.headers.get('Content-Disposition');
            let fileName = 'AGEF_Recu.pdf';

            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match) {
                    fileName = match[1];
                }
            }

            // Trigger download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            console.log('✅ PDF generated and downloaded successfully');
            return true;

        } catch (error) {
            console.error('❌ PDF generation failed:', error);
            alert('Erreur lors de la génération du PDF. Veuillez réessayer.\\n\\nDétails: ' + error.message);
            return false;
        }
    }
};

// Export to global scope
window.PDFAPIClient = PDFAPIClient;
