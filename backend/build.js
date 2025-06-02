const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy backend files
const backendFiles = [
  'server.js',
  'package.json',
  'contact_submissions.xlsx'
];

backendFiles.forEach(file => {
  const sourcePath = path.join(__dirname, file);
  const destPath = path.join(distDir, 'backend', file);
  
  // Create backend directory in dist if it doesn't exist
  const backendDir = path.join(distDir, 'backend');
  if (!fs.existsSync(backendDir)) {
    fs.mkdirSync(backendDir, { recursive: true });
  }
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
  }
});

// Copy frontend files
const frontendFiles = [
  'index.html',
  'styles.css',
  'responsive.css',
  'script.js'
];

frontendFiles.forEach(file => {
  const sourcePath = path.join(__dirname, '..', file);
  const destPath = path.join(distDir, file);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
  }
});

// Copy public directory
const publicDir = path.join(__dirname, '../public');
const distPublicDir = path.join(distDir, 'public');

if (fs.existsSync(publicDir)) {
  copyDir(publicDir, distPublicDir);
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Build completed successfully!'); 