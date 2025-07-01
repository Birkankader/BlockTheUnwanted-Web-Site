#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Building for Netlify...');

// Read environment variables
const envVars = {
    VITE_EMAILJS_SERVICE_ID: process.env.VITE_EMAILJS_SERVICE_ID || 'service_rvvtd2v',
    VITE_EMAILJS_TEMPLATE_ID: process.env.VITE_EMAILJS_TEMPLATE_ID || 'template_wo2ohc9',
    VITE_EMAILJS_PUBLIC_KEY: process.env.VITE_EMAILJS_PUBLIC_KEY || '8mKkSTCFk57ZOgGUc',
    VITE_RECIPIENT_EMAIL: process.env.VITE_RECIPIENT_EMAIL || 'birkankader@gmail.com'
};

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
    /serviceId: 'service_rvvtd2v'/g,
    `serviceId: '${envVars.VITE_EMAILJS_SERVICE_ID}'`
);

scriptContent = scriptContent.replace(
    /templateId: 'template_wo2ohc9'/g,
    `templateId: '${envVars.VITE_EMAILJS_TEMPLATE_ID}'`
);

scriptContent = scriptContent.replace(
    /publicKey: '8mKkSTCFk57ZOgGUc'/g,
    `publicKey: '${envVars.VITE_EMAILJS_PUBLIC_KEY}'`
);

scriptContent = scriptContent.replace(
    /recipientEmail: 'birkankader@gmail.com'/g,
    `recipientEmail: '${envVars.VITE_RECIPIENT_EMAIL}'`
);

// Write the updated script.js
fs.writeFileSync(scriptPath, scriptContent);

console.log('✅ Environment variables injected into script.js');
console.log('🎉 Netlify build completed!'); 