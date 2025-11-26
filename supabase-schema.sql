-- ============================================
-- AGEF Client Database Schema (Supabase/PostgreSQL)
-- ============================================

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
    -- Primary Key & Timestamps
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Personal Information
    full_name TEXT NOT NULL,
    gender TEXT,
    date_of_birth DATE,
    phone TEXT NOT NULL,
    email TEXT,
    profession TEXT,
    nationality TEXT,
    residence TEXT,
    
    -- Document Information
    document_type TEXT,
    document_number TEXT,
    
    -- Parcel Information
    location TEXT NOT NULL,
    parcel_ref TEXT,
    parcel_area TEXT,
    parcel_type TEXT,
    
    -- Payment Information
    payment_method TEXT,
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'cancelled')),
    transaction_ref TEXT,
    
    -- Metadata
    terms_accepted BOOLEAN DEFAULT FALSE,
    
    -- Indexes for faster search
    CONSTRAINT phone_not_empty CHECK (char_length(phone) > 0),
    CONSTRAINT full_name_not_empty CHECK (char_length(full_name) > 0)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_clients_phone ON clients(phone);
CREATE INDEX IF NOT EXISTS idx_clients_full_name ON clients(full_name);
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_clients_payment_status ON clients(payment_status);

-- Enable Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow anyone to INSERT (for public form submission)
CREATE POLICY "Enable insert for everyone"
ON clients FOR INSERT
WITH CHECK (true);

-- Policy 2: Allow authenticated users to SELECT (for admin portal)
CREATE POLICY "Enable select for authenticated users only"
ON clients FOR SELECT
USING (auth.role() = 'authenticated');

-- Policy 3: Allow authenticated users to UPDATE (for admin edits)
CREATE POLICY "Enable update for authenticated users only"
ON clients FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Policy 4: Allow authenticated users to DELETE (for admin actions)
CREATE POLICY "Enable delete for authenticated users only"
ON clients FOR DELETE
USING (auth.role() = 'authenticated');

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON clients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create a view for formatted client data (useful for admin queries)
CREATE OR REPLACE VIEW clients_formatted AS
SELECT 
    id,
    full_name,
    phone,
    email,
    COALESCE(email, CONCAT('client', id, '@agef.bf')) as email_formatted,
    location,
    parcel_ref,
    parcel_area,
    parcel_type,
    payment_method,
    payment_status,
    transaction_ref,
    created_at,
    TO_CHAR(created_at, 'DD Month YYYY') as subscription_date_formatted,
    CASE 
        WHEN payment_status = 'pending' THEN 'Paiement en attente'
        WHEN payment_status = 'partial' THEN 'Paiement partiel'
        WHEN payment_status = 'paid' THEN 'Payé'
        WHEN payment_status = 'cancelled' THEN 'Annulé'
        ELSE 'Paiement en attente'
    END as status_label
FROM clients
ORDER BY created_at DESC;

-- Grant access to the view for authenticated users
GRANT SELECT ON clients_formatted TO authenticated;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ AGEF Database Schema created successfully!';
    RAISE NOTICE '📊 Table: clients';
    RAISE NOTICE '🔒 Row Level Security: ENABLED';
    RAISE NOTICE '👥 Policies: Public INSERT + Authenticated SELECT/UPDATE/DELETE';
END $$;
