#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function setupGitAuth() {
  try {
    if (!existsSync('.env.local')) {
      console.error('❌ Error: .env.local file not found!');
      console.log('\n📝 Please create .env.local from .env.local.example:');
      console.log('   1. Copy .env.local.example to .env.local');
      console.log('   2. Add your GitHub token to .env.local');
      console.log('   3. Get token from: https://github.com/settings/tokens\n');
      process.exit(1);
    }

    const envContent = readFileSync('.env.local', 'utf-8');
    const tokenMatch = envContent.match(/GITHUB_TOKEN=(.+)/);

    if (!tokenMatch || tokenMatch[1] === 'your_github_token_here') {
      console.error('❌ Error: GITHUB_TOKEN not set in .env.local');
      console.log('\n📝 Please add your GitHub token to .env.local');
      console.log('   Format: GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n');
      process.exit(1);
    }

    const token = tokenMatch[1].trim();

    const { stdout: remoteUrl } = await execAsync('git remote get-url origin');
    const cleanUrl = remoteUrl.trim();

    let repoUrl;
    if (cleanUrl.startsWith('https://')) {
      repoUrl = cleanUrl.replace('https://', '').replace(/\n/g, '');
    } else if (cleanUrl.startsWith('git@')) {
      repoUrl = cleanUrl
        .replace('git@', '')
        .replace(':', '/')
        .replace('.git', '')
        .replace(/\n/g, '');
    } else {
      repoUrl = cleanUrl.replace(/\n/g, '');
    }

    const authUrl = `https://${token}@${repoUrl}`;

    await execAsync(`git remote set-url origin "${authUrl}"`);

    console.log('✅ Git authentication configured successfully!');
    console.log('🚀 You can now use: git push origin main\n');

  } catch (error) {
    console.error('❌ Error setting up git auth:', error.message);
    process.exit(1);
  }
}

setupGitAuth();
