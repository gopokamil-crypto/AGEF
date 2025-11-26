#!/bin/bash

echo "Re-downloading all AGEF pages with complete HTML content..."

# Create backup directory
mkdir -p pages_backup
cp -r pages/* pages_backup/ 2>/dev/null || true

# Download all pages with complete HTML
echo "Downloading: About page..."
curl -L "https://www.agef.ci/about/" -o pages/about.html

echo "Downloading: Contact page..."
curl -L "https://www.agef.ci/contact/" -o pages/contact.html

echo "Downloading: Réalisations page..."
curl -L "https://www.agef.ci/realisations/" -o pages/realisations.html

# Services pages
echo "Downloading: Amenagement foncier..."
curl -L "https://www.agef.ci/amenagement-foncier/" -o pages/amenagement-foncier.html

echo "Downloading: Commercialisation terrains..."
curl -L "https://www.agef.ci/commercialisation-terrains/" -o pages/commercialisation-terrains.html

echo "Downloading: Réserves foncières..."
curl -L "https://www.agef.ci/reserves-foncieres/" -o pages/reserves-foncieres.html

echo "Downloading: Sécurisation foncière..."
curl -L "https://www.agef.ci/securisation-fonciere/" -o pages/securisation-fonciere.html

echo "Downloading: Ingénierie foncière..."
curl -L "https://www.agef.ci/ingenierie-fonciere/" -o pages/ingenierie-fonciere.html

# Procédures pages
echo "Downloading: Procédures ACD..."
curl -L "https://www.agef.ci/procedures-acd/" -o pages/procedures-acd.html

echo "Downloading: Procédure mutation..."
curl -L "https://www.agef.ci/procedure-mutation/" -o pages/procedure-mutation.html

echo "Downloading: Lots de compensation..."
curl -L "https://www.agef.ci/lots-de-compensation/" -o pages/lots-de-compensation.html

echo "Downloading: Attestation fin de paiement..."
curl -L "https://www.agef.ci/attestation-fin-de-paiement/" -o pages/attestation-fin-de-paiement.html

# Cadre juridique pages
echo "Downloading: Lois et ordonnances..."
curl -L "https://www.agef.ci/lois-et-ordonnances/" -o pages/lois-et-ordonnances.html

echo "Downloading: Décrets..."
curl -L "https://www.agef.ci/decrets/" -o pages/decrets.html

echo "Downloading: Arrêtés..."
curl -L "https://www.agef.ci/arretes/" -o pages/arretes.html

echo ""
echo "✓ All pages re-downloaded successfully!"
echo "✓ Backup of old pages saved in pages_backup/"
echo ""
echo "Total pages downloaded: 15"
