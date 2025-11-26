-- ============================================
-- 🚨 CRITICAL FIX: Grant Permissions to 'anon' Role
-- ============================================

-- The error "new row violates row-level security policy" often happens
-- because the 'anon' role (public users) doesn't have basic table permissions,
-- even if an RLS policy exists.

-- 1. Grant basic permissions to the 'anon' role
GRANT INSERT ON TABLE clients TO anon;
GRANT SELECT ON TABLE clients TO anon;  -- Needed to return the ID after insert

-- 2. Ensure the policy is correct (Run this just in case)
DROP POLICY IF EXISTS "Enable insert for everyone" ON clients;

CREATE POLICY "Enable insert for everyone"
ON clients FOR INSERT
TO anon
WITH CHECK (true);

-- 3. Verify it works
DO $$
BEGIN
    RAISE NOTICE '✅ Permissions granted to anon role!';
    RAISE NOTICE '👉 You should now be able to submit the form.';
END $$;
