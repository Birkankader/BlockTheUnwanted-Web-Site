#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

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
    console.error('❌ Missing required environment variables:', missingVars);
    console.error('Please set these variables in Netlify dashboard:');
    missingVars.forEach(varName => console.error(`  - ${varName}`));
    process.exit(1);
}

console.log('📧 EmailJS Config:', {
    serviceId: envVars.VITE_EMAILJS_SERVICE_ID,
    templateId: envVars.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: envVars.VITE_EMAILJS_PUBLIC_KEY ? '***' + envVars.VITE_EMAILJS_PUBLIC_KEY.slice(-4) : 'not set',
    recipientEmail: envVars.VITE_RECIPIENT_EMAIL
});

// Read script.js file
const scriptPath = path.join(__dirname, 'script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Replace environment variable placeholders
scriptContent = scriptContent.replace(
    /__VITE_EMAILJS_SERVICE_ID__/g,
    envVars.VITE_EMAILJS_SERVICE_ID
);

scriptContent = scriptContent.replace(
    /__VITE_EMAILJS_TEMPLATE_ID__/g,
    envVars.VITE_EMAILJS_TEMPLATE_ID
);

scriptContent = scriptContent.replace(
    /__VITE_EMAILJS_PUBLIC_KEY__/g,
    envVars.VITE_EMAILJS_PUBLIC_KEY
);

scriptContent = scriptContent.replace(
    /__VITE_RECIPIENT_EMAIL__/g,
    envVars.VITE_RECIPIENT_EMAIL
);

// Write the updated script.js
fs.writeFileSync(scriptPath, scriptContent);

console.log('✅ Environment variables injected into script.js');
console.log('🎉 Netlify build completed!'); 