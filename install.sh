#!/bin/bash

# AGEF PDF Generation - Installation Script
# Industry-Standard: Puppeteer + Vercel Serverless

echo "🚀 AGEF PDF Generation Setup"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "=============================="
echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Test locally:  vercel dev"
echo "2. Deploy:        vercel --prod"
echo ""
echo "Read DEPLOYMENT_GUIDE.md for full instructions"
