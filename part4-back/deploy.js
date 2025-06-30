const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const frontDir = path.resolve(__dirname, '../part5-front');
const backDir = path.resolve(__dirname, '../part4-back');
const distSource = path.join(frontDir, 'dist');
const distTarget = path.join(backDir, 'dist');

// 1. Remove old dist
if (fs.existsSync(distTarget)) {
  fs.rmSync(distTarget, { recursive: true, force: true });
  console.log('✅ Removed old dist folder in part4-back');
}

// 2. Build frontend
console.log('🏗️  Building frontend...');
execSync('npm run build', { cwd: frontDir, stdio: 'inherit' });

// 3. Copy new dist
fs.cpSync(distSource, distTarget, { recursive: true });
console.log('📦 Copied new dist to part4-back');
