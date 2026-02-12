# Push to GitHub - Triple Waza Challenge

## Quick Start

Your code is ready to push to: `https://github.com/durrantkeith/triple-waza-friendship-challenge`

### Method 1: Use the Helper Script (Easiest)

```bash
./push-to-github.sh
```

### Method 2: Manual Commands

```bash
git init
git add .
git commit -m "Ready for deployment to triplewazachallenge.com"
git branch -M main
git remote add origin https://github.com/durrantkeith/triple-waza-friendship-challenge.git
git push -u origin main
```

## Authentication Options

### Option A: GitHub CLI (Recommended)

1. Install GitHub CLI: https://cli.github.com/
2. Authenticate:
```bash
gh auth login
```
3. Then push:
```bash
git push -u origin main
```

### Option B: Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (full control of private repositories)
4. Generate and copy the token
5. When prompted for password during push, use the token instead

### Option C: SSH Key (Most Secure)

1. Generate SSH key:
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
2. Add to GitHub: https://github.com/settings/keys
3. Change remote URL:
```bash
git remote set-url origin git@github.com:durrantkeith/triple-waza-friendship-challenge.git
```
4. Push:
```bash
git push -u origin main
```

## After Pushing

Once your code is on GitHub:

1. **Automatic Deployment** (if Netlify is already configured):
   - Netlify will automatically detect the push
   - Your site will deploy to `triplewazachallenge.com` in 2-3 minutes

2. **Manual Netlify Setup** (if first time):
   - Go to: https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add environment variables from `.env.local.example`
   - Deploy!

## Troubleshooting

### "Authentication failed"
- Use a Personal Access Token instead of your password
- Or set up GitHub CLI: `gh auth login`

### "Permission denied"
- Make sure you have access to the repository
- Check if you're using the correct GitHub account

### "Repository not found"
- Verify the repository exists: https://github.com/durrantkeith/triple-waza-friendship-challenge
- Check if it's private (you need appropriate permissions)

## Need Help?

- GitHub Authentication: https://docs.github.com/en/authentication
- Netlify Deployment: See `NETLIFY_DEPLOYMENT_GUIDE.md`
- Supabase Setup: See `SUPABASE_AUTH_CONFIG.md`
