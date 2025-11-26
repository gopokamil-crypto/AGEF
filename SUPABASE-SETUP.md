# 🚀 Supabase Setup Guide - AGEF Project

This guide will walk you through connecting your AGEF project to Supabase in **10 minutes**.

---

## 📋 Prerequisites

- A Supabase account (Free) - Sign up at https://supabase.com
- Your AGEF project files

---

## Step 1: Create Supabase Project

1. Go to https://supabase.com and click **"Start your project"**
2. Sign in with GitHub (recommended) or Email
3. Click **"New Project"**
4. Fill in:
   - **Name:** `AGEF-Production`
   - **Database Password:** Choose a strong password (save it!)
   - **Region:** Choose closest to Burkina Faso (e.g., `eu-west-1` or `us-east-1`)
5. Click **"Create new project"**
6. Wait ~2 minutes for the project to be ready

---

## Step 2: Run the Database Schema

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the file: `/Users/MAC/Documents/AGEF/supabase-schema.sql`
4. Copy the ENTIRE contents
5. Paste it into the SQL Editor
6. Click **"Run"** (or press `Ctrl+Enter`)
7. You should see: ✅ **Success. No rows returned**

---

## Step 3: Get Your API Credentials

1. Click **"Settings"** (⚙️ icon) in the left sidebar
2. Click **"API"** under Project Settings
3. You'll see two important values:

   **Copy these:**
   - **Project URL:** `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key:** `eyJhbGciOiJIUzI1NiIsInR5c.....` (long string)

---

## Step 4: Configure Your Project

1. Open: `/Users/MAC/Documents/AGEF/js/database-supabase.js`
2. Find lines 7-8:
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```
3. Replace with your actual credentials:
   ```javascript
   const SUPABASE_URL = 'https://xxxxxxxxxxxxx.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5c.....';
   ```
4. Save the file

---

## Step 5: Update HTML Files

Replace the old database script with the new one in these files:

### A. Payment Page (`pages/vente-terrain/paiement.html`)

**Find this line (~213):**
```html
<script src="../../js/database.js"></script>
```

**Replace with:**
```html
<!-- Supabase SDK -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<!-- AGEF Database (Cloud) -->
<script src="../../js/database-supabase.js"></script>
```

### B. Admin Client Management (`pages/admin-gestion-clients.html`)

**Find this line (~418):**
```html
<script src="../js/database.js"></script>
```

**Replace with:**
```html
<!-- Supabase SDK -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<!-- AGEF Database (Cloud) -->
<script src="../js/database-supabase.js"></script>
```

### C. Admin Client Profile (`pages/admin-profile-client.html`)

**Find this line (~458):**
```html
<script src="../js/database.js"></script>
```

**Replace with:**
```html
<!-- Supabase SDK -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<!-- AGEF Database (Cloud) -->
<script src="../js/database-supabase.js"></script>
```

### D. Test Database (`pages/test-database.html`)

**Find this line (~52):**
```html
<script src="../js/database.js"></script>
```

**Replace with:**
```html
<!-- Supabase SDK -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<!-- AGEF Database (Cloud) -->
<script src="../js/database-supabase.js"></script>
```

---

## Step 6: Update JavaScript Async Calls

Since Supabase uses async operations, we need to update the code that calls the database.

### A. Payment Page (`pages/vente-terrain/paiement.html`)

**Find the `sendProof` function (~274) and change line ~307 from:**
```javascript
const savedClient = AGEFDatabase.addClient(clientData);
console.log('Client saved with ID:', savedClient.id);
```

**To:**
```javascript
const savedClient = await AGEFDatabase.addClient(clientData);
console.log('Client saved with ID:', savedClient.id);
```

**Also make the function async by changing line 274 from:**
```javascript
function sendProof() {
```

**To:**
```javascript
async function sendProof() {
```

### B. Admin Client Management (`pages/admin-gestion-clients.html`)

**Find the `performSearch` function (~520) and change it from:**
```javascript
function performSearch() {
    const clients = AGEFDatabase.searchClients(nameQuery, phoneQuery);
    displayResults(clients);
}
```

**To:**
```javascript
async function performSearch() {
    const clients = await AGEFDatabase.searchClients(nameQuery, phoneQuery);
    displayResults(clients);
}
```

### C. Admin Client Profile (`pages/admin-profile-client.html`)

**Find the `loadClientData` function (~462) and change it from:**
```javascript
function loadClientData() {
    const rawClient = AGEFDatabase.getClientById(parseInt(clientId));
    // ... rest of code
}
```

**To:**
```javascript
async function loadClientData() {
    const rawClient = await AGEFDatabase.getClientById(parseInt(clientId));
    // ... rest of code
}
```

---

## Step 7: Test the Connection

1. Open your browser to: http://localhost:8080/pages/test-database.html
2. Open the browser console (F12)
3. You should see: `✅ AGEF Database connected to Supabase`
4. Click **"1. Create Test User"**
5. Check your Supabase dashboard:
   - Go to **"Table Editor"** → **"clients"**
   - You should see the new user! 🎉

---

## Step 8: Verify End-to-End

1. Go to: http://localhost:8080/pages/vente-terrain.html
2. Complete the full subscription flow
3. Go to: http://localhost:8080/pages/admin-gestion-clients.html
4. Search for your test user
5. The data should appear from the cloud! ☁️

---

## 🎉 Deployment Ready!

Your project now uses a **real cloud database**. When you deploy to Cloudflare Pages:
- Users submit forms → Data goes to Supabase Cloud ☁️
- Admins search → Data comes from Supabase Cloud ☁️
- Everyone sees the same data in real-time! ⚡

---

## 🔐 Security Notes

1. **anon key is PUBLIC:** It's safe to include in your frontend code
2. **Row Level Security (RLS):** Already configured in the schema
   - Anyone can INSERT (submit forms)
   - Only authenticated users can SELECT/UPDATE/DELETE (admin panel)
3. **Next step:** Add admin authentication (we'll do this next if you want)

---

## 📊 Monitoring

To see your data:
1. Open Supabase Dashboard
2. Click **"Table Editor"** → **"clients"**
3. View all submissions in real-time

---

## 🚨 Troubleshooting

### Error: "Supabase client not initialized"
- Make sure the Supabase SDK script is loaded BEFORE `database-supabase.js`

### Error: "Failed to fetch"
- Check your SUPABASE_URL and SUPABASE_ANON_KEY are correct
- Make sure you're online

### No data appears in admin panel
- Check browser console for errors
- Verify RLS policies are created (Step 2)

---

## ✅ Checklist

- [ ] Supabase project created
- [ ] Schema executed successfully
- [ ] API credentials copied
- [ ] `database-supabase.js` configured
- [ ] HTML files updated with Supabase SDK
- [ ] Async/await added to functions
- [ ] Test user created successfully
- [ ] End-to-end test passed

---

**Need help?** Ask me any questions!
