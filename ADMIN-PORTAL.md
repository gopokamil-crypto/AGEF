# Admin Portal - Documentation

## Overview
The AGEF Administration Portal allows agents to search for clients, view their profiles, and generate receipts for land purchase transactions.

## Portal Structure

### 1. Client Management (admin-gestion-clients.html)
**URL:** `/pages/admin-gestion-clients.html`

**Features:**
- Search clients by name or phone number
- View search results in a table with:
  - Subscriber name and type
  - Phone number
  - Parcel information
  - Price and deposit details
  - Payment status
- Generate secure links with customizable expiration (1-365 days)
- Success banner showing generated links

**How to Use:**
1. Enter client name or phone number in the search fields
2. Click "Rechercher" to search
3. View results in the table below
4. Set the number of validity days for the link
5. Click "Générer" to create a secure client profile link
6. Copy the generated link from the success banner

### 2. Client Profile (admin-profile-client.html)
**URL:** `/pages/admin-profile-client.html?token=[TOKEN]&client=[ID]`

**Features:**
- Comprehensive client information display
- Status banner showing payment status
- Information sections:
  - Personal information (name, type, phone, email)
  - Parcel information (location, reference, area)
  - Financial information (total price, deposit, remaining balance)
  - Required documents list
  - Subscription details

**Actions:**
- Generate receipt
- Print profile

**How to Access:**
- Click on generated links from the Client Management page
- Direct URL with client ID parameter

### 3. Receipt Generation (admin-recu-client.html)
**URL:** `/pages/admin-recu-client.html?client=[ID]`

**Features:**
- Professional receipt layout with AGEF branding
- Receipt number (format: AGEF-2024-XXXX)
- Current date of issue
- Complete client information
- Property/parcel details
- Detailed payment table showing:
  - Total price
  - Deposit paid
  - Remaining balance
  - Amount paid (highlighted)
- Payment method and transaction reference
- Amount in words (French)
- Signature sections for client and agent
- Company footer with contact information

**Actions:**
- Print receipt (hides admin elements)
- Download PDF (planned)
- Email receipt (planned)

**How to Use:**
1. Access from client profile page
2. Review all information
3. Click "Imprimer le reçu" to print
4. Use browser's "Save as PDF" option for digital copies

## Mock Data

The portal currently uses mock data for 5 sample clients:

1. **Ouattara Aboubacar Sidiki** (ID: 1)
   - Phone: 64755831
   - Parcel: A-01-01, 250 m²
   - Price: 3,293,615 FCFA

2. **KONFE ABOUBACAR** (ID: 2)
   - Phone: 75587796
   - Parcel: A-01-04, 300 m²
   - Price: 4,582,500 FCFA

3. **BONKOUNGOU ABOUBACAR** (ID: 3)
   - Phone: +22665765379
   - Parcel: A-01-04, 300 m²
   - Price: 4,582,500 FCFA

4. **DAO ABOUBACAR** (ID: 4)
   - Phone: 75405218
   - Parcel: A-01-04, 300 m²
   - Price: 4,582,500 FCFA

5. **TRAORE Aboubacar** (ID: 5)
   - Phone: +22670574046
   - Parcel: A-01-05, 275 m²
   - Price: 3,555,500 FCFA

All clients have "Paiement en attente" (Payment pending) status.

## Design & Branding

- **Primary Color:** #2B8E38 (AGEF Green)
- **Font:** Manrope
- **Responsive:** Mobile-friendly design
- **Print-friendly:** Receipt page optimized for printing

## Navigation Flow

```
Admin Client Management
    ↓ (Search & Generate Link)
Client Profile
    ↓ (Generate Receipt)
Receipt Page
    ↓ (Print/Download)
```

## Future Enhancements

1. **Backend Integration**
   - Connect to real database
   - Implement actual authentication
   - Generate real tokens with expiration
   
2. **Receipt Features**
   - PDF generation library integration
   - Email sending functionality
   - Receipt history tracking

3. **Search Enhancements**
   - Advanced filters
   - Search by parcel reference
   - Date range filtering

4. **User Management**
   - Role-based access control
   - Agent assignment tracking
   - Audit logs

## Technical Notes

- All pages use the same AGEF design system
- JavaScript handles client-side data rendering
- URL parameters handle navigation state
- Mock data stored in JavaScript objects
- Responsive grid layouts
- Print media queries for receipt page

## Access URLs

- **Client Management:** http://localhost:8080/pages/admin-gestion-clients.html
- **Client Profile:** http://localhost:8080/pages/admin-profile-client.html?client=2
- **Receipt:** http://localhost:8080/pages/admin-recu-client.html?client=2

Replace client ID numbers (1-5) to view different client data.
