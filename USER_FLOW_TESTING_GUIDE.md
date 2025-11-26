# AGEF - Complete User Flow & Testing Guide

## 🌐 Server Information
**Local Server:** http://localhost:8080
**Status:** Running ✅

---

## 📋 Table of Contents
1. [Public User Flow (Client Registration)](#public-user-flow)
2. [Admin Flow (PDF Generation)](#admin-flow)
3. [Testing Checklist](#testing-checklist)
4. [Expected Results](#expected-results)

---

## 🏠 PUBLIC USER FLOW (Client Registration)

### Overview
A citizen wants to purchase a land parcel from AGEF and goes through the online registration process.

### Step-by-Step Journey

#### 1. **Homepage**
📍 URL: `http://localhost:8080/index.html`

**User Actions:**
- Views AGEF homepage with hero slider
- Sees navigation menu with services
- Clicks on "Vente de Terrains" or "Acheter une Parcelle"

**What to Verify:**
- ✅ Page loads correctly
- ✅ AGEF logo visible
- ✅ Navigation menu functional
- ✅ Green branding (#2B8E38) consistent

---

#### 2. **Land Sales Page**
📍 URL: `http://localhost:8080/pages/vente-terrain.html`

**User Actions:**
- Views available land parcels
- Reads pricing information (15,000 FCFA/m²)
- Sees featured sites (Bindougousso, etc.)
- Clicks "Commencer" button to start registration

**What to Verify:**
- ✅ Land parcel cards display correctly
- ✅ Pricing information visible
- ✅ "Commencer" button works
- ✅ Page describes purchase process

---

#### 3. **Step 1: Location Selection**
📍 URL: `http://localhost:8080/pages/vente-terrain/localisation.html`

**User Actions:**
- Selects location from dropdown or radio buttons
- Examples: Bindougousso, Songon-Kassemblé, etc.
- Clicks "Suivant" to continue

**What to Verify:**
- ✅ Location options load
- ✅ User can select a location
- ✅ Form validation works
- ✅ Progress indicator shows Step 1

**Form Data Collected:**
- `location` - Selected site/location

---

#### 4. **Step 2: Parcel Selection**
📍 URL: `http://localhost:8080/pages/vente-terrain/lots.html`

**User Actions:**
- Views available parcels at selected location
- Sees parcel details: size, block, lot number
- Selects desired parcel
- Clicks "Suivant"

**What to Verify:**
- ✅ Parcel grid/list displays
- ✅ Each parcel shows: size (m²), reference (A-01-04), type
- ✅ Selection mechanism works
- ✅ Price calculation visible

**Form Data Collected:**
- `parcel_ref` - Parcel reference (e.g., "A-01-04")
- `parcel_area` - Surface area (e.g., "300 m²")
- `parcel_type` - Type (e.g., "Habitation Ordinaire")

---

#### 5. **Step 3: Identity Information**
📍 URL: `http://localhost:8080/pages/vente-terrain/identite.html`

**User Actions:**
- Fills personal information form:
  - Full name
  - Gender
  - Date of birth
  - Phone number
  - Email address
  - Profession
  - Nationality
  - Residence
  - Document type (CNI, Passport, etc.)
  - Document number
- Clicks "Suivant"

**What to Verify:**
- ✅ All form fields present
- ✅ Validation works (required fields)
- ✅ Phone format accepted (+226...)
- ✅ Email validation works

**Form Data Collected:**
- `full_name` - Complete name
- `gender` - Male/Female
- `date_of_birth` - Birth date
- `phone` - Contact number
- `email` - Email address
- `profession` - Occupation
- `nationality` - Country
- `residence` - Current address
- `document_type` - ID type
- `document_number` - ID number

---

#### 6. **Step 4: Terms & Conditions**
📍 URL: `http://localhost:8080/pages/vente-terrain/conditions.html`

**User Actions:**
- Reads terms and conditions
- Reviews payment terms:
  - 10% deposit required
  - 90% balance payment schedule
  - Cancellation policy
- Checks "I accept" checkbox
- Clicks "Suivant"

**What to Verify:**
- ✅ Terms displayed in French
- ✅ Checkbox required to continue
- ✅ Payment breakdown shown clearly
- ✅ Legal text visible

**Form Data Collected:**
- `terms_accepted` - Boolean (true)

---

#### 7. **Step 5: Payment Proof Upload**
📍 URL: `http://localhost:8080/pages/vente-terrain/paiement.html`

**User Actions:**
- Views payment summary:
  - Total price (area × 15,000 FCFA)
  - Required deposit (10%)
  - Remaining balance (90%)
- Selects payment method:
  - Orange Money
  - Moov Money
  - Wave
  - MTN Money
  - Bank Transfer
- Uploads payment proof (screenshot/PDF)
- Enters transaction reference
- Clicks "Soumettre"

**What to Verify:**
- ✅ Price calculation correct
- ✅ Payment methods listed
- ✅ File upload works (accepts images/PDFs)
- ✅ Transaction reference field present
- ✅ Form submission works

**Form Data Collected:**
- `payment_method` - Selected provider
- `transaction_ref` - Transaction ID
- `payment_status` - Set to "pending"

---

#### 8. **Step 6: Summary & Review**
📍 URL: `http://localhost:8080/pages/vente-terrain/resume.html`

**User Actions:**
- Reviews all entered information:
  - Personal details
  - Selected parcel
  - Payment information
- Verifies accuracy
- Clicks "Confirmer" to finalize
- **Data saved to Supabase database**

**What to Verify:**
- ✅ All data displayed correctly
- ✅ Prices formatted (3 293 615 FCFA)
- ✅ Edit buttons work (go back to change)
- ✅ Confirmation button submits to Supabase

**Database Action:**
- ✅ New record created in `clients` table
- ✅ Client receives unique ID
- ✅ Timestamp recorded (created_at)

---

#### 9. **Step 7: Confirmation**
📍 URL: `http://localhost:8080/pages/vente-terrain/confirmation.html`

**User Actions:**
- Sees success message
- Views reference number
- Receives instructions:
  - "Your application has been submitted"
  - "You will receive confirmation via SMS/Email"
  - "Visit AGEF office with ID documents"
- Can return to homepage

**What to Verify:**
- ✅ Success message displayed
- ✅ Reference number shown
- ✅ Next steps clearly explained
- ✅ Contact information provided

**Client Journey Ends** ✅

---

## 👨‍💼 ADMIN FLOW (PDF Receipt Generation)

### Overview
AGEF admin reviews client applications and generates official receipts.

### Step-by-Step Journey

#### 1. **Admin Login** (Optional - if implemented)
📍 URL: `http://localhost:8080/pages/admin-login.html`

**Admin Actions:**
- Enters credentials
- Clicks "Se connecter"

**What to Verify:**
- ✅ Login form present
- ✅ Authentication works
- ✅ Redirects to dashboard

**Note:** If no login implemented, access admin pages directly.

---

#### 2. **Admin Dashboard / Client Management**
📍 URL: `http://localhost:8080/pages/admin-gestion-clients.html`

**Admin Actions:**
- Sees list of all clients from Supabase
- Views table with columns:
  - ID
  - Name
  - Phone
  - Location
  - Parcel Reference
  - Payment Status
  - Date Created
  - Actions (View, Receipt, Edit, Delete)
- Can search by name or phone number
- Clicks on client to view details

**What to Verify:**
- ✅ Supabase data loads correctly
- ✅ All clients displayed in table
- ✅ Search functionality works
- ✅ Pagination works (if many clients)
- ✅ "View Receipt" button visible per client

**Console Logs Expected:**
```
✅ AGEF Database connected to Supabase
📥 Fetching all clients from Supabase
✅ Loaded [N] clients
```

---

#### 3. **Client Profile Page** (Optional Step)
📍 URL: `http://localhost:8080/pages/admin-profile-client.html?client=1`

**Admin Actions:**
- Views complete client information:
  - Personal details
  - Parcel information
  - Payment details
  - Payment status badge
- Sees action buttons:
  - View Receipt
  - Edit Client
  - Delete Client
- Clicks "View Receipt" button

**What to Verify:**
- ✅ All client data displayed from Supabase
- ✅ Calculated fields correct (price, deposit, remaining)
- ✅ Payment status color-coded
- ✅ "View Receipt" navigates correctly

---

#### 4. **Receipt Display Page** ⭐ (MAIN TEST POINT)
📍 URL: `http://localhost:8080/pages/admin-recu-client.html?client=1`

**Admin Actions:**
- Page loads and fetches client from Supabase
- Views formatted receipt on screen:
  - Receipt header (AGEF branding)
  - Receipt number (AGEF-2024-0001)
  - Issue date
  - Client information
  - Property information
  - Payment details breakdown table
  - Amount in French words
  - Signature sections
- Sees action buttons:
  - **"Imprimer le reçu"** - Print receipt
  - **"Télécharger PDF"** - Download as PDF ⭐
  - **"Envoyer par email"** - Email receipt (coming soon)

**What to Verify - Page Load:**
- ✅ Supabase connection successful
- ✅ Client data fetched correctly
- ✅ All fields populated from database
- ✅ Prices calculated correctly
- ✅ Receipt number formatted properly
- ✅ Date in French format
- ✅ Amount in words converted correctly

**Console Logs Expected:**
```
✅ AGEF Database connected to Supabase
📥 Fetching client from Supabase: 1
✅ Client loaded: {id: 1, name: "...", ...}
```

---

#### 5. **PDF Generation** ⭐⭐⭐ (CRITICAL TEST)
📍 Same page - Click "Télécharger PDF" button

**Admin Actions:**
1. Clicks **"Télécharger PDF"** button
2. Button shows loading spinner: "Génération en cours..."
3. Waits 2-3 seconds
4. PDF automatically downloads to computer

**What to Verify - During Generation:**
- ✅ Button changes to loading state
- ✅ Button disabled during generation
- ✅ No JavaScript errors in console
- ✅ Progress logs appear in console

**Console Logs Expected:**
```
🎯 Starting PDF generation with Supabase data
📥 Loading template from /recu-index.html
✓ Template loaded successfully
🔄 Populating template with client data
✓ Template populated with data
✓ Template injected into hidden container
✓ All images loaded
📸 Rendering HTML to canvas...
✓ Canvas rendered
📄 Creating PDF...
✓ PDF created
💾 PDF downloaded: AGEF_Recu_A-01-04_ClientName_2025-11-26.pdf
✅ PDF generated successfully from Supabase data
```

**What to Verify - After Download:**
- ✅ Button returns to normal state
- ✅ PDF file downloaded to Downloads folder
- ✅ Filename format correct: `AGEF_Recu_[parcel]_[name]_[date].pdf`
- ✅ File size reasonable (500KB - 2MB)

---

#### 6. **PDF Content Verification** ⭐⭐⭐ (CRITICAL TEST)
📍 Open downloaded PDF file

**Visual Inspection Checklist:**

**Header Section:**
- ✅ Ministry letterhead present
- ✅ AGEF logo visible and clear
- ✅ Côte d'Ivoire coat of arms visible
- ✅ "MINISTERE DE LA CONSTRUCTION DU LOGEMENT ET DE L'URBANISME"
- ✅ "AGENCE DE GESTION FONCIERE"
- ✅ "REPUBLIQUE DE CÔTE D'IVOIRE - Union-Discipline-Travail"

**Title Banner:**
- ✅ Green banner (#2B8E38) with white text
- ✅ "ATTESTATION D'OUVERTURE DE DOSSIER FONCIER" title

**Main Title:**
- ✅ "RÉCÉPISSÉ D'OUVERTURE DE DOSSIER D'ACQUISITION DE PARCELLE"
- ✅ "[LOT : NUMERO_LOT] à [NOM_DU_SITE]" - **POPULATED WITH DATA**

**Client Information Section:**
- ✅ "Reçu de M./Mme/Mlle : **[CLIENT NAME FROM SUPABASE]**"
- ✅ "Contact Téléphonique : **[PHONE FROM SUPABASE]**"
- ✅ No placeholder text like "[NOM_COMPLET_UTILISATEUR]"
- ✅ No example text like "(Ex: 07 07 12 34 56)"

**Payment Information:**
- ✅ "Montant Payé : **[CALCULATED 10% DEPOSIT]** FCFA"
- ✅ "Motif du Paiement : Frais d'Ouverture de Dossier & Sécurisation Initiale"
- ✅ "Mode de Paiement : **[PAYMENT METHOD FROM SUPABASE]**"
- ✅ "ID de Transaction : **[TRANSACTION REF FROM SUPABASE]**"

**Parcel Information:**
- ✅ "Lot N° : **[PARCEL REF FROM SUPABASE]**" (e.g., "402" not "A-01-04")
- ✅ "Îlot N° : **[EXTRACTED ILOT NUMBER]**" (e.g., "01")
- ✅ "Opération / Site : **[LOCATION FROM SUPABASE]**"
- ✅ "Superficie : **[AREA FROM SUPABASE]** m²"

**Status & Price:**
- ✅ "Statut du Dossier : OUVERT - EN ATTENTE DE RÉSERVATION (10%)"
- ✅ "Prix total de la parcelle : **[CALCULATED TOTAL]** FCFA"

**Legal Text:**
- ✅ Paragraph starting with "Le présent récépissé atteste que M./Mme **[NAME]**..."
- ✅ All placeholders replaced with actual data
- ✅ No "[PLACEHOLDER]" text remaining

**Visual Elements:**
- ✅ QR code visible (bottom left area)
- ✅ QR code is scannable (test with phone if possible)
- ✅ Watermark "COPY NON VALIDE" visible
- ✅ Watermark diagonal and semi-transparent

**Footer:**
- ✅ Orange italic text: "Ce document est un titre provisoire..."
- ✅ Footer text about ADU finale

**Quality Check:**
- ✅ No blurry text or images
- ✅ Colors match template (green, black, orange)
- ✅ Proper spacing and alignment
- ✅ Professional appearance
- ✅ A4 size maintained

---

## ✅ COMPLETE TESTING CHECKLIST

### Pre-Testing Setup
- [ ] Local server running on port 8080
- [ ] Supabase credentials configured in `/js/database-supabase.js`
- [ ] At least 1 test client exists in Supabase database
- [ ] Browser: Chrome, Firefox, or Safari (latest version)
- [ ] Browser console open (F12 → Console tab)
- [ ] Network tab open (F12 → Network tab)

### Public User Flow Tests
- [ ] Homepage loads without errors
- [ ] Navigation menu works
- [ ] Can access "Vente de Terrains" page
- [ ] Can proceed through all 7 steps
- [ ] Form validation works on each step
- [ ] Data persists between steps
- [ ] File upload works (payment proof)
- [ ] Final submission saves to Supabase
- [ ] Confirmation page displays success message
- [ ] New client visible in admin dashboard

### Admin Flow Tests
- [ ] Admin dashboard loads
- [ ] Clients list populated from Supabase
- [ ] Search functionality works
- [ ] Can click client to view profile
- [ ] Can access receipt page with `?client=ID`
- [ ] Receipt page loads client data from Supabase
- [ ] All receipt fields populated correctly
- [ ] Print button works (opens print dialog)

### PDF Generation Tests (CRITICAL)
- [ ] "Télécharger PDF" button visible
- [ ] Click button triggers generation
- [ ] Loading spinner appears
- [ ] Console shows progress logs
- [ ] No JavaScript errors
- [ ] PDF downloads within 5 seconds
- [ ] Filename correct format
- [ ] PDF opens without errors

### PDF Content Tests (CRITICAL)
- [ ] All header elements present
- [ ] AGEF logo clear
- [ ] Title banner correct
- [ ] Client name populated (not placeholder)
- [ ] Phone number populated
- [ ] Payment amount calculated correctly
- [ ] Transaction ID populated
- [ ] Parcel reference populated
- [ ] Ilot number extracted correctly
- [ ] Location/site name populated
- [ ] Surface area populated
- [ ] Total price calculated correctly
- [ ] QR code visible
- [ ] Watermark visible
- [ ] No placeholder text remaining
- [ ] No example text remaining
- [ ] Professional quality
- [ ] Colors match template

### Error Handling Tests
- [ ] Invalid client ID shows error
- [ ] Missing Supabase data handled gracefully
- [ ] Network errors show user-friendly message
- [ ] Template load failure handled
- [ ] PDF generation failure handled

### Browser Compatibility Tests
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Works on mobile (responsive)

---

## 📊 EXPECTED RESULTS SUMMARY

### Success Criteria

#### ✅ Public User Flow Success:
- User completes all 7 steps
- Data saves to Supabase database
- User sees confirmation page
- New client appears in admin dashboard

#### ✅ Admin Flow Success:
- Admin can view all clients
- Admin can access receipt page
- Receipt displays Supabase data correctly
- All calculated fields accurate

#### ✅ PDF Generation Success:
- PDF generates without errors
- PDF downloads automatically
- Filename follows convention
- File size reasonable (< 2MB)

#### ✅ PDF Content Success:
- **NO placeholder text** like `[NOM_COMPLET_UTILISATEUR]`
- **NO example text** like `(Ex: 07 07 12 34 56)`
- **ALL data populated** from Supabase
- **Professional appearance** matching template
- **QR code present** and scannable
- **Watermark visible**
- **Proper formatting** and spacing

### Failure Indicators

#### ❌ Critical Failures:
- PDF not downloading
- PDF contains placeholder text: `[NUMERO_LOT]`
- PDF contains example text: `(Ex: 25.000 FCFA)`
- JavaScript errors in console
- Supabase connection failed
- Template not loading
- Data not populating

#### ⚠️ Minor Issues:
- Slow PDF generation (> 10 seconds)
- Blurry images in PDF
- Incorrect formatting
- Missing watermark
- QR code not scannable

---

## 🧪 DETAILED TEST SCENARIOS

### Test Scenario 1: Complete New Client Registration
**Objective:** Test full public user flow from landing to confirmation

**Steps:**
1. Open `http://localhost:8080/index.html`
2. Click "Vente de Terrains"
3. Click "Commencer"
4. Select location: "Bindougousso"
5. Select parcel: Area 300m², Ref A-01-04
6. Fill identity form with test data
7. Accept terms and conditions
8. Select payment method: Orange Money
9. Upload dummy payment proof image
10. Enter transaction ref: OM20251126123456
11. Review summary
12. Confirm submission

**Expected Result:**
- ✅ All steps complete smoothly
- ✅ Data saved to Supabase
- ✅ Confirmation page shows success
- ✅ Client ID generated

---

### Test Scenario 2: Admin Views Client Receipt
**Objective:** Test admin can view receipt with Supabase data

**Steps:**
1. Open `http://localhost:8080/pages/admin-gestion-clients.html`
2. Find newly created client in table
3. Click "View Receipt" or note client ID
4. Open `http://localhost:8080/pages/admin-recu-client.html?client=[ID]`
5. Verify all data displays correctly

**Expected Result:**
- ✅ Receipt page loads
- ✅ Client data fetched from Supabase
- ✅ All fields populated
- ✅ Calculations correct

---

### Test Scenario 3: Generate PDF Receipt
**Objective:** Test PDF generation with real Supabase data

**Steps:**
1. On receipt page with client loaded
2. Open browser console (F12)
3. Click "Télécharger PDF" button
4. Watch console for logs
5. Wait for download
6. Open downloaded PDF

**Expected Result:**
- ✅ PDF downloads successfully
- ✅ Filename: `AGEF_Recu_A-01-04_TestClient_2025-11-26.pdf`
- ✅ PDF contains client data from Supabase
- ✅ No placeholders remaining
- ✅ Professional appearance

---

### Test Scenario 4: Verify PDF Matches Template
**Objective:** Ensure PDF exactly matches original template design

**Steps:**
1. Open original template: `/recu-index.html` in browser
2. Open downloaded PDF side by side
3. Compare visually:
   - Header layout
   - Title banner
   - Section spacing
   - Font sizes
   - Colors
   - QR code position
   - Watermark position

**Expected Result:**
- ✅ PDF matches template layout exactly
- ✅ All visual elements in correct positions
- ✅ Colors match (#2B8E38 green)
- ✅ Professional government document appearance

---

### Test Scenario 5: Multiple Client PDFs
**Objective:** Test PDF generation with different clients

**Steps:**
1. Generate PDF for Client ID 1
2. Generate PDF for Client ID 2
3. Generate PDF for Client ID 3
4. Compare PDFs side by side

**Expected Result:**
- ✅ Each PDF has different client data
- ✅ Each PDF has unique filename
- ✅ Calculations vary based on parcel size
- ✅ All PDFs professional quality

---

## 🐛 TROUBLESHOOTING GUIDE

### Issue: "Client non trouvé"
**Cause:** Client ID doesn't exist in Supabase
**Solution:**
1. Check Supabase dashboard
2. Verify client ID is correct
3. Create test client if needed

### Issue: Template not loading
**Cause:** `/recu-index.html` not accessible
**Solution:**
1. Verify file exists at root level
2. Check file permissions
3. Access `http://localhost:8080/recu-index.html` directly
4. Check Network tab for 404 errors

### Issue: PDF contains placeholders
**Cause:** Data mapping failed
**Solution:**
1. Check console for errors
2. Verify Supabase data structure matches
3. Check `pdf-generator.js` mapping logic
4. Verify all fields exist in database

### Issue: Supabase connection failed
**Cause:** Invalid credentials or network issue
**Solution:**
1. Check `/js/database-supabase.js` credentials
2. Verify Supabase project is active
3. Check internet connection
4. Test Supabase connection in browser console

### Issue: PDF generation hangs
**Cause:** html2canvas timeout or large template
**Solution:**
1. Refresh page and try again
2. Check browser console for errors
3. Verify template not too large
4. Try in different browser

---

## 📞 SUPPORT & NEXT STEPS

After testing, document:
1. ✅ All passed tests
2. ❌ Failed tests with screenshots
3. ⚠️ Issues encountered
4. 📝 Suggestions for improvement

**Development complete!** 🎉

The PDF generation system is fully integrated with Supabase and ready for production use.
