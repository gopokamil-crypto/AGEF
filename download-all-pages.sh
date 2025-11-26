#!/bin/bash

# Create pages directory
mkdir -p pages

echo "Downloading all AGEF website pages..."

# Main pages
echo "Downloading: A propos (About)..."
curl -L "https://www.agef.ci/about/" -o pages/about.html

echo "Downloading: Réalisations..."
curl -L "https://www.agef.ci/realisations/" -o pages/realisations.html

echo "Downloading: Contact..."
curl -L "https://www.agef.ci/contact/" -o pages/contact.html

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

echo "All pages downloaded successfully!"
echo "Total pages: 15"
