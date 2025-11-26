/**
 * AGEF Database Utility
 * Simple localStorage-based database for managing client subscriptions
 */

const AGEFDatabase = {
    // Database keys
    CLIENTS_KEY: 'agef_clients_database',
    COUNTER_KEY: 'agef_client_counter',

    /**
     * Initialize the database
     */
    init() {
        if (!localStorage.getItem(this.CLIENTS_KEY)) {
            localStorage.setItem(this.CLIENTS_KEY, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.COUNTER_KEY)) {
            localStorage.setItem(this.COUNTER_KEY, '1');
        }
    },

    /**
     * Get all clients
     * @returns {Array} Array of client objects
     */
    getAllClients() {
        this.init();
        const data = localStorage.getItem(this.CLIENTS_KEY);
        return JSON.parse(data) || [];
    },

    /**
     * Get a client by ID
     * @param {number} id - Client ID
     * @returns {Object|null} Client object or null if not found
     */
    getClientById(id) {
        const clients = this.getAllClients();
        return clients.find(client => client.id === parseInt(id)) || null;
    },

    /**
     * Search clients by name or phone
     * @param {string} nameQuery - Name to search for
     * @param {string} phoneQuery - Phone number to search for
     * @returns {Array} Array of matching clients
     */
    searchClients(nameQuery, phoneQuery) {
        const clients = this.getAllClients();

        if (!nameQuery && !phoneQuery) {
            return clients;
        }

        return clients.filter(client => {
            const matchName = !nameQuery ||
                client.fullName.toLowerCase().includes(nameQuery.toLowerCase());
            const matchPhone = !phoneQuery ||
                client.phone.includes(phoneQuery);
            return matchName && matchPhone;
        });
    },

    /**
     * Add a new client
     * @param {Object} clientData - Client data object
     * @returns {Object} The saved client with ID
     */
    addClient(clientData) {
        this.init();
        const clients = this.getAllClients();

        // Get next ID
        let counter = parseInt(localStorage.getItem(this.COUNTER_KEY));
        const newClient = {
            id: counter,
            ...clientData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Save client
        clients.push(newClient);
        localStorage.setItem(this.CLIENTS_KEY, JSON.stringify(clients));

        // Increment counter
        localStorage.setItem(this.COUNTER_KEY, String(counter + 1));

        return newClient;
    },

    /**
     * Update a client
     * @param {number} id - Client ID
     * @param {Object} updates - Fields to update
     * @returns {Object|null} Updated client or null if not found
     */
    updateClient(id, updates) {
        const clients = this.getAllClients();
        const index = clients.findIndex(client => client.id === parseInt(id));

        if (index === -1) {
            return null;
        }

        clients[index] = {
            ...clients[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        localStorage.setItem(this.CLIENTS_KEY, JSON.stringify(clients));
        return clients[index];
    },

    /**
     * Delete a client
     * @param {number} id - Client ID
     * @returns {boolean} True if deleted, false if not found
     */
    deleteClient(id) {
        const clients = this.getAllClients();
        const filteredClients = clients.filter(client => client.id !== parseInt(id));

        if (filteredClients.length === clients.length) {
            return false;
        }

        localStorage.setItem(this.CLIENTS_KEY, JSON.stringify(filteredClients));
        return true;
    },

    /**
     * Format a client object for display
     * @param {Object} client - Raw client object
     * @returns {Object} Formatted client object
     */
    formatClient(client) {
        // Calculate price details
        const totalPrice = this.calculatePrice(client.parcelArea);
        const deposit = Math.round(totalPrice * 0.10); // 10% deposit
        const remaining = totalPrice - deposit;

        return {
            id: client.id,
            name: client.fullName,
            type: "Personne physique",
            phone: client.phone,
            email: client.email || `client${client.id}@agef.bf`,
            saleType: "Vente de parcelles - " + (client.location || "Bindougousso"),
            location: `${client.location || "Bindougousso"}, ${client.parcelType || "Habitation Ordinaire (I.1)"}`,
            parcelRef: client.parcelRef || `A-${String(client.id).padStart(2, '0')}-01`,
            area: client.parcelArea || "300 m²",
            price: this.formatCurrency(totalPrice),
            priceNumeric: totalPrice,
            deposit: this.formatCurrency(deposit),
            depositNumeric: deposit,
            remaining: this.formatCurrency(remaining),
            remainingNumeric: remaining,
            paymentMethod: client.paymentMethod || "Non défini",
            subscriptionDate: client.createdAt ?
                new Date(client.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }) : '-',
            status: client.paymentStatus || "pending",
            statusLabel: this.getStatusLabel(client.paymentStatus),
            statusMessage: this.getStatusMessage(client.paymentStatus),
            transactionRef: client.transactionRef || `TXN${client.id}${Date.now().toString().slice(-6)}`,
            // Additional fields
            gender: client.gender,
            dateOfBirth: client.dateOfBirth,
            profession: client.profession,
            nationality: client.nationality,
            documentType: client.documentType,
            documentNumber: client.documentNumber,
            residence: client.residence
        };
    },

    /**
     * Calculate price based on area (simplified)
     * @param {string} areaStr - Area string like "300 m²"
     * @returns {number} Price in FCFA
     */
    calculatePrice(areaStr) {
        const area = parseInt(areaStr) || 300;
        const pricePerSqm = 15000; // 15,000 FCFA per square meter (example)
        return area * pricePerSqm;
    },

    /**
     * Format currency
     * @param {number} amount - Amount in FCFA
     * @returns {string} Formatted currency string
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    },

    /**
     * Get status label
     * @param {string} status - Status code
     * @returns {string} Status label
     */
    getStatusLabel(status) {
        const labels = {
            'pending': 'Paiement en attente',
            'partial': 'Paiement partiel',
            'paid': 'Payé',
            'cancelled': 'Annulé'
        };
        return labels[status] || 'Paiement en attente';
    },

    /**
     * Get status message
     * @param {string} status - Status code
     * @returns {string} Status message
     */
    getStatusMessage(status) {
        const messages = {
            'pending': 'Le client n\'a pas encore finalisé son paiement.',
            'partial': 'Le client a versé un acompte.',
            'paid': 'Le paiement a été finalisé avec succès.',
            'cancelled': 'La transaction a été annulée.'
        };
        return messages[status] || 'Le client n\'a pas encore finalisé son paiement.';
    },

    /**
     * Clear all data (use with caution!)
     */
    clearDatabase() {
        if (confirm('ATTENTION: Cela supprimera toutes les données clients. Continuer ?')) {
            localStorage.removeItem(this.CLIENTS_KEY);
            localStorage.removeItem(this.COUNTER_KEY);
            this.init();
            return true;
        }
        return false;
    },

    /**
     * Export database to JSON
     * @returns {string} JSON string of all data
     */
    exportDatabase() {
        return JSON.stringify({
            clients: this.getAllClients(),
            counter: localStorage.getItem(this.COUNTER_KEY),
            exportedAt: new Date().toISOString()
        }, null, 2);
    },

    /**
     * Import database from JSON
     * @param {string} jsonData - JSON string to import
     * @returns {boolean} Success status
     */
    importDatabase(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (data.clients && Array.isArray(data.clients)) {
                localStorage.setItem(this.CLIENTS_KEY, JSON.stringify(data.clients));
                if (data.counter) {
                    localStorage.setItem(this.COUNTER_KEY, data.counter);
                }
                return true;
            }
            return false;
        } catch (error) {
            console.error('Import error:', error);
            return false;
        }
    }
};

// Initialize on load
AGEFDatabase.init();
