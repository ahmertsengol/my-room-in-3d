#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || '8080';
const distPath = path.join(__dirname, '..', 'dist');

// Check if dist directory exists
if (!fs.existsSync(distPath)) {
  console.error(`Error: ${distPath} directory not found. Please run 'npm run build' first.`);
  process.exit(1);
}

// Try to find serve binary in node_modules
const servePath = path.join(__dirname, '..', 'node_modules', '.bin', 'serve');
const serveCommand = fs.existsSync(servePath) ? servePath : 'npx';

// Start serve with SPA support (-s flag enables SPA mode for client-side routing)
const serve = spawn(serveCommand, fs.existsSync(servePath) ? ['-s', distPath, '-l', PORT] : ['serve', '-s', distPath, '-l', PORT], {
  stdio: 'inherit',
  shell: true
});

serve.on('error', (error) => {
  console.error('Failed to start server:', error);
  console.error('Make sure "serve" package is installed. Run: npm install');
  process.exit(1);
});

serve.on('exit', (code) => {
  process.exit(code || 0);
});

// Handle termination signals
process.on('SIGTERM', () => {
  serve.kill('SIGTERM');
});

process.on('SIGINT', () => {
  serve.kill('SIGINT');
});

