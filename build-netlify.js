#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Building for Netlify...');

// Read environment variables
const envVars = {
    VITE_EMAILJS_SERVICE_ID: process.env.VITE_EMAILJS_SERVICE_ID,
    VITE_EMAILJS_TEMPLATE_ID: process.env.VITE_EMAILJS_TEMPLATE_ID,
    VITE_EMAILJS_PUBLIC_KEY: process.env.VITE_EMAILJS_PUBLIC_KEY,
    VITE_RECIPIENT_EMAIL: process.env.VITE_RECIPIENT_EMAIL
};

// Check if all required environment variables are present
const missingVars = Object.entries(envVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

if (missingVars.length > 0) {
    console.warn('⚠️  Missing environment variables:', missingVars);
    console.warn('Please set these variables in Netlify dashboard for EmailJS to work:');
    missingVars.forEach(varName => console.warn(`  - ${varName}`));
    console.warn('🔄 Continuing build with placeholder values...');
} else {
    console.log('✅ All environment variables found');
}

console.log('📧 EmailJS Config:', {
    serviceId: envVars.VITE_EMAILJS_SERVICE_ID,
    templateId: envVars.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: envVars.VITE_EMAILJS_PUBLIC_KEY ? '***' + envVars.VITE_EMAILJS_PUBLIC_KEY.slice(-4) : 'not set',
    recipientEmail: envVars.VITE_RECIPIENT_EMAIL
});

// Read script.js and index.html files
const scriptPath = path.join(__dirname, 'script.js');
const htmlPath = path.join(__dirname, 'index.html');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Replace environment variable placeholders
scriptContent = scriptContent.replace(
    /__VITE_EMAILJS_SERVICE_ID__/g,
    envVars.VITE_EMAILJS_SERVICE_ID || '__VITE_EMAILJS_SERVICE_ID__'
);

scriptContent = scriptContent.replace(
    /__VITE_EMAILJS_TEMPLATE_ID__/g,
    envVars.VITE_EMAILJS_TEMPLATE_ID || '__VITE_EMAILJS_TEMPLATE_ID__'
);

scriptContent = scriptContent.replace(
    /__VITE_EMAILJS_PUBLIC_KEY__/g,
    envVars.VITE_EMAILJS_PUBLIC_KEY || '__VITE_EMAILJS_PUBLIC_KEY__'
);

scriptContent = scriptContent.replace(
    /__VITE_RECIPIENT_EMAIL__/g,
    envVars.VITE_RECIPIENT_EMAIL || '__VITE_RECIPIENT_EMAIL__'
);

// Replace environment variable placeholders in HTML
htmlContent = htmlContent.replace(
    /__VITE_EMAILJS_SERVICE_ID__/g,
    envVars.VITE_EMAILJS_SERVICE_ID || '__VITE_EMAILJS_SERVICE_ID__'
);

htmlContent = htmlContent.replace(
    /__VITE_EMAILJS_TEMPLATE_ID__/g,
    envVars.VITE_EMAILJS_TEMPLATE_ID || '__VITE_EMAILJS_TEMPLATE_ID__'
);

htmlContent = htmlContent.replace(
    /__VITE_EMAILJS_PUBLIC_KEY__/g,
    envVars.VITE_EMAILJS_PUBLIC_KEY || '__VITE_EMAILJS_PUBLIC_KEY__'
);

htmlContent = htmlContent.replace(
    /__VITE_RECIPIENT_EMAIL__/g,
    envVars.VITE_RECIPIENT_EMAIL || '__VITE_RECIPIENT_EMAIL__'
);

// Write the updated files
fs.writeFileSync(scriptPath, scriptContent);
fs.writeFileSync(htmlPath, htmlContent);

console.log('✅ Environment variables injected into script.js and index.html');

// Debug: Check if replacements worked
const updatedScriptContent = fs.readFileSync(scriptPath, 'utf8');
const updatedHtmlContent = fs.readFileSync(htmlPath, 'utf8');
const hasPlaceholders = updatedScriptContent.includes('__VITE_EMAILJS_SERVICE_ID__') || updatedHtmlContent.includes('__VITE_EMAILJS_SERVICE_ID__');

if (hasPlaceholders) {
    console.log('⚠️  Placeholders still present - environment variables were not set');
} else {
    console.log('✅ Placeholders successfully replaced with actual values');
}

console.log('🎉 Netlify build completed!'); 