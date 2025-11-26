#!/bin/bash

# AGEF PDF Generator - Local Test Script

echo "🧪 Testing AGEF PDF Generator"
echo "================================"

# Test health endpoint
echo ""
echo "1️⃣  Checking health endpoint..."
curl -s http://localhost:3000/health | jq . || echo "Service not responding"

# Test PDF generation
echo ""
echo "2️⃣  Generating test PDF..."
curl -X POST http://localhost:3000/api/generate-pdf \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jean Dupont",
    "phone": "07 01 23 45 67",
    "parcelRef": "A-01-04",
    "location": "Bindougousso",
    "area": "300 m²",
    "price": "4500000",
    "deposit": "450000",
    "paymentMethod": "Mobile Money",
    "transactionRef": "TXN123456"
  }' \
  --output test-receipt.pdf \
  -w "\nHTTP Status: %{http_code}\nSize: %{size_download} bytes\n"

# Check if PDF was created
echo ""
if [ -f "test-receipt.pdf" ]; then
    SIZE=$(ls -lh test-receipt.pdf | awk '{print $5}')
    echo "✅ PDF created successfully! Size: $SIZE"
    echo "📄 Open test-receipt.pdf to view"
else
    echo "❌ PDF generation failed"
fi
