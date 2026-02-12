# GitHub Authentication Setup for Automated Pushes

This guide helps you set up secure authentication for automated git pushes.

## Quick Setup (3 Steps)

### Step 1: Get Your GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Configure:
   - **Name:** `triple-waza-deployment` (or any name you prefer)
   - **Expiration:** 90 days (or No expiration)
   - **Scopes:** Check `repo` (Full control of private repositories)
4. Click **"Generate token"**
5. **COPY THE TOKEN** immediately - you won't see it again!
   - Format: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 2: Create Your .env.local File

```bash
# Copy the example file
cp .env.local.example .env.local
```

Then edit `.env.local` and replace `your_github_token_here` with your actual token:

```bash
GITHUB_TOKEN=ghp_your_actual_token_here
```

**Important:**
- `.env.local` is automatically ignored by git (it's in `.gitignore`)
- NEVER commit your token to the repository
- Keep this file secure and private

### Step 3: Configure Git Authentication

Run the setup script:

```bash
node setup-git-auth.mjs
```

This will configure your git remote to use the token for authentication.

## Usage

Once configured, you can push normally:

```bash
git push origin main
```

## Verification

To verify your setup:

```bash
# Check that .env.local exists and is gitignored
cat .env.local
git status  # should NOT show .env.local

# Test a push
git push origin main
```

## Security Notes

- ✅ `.env.local` is in `.gitignore` - tokens won't be committed
- ✅ Token is stored locally on your machine only
- ✅ Setup script reads from secure file
- ⚠️ If token is compromised, revoke it immediately at: https://github.com/settings/tokens

## Troubleshooting

**Error: "Authentication failed"**
- Check your token is valid at: https://github.com/settings/tokens
- Ensure token has `repo` scope enabled
- Verify `.env.local` has correct format: `GITHUB_TOKEN=ghp_...`

**Error: ".env.local not found"**
- Run: `cp .env.local.example .env.local`
- Add your token to the new file

**Error: "GITHUB_TOKEN not set"**
- Open `.env.local` and replace `your_github_token_here` with your actual token
- Ensure no extra spaces or quotes around the token

## Alternative: Manual Configuration

If you prefer to configure manually:

```bash
# Get your remote URL
git remote get-url origin

# Set new URL with token
git remote set-url origin https://YOUR_TOKEN@github.com/username/repo.git
```

Replace `YOUR_TOKEN` with your actual GitHub token.
