-- =====================================================
-- AGEF - Migration: Table payment_config
-- =====================================================
-- Cette migration cree la table pour stocker les
-- configurations des methodes de paiement.
--
-- INSTRUCTIONS:
-- 1. Connectez-vous a votre projet Supabase
-- 2. Allez dans "SQL Editor"
-- 3. Copiez et collez ce script
-- 4. Cliquez sur "Run"
-- =====================================================

-- Supprimer la table si elle existe (optionnel, decommenter si necessaire)
-- DROP TABLE IF EXISTS payment_config;

-- =====================================================
-- 1. CREATION DE LA TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS payment_config (
    id SERIAL PRIMARY KEY,
    method_key VARCHAR(20) NOT NULL UNIQUE,
    phone_number VARCHAR(50) NOT NULL,
    beneficiary_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ajouter un commentaire a la table
COMMENT ON TABLE payment_config IS 'Configuration des methodes de paiement mobile money';
COMMENT ON COLUMN payment_config.method_key IS 'Cle unique: orange, wave, moov, mtn';
COMMENT ON COLUMN payment_config.phone_number IS 'Numero de telephone pour le paiement';
COMMENT ON COLUMN payment_config.beneficiary_name IS 'Nom du beneficiaire affiche aux clients';

-- =====================================================
-- 2. SECURITE - Row Level Security (RLS)
-- =====================================================
-- Activer RLS sur la table
ALTER TABLE payment_config ENABLE ROW LEVEL SECURITY;

-- Politique: Permettre la lecture par tous (clients)
CREATE POLICY "Lecture publique payment_config"
ON payment_config
FOR SELECT
USING (true);

-- Politique: Permettre l'insertion par tous (admin via URL directe)
CREATE POLICY "Insertion publique payment_config"
ON payment_config
FOR INSERT
WITH CHECK (true);

-- Politique: Permettre la mise a jour par tous (admin via URL directe)
CREATE POLICY "Mise a jour publique payment_config"
ON payment_config
FOR UPDATE
USING (true);

-- =====================================================
-- 3. DONNEES PAR DEFAUT
-- =====================================================
-- Inserer les configurations par defaut
INSERT INTO payment_config (method_key, phone_number, beneficiary_name) VALUES
('orange', '07 07 88 99 00', 'M. Kone / AGEF'),
('wave', '05 05 11 22 33', 'AGEF Depot'),
('moov', '01 01 22 33 44', 'AGEF Moov'),
('mtn', '05 04 55 66 77', 'AGEF MTN')
ON CONFLICT (method_key) DO NOTHING;

-- =====================================================
-- 4. FONCTION POUR MISE A JOUR AUTOMATIQUE
-- =====================================================
-- Creer une fonction pour mettre a jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Creer le trigger pour la mise a jour automatique
DROP TRIGGER IF EXISTS update_payment_config_updated_at ON payment_config;
CREATE TRIGGER update_payment_config_updated_at
    BEFORE UPDATE ON payment_config
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 5. VERIFICATION
-- =====================================================
-- Afficher le contenu de la table
SELECT * FROM payment_config ORDER BY method_key;

-- =====================================================
-- FIN DE LA MIGRATION
-- =====================================================
