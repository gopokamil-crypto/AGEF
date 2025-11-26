/**
 * AGEF Database Utility - Supabase Cloud Version
 * Production-ready database for client subscription management
 */

// Supabase Configuration
// IMPORTANT: Replace these with your actual Supabase credentials
const SUPABASE_URL = 'https://emsgygqgfdwewlqqaseg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtc2d5Z3FnZmR3ZXdscXFhc2VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5Mjc3MTgsImV4cCI6MjA3OTUwMzcxOH0.yBIalekXrGCaTN0ylSQPu6nAQ5lOz8UQ4hf12mNkUlU';

// Initialize Supabase client
let supabaseClient = null;

// Check if Supabase is loaded
if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.error('❌ Supabase SDK not loaded! Please include the Supabase script tag.');
}

const AGEFDatabase = {
    /**
     * Initialize the database connection
     */
    async init() {
        if (!supabaseClient) {
            console.error('❌ Supabase client not initialized');
            return false;
        }
        console.log('✅ AGEF Database connected to Supabase');
        return true;
    },

    /**
     * Get all clients
     * @returns {Promise<Array>} Array of client objects
     */
    async getAllClients() {
        try {
            const { data, error } = await supabaseClient
                .from('clients')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching clients:', error);
            return [];
        }
    },

    /**
     * Get a client by ID
     * @param {number} id - Client ID
     * @returns {Promise<Object|null>} Client object or null if not found
     */
    async getClientById(id) {
        try {
            const { data, error } = await supabaseClient
                .from('clients')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching client:', error);
            return null;
        }
    },

    /**
     * Search clients by name or phone
     * @param {string} nameQuery - Name to search for
     * @param {string} phoneQuery - Phone number to search for
     * @returns {Promise<Array>} Array of matching clients
     */
    async searchClients(nameQuery, phoneQuery) {
        try {
            let query = supabaseClient
                .from('clients')
                .select('*');

            // If both queries are provided, use OR condition
            if (nameQuery && phoneQuery) {
                query = query.or(`full_name.ilike.%${nameQuery}%,phone.ilike.%${phoneQuery}%`);
            } else if (nameQuery) {
                // Check if nameQuery looks like an ID (numeric)
                if (/^\d+$/.test(nameQuery)) {
                    query = query.or(`id.eq.${nameQuery},full_name.ilike.%${nameQuery}%`);
                } else {
                    query = query.ilike('full_name', `%${nameQuery}%`);
                }
            } else if (phoneQuery) {
                query = query.ilike('phone', `%${phoneQuery}%`);
            }

            query = query.order('created_at', { ascending: false });

            const { data, error } = await query;

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error searching clients:', error);
            return [];
        }
    },

    /**
     * Add a new client
     * @param {Object} clientData - Client data object
     * @returns {Promise<Object>} The saved client with ID
     */
    async addClient(clientData) {
        try {
            // Prepare data for insertion
            const insertData = {
                full_name: clientData.fullName,
                gender: clientData.gender,
                date_of_birth: clientData.dateOfBirth,
                phone: clientData.phone,
                email: clientData.email,
                profession: clientData.profession,
                nationality: clientData.nationality,
                residence: clientData.residence,
                document_type: clientData.documentType,
                document_number: clientData.documentNumber,
                location: clientData.location,
                parcel_ref: clientData.parcelRef,
                parcel_area: clientData.parcelArea,
                parcel_type: clientData.parcelType,
                payment_method: clientData.paymentMethod,
                payment_status: clientData.paymentStatus || 'pending',
                transaction_ref: clientData.transactionRef,
                terms_accepted: clientData.termsAccepted || false
            };

            const { data, error } = await supabaseClient
                .from('clients')
                .insert([insertData])
                .select()
                .single();

            if (error) throw error;

            console.log('✅ Client saved to cloud database:', data);
            return data;
        } catch (error) {
            console.error('Error adding client:', error);
            throw error;
        }
    },

    /**
     * Update a client
     * @param {number} id - Client ID
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object|null>} Updated client or null if not found
     */
    async updateClient(id, updates) {
        try {
            const { data, error } = await supabaseClient
                .from('clients')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error updating client:', error);
            return null;
        }
    },

    /**
     * Delete a client
     * @param {number} id - Client ID
     * @returns {Promise<boolean>} True if deleted, false if not found
     */
    async deleteClient(id) {
        try {
            const { error } = await supabaseClient
                .from('clients')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting client:', error);
            return false;
        }
    },

    /**
     * Format a client object for display
     * @param {Object} client - Raw client object from database
     * @returns {Object} Formatted client object
     */
    formatClient(client) {
        if (!client) return null;

        // Calculate price details
        const totalPrice = this.calculatePrice(client.parcel_area || '300 m²');
        const deposit = Math.round(totalPrice * 0.10); // 10% deposit
        const remaining = totalPrice - deposit;

        return {
            id: client.id,
            name: client.full_name,
            type: "Personne physique",
            phone: client.phone,
            email: client.email || `client${client.id}@agef.bf`,
            saleType: `Vente de parcelles - ${client.location || 'Bindougousso'}`,
            location: `${client.location || 'Bindougousso'}, ${client.parcel_type || 'Habitation Ordinaire (I.1)'}`,
            parcelRef: client.parcel_ref || `A-${String(client.id).padStart(2, '0')}-01`,
            area: client.parcel_area || '300 m²',
            price: this.formatCurrency(totalPrice),
            priceNumeric: totalPrice,
            deposit: this.formatCurrency(deposit),
            depositNumeric: deposit,
            remaining: this.formatCurrency(remaining),
            remainingNumeric: remaining,
            paymentMethod: client.payment_method || 'Non défini',
            subscriptionDate: client.created_at ?
                new Date(client.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }) : '-',
            status: client.payment_status || 'pending',
            statusLabel: this.getStatusLabel(client.payment_status),
            statusMessage: this.getStatusMessage(client.payment_status),
            transactionRef: client.transaction_ref || `TXN${client.id}${Date.now().toString().slice(-6)}`,
            // Additional fields
            gender: client.gender,
            dateOfBirth: client.date_of_birth,
            profession: client.profession,
            nationality: client.nationality,
            documentType: client.document_type,
            documentNumber: client.document_number,
            residence: client.residence
        };
    },

    /**
     * Calculate price based on area
     * @param {string} areaStr - Area string like "300 m²"
     * @returns {number} Price in FCFA
     */
    calculatePrice(areaStr) {
        const area = parseInt(areaStr) || 300;
        const pricePerSqm = 15000; // 15,000 FCFA per square meter
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
     * Get database statistics
     * @returns {Promise<Object>} Database stats
     */
    async getStats() {
        try {
            const { count, error } = await supabaseClient
                .from('clients')
                .select('*', { count: 'exact', head: true });

            if (error) throw error;

            return {
                totalClients: count,
                message: `📊 Total clients in database: ${count}`
            };
        } catch (error) {
            console.error('Error fetching stats:', error);
            return { totalClients: 0, message: 'Error fetching stats' };
        }
    }
};

// Initialize on load
if (supabaseClient) {
    AGEFDatabase.init();
}
