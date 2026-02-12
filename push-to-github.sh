#!/bin/bash

# Triple Waza Challenge - GitHub Push Script
# This script will push your code to GitHub

echo "🥋 Triple Waza Challenge - GitHub Deployment"
echo "=============================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Error: git is not installed"
    exit 1
fi

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git config user.email "deployment@triplewazachallenge.com"
    git config user.name "Triple Waza Challenge"
fi

# Add all files
echo "📝 Adding files..."
git add .

# Commit if there are changes
if git diff-index --quiet HEAD --; then
    echo "✅ No changes to commit"
else
    echo "💾 Committing changes..."
    git commit -m "Ready for deployment to triplewazachallenge.com"
fi

# Rename branch to main
echo "🔄 Setting branch to main..."
git branch -M main

# Add remote if it doesn't exist
if ! git remote | grep -q origin; then
    echo "🔗 Adding GitHub remote..."
    git remote add origin https://github.com/durrantkeith/triple-waza-friendship-challenge.git
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Code pushed to GitHub"
    echo ""
    echo "🌐 Next steps:"
    echo "   1. Go to https://app.netlify.com"
    echo "   2. Connect your GitHub repository"
    echo "   3. Deploy to triplewazachallenge.com"
    echo ""
    echo "   Or Netlify will auto-deploy if already configured!"
else
    echo ""
    echo "❌ Push failed. You may need to authenticate with GitHub."
    echo ""
    echo "Try one of these options:"
    echo "   1. Use GitHub CLI: gh auth login"
    echo "   2. Use SSH: git remote set-url origin git@github.com:durrantkeith/triple-waza-friendship-challenge.git"
    echo "   3. Create a Personal Access Token at https://github.com/settings/tokens"
fi
