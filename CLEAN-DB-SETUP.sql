-- ============================================
-- CLEAN RESET: Drop All Policies and Recreate
-- ============================================
-- Run this ENTIRE script in Supabase SQL Editor

-- Step 1: Drop ALL existing policies (ignore errors if they don't exist)
DROP POLICY IF EXISTS "Enable insert for everyone" ON clients;
DROP POLICY IF EXISTS "Enable select for authenticated users only" ON clients;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON clients;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON clients;
DROP POLICY IF EXISTS "Allow anon insert" ON clients;
DROP POLICY IF EXISTS "public_insert_policy" ON clients;
DROP POLICY IF EXISTS "public_select_policy" ON clients;
DROP POLICY IF EXISTS "public_update_policy" ON clients;
DROP POLICY IF EXISTS "authenticated_delete_policy" ON clients;

-- Step 2: Grant permissions to anon and authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE clients TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Step 3: Create fresh policies
CREATE POLICY "public_insert_policy" 
ON clients FOR INSERT 
WITH CHECK (true);

CREATE POLICY "public_select_policy" 
ON clients FOR SELECT 
USING (true);

CREATE POLICY "public_update_policy" 
ON clients FOR UPDATE 
USING (true) 
WITH CHECK (true);

CREATE POLICY "authenticated_delete_policy" 
ON clients FOR DELETE 
USING (auth.role() = 'authenticated');

-- Step 4: Verify
SELECT 'SUCCESS! Policies created and permissions granted!' as status;
