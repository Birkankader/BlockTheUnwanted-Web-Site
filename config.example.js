// EmailJS Configuration Example
// Copy this file to config.js and replace with your actual EmailJS credentials

const EMAIL_CONFIG = {
    // EmailJS Service ID (get from https://dashboard.emailjs.com/)
    serviceId: 'YOUR_SERVICE_ID', // Example: 'service_rvvtd2v'
    
    // EmailJS Template ID (get from https://dashboard.emailjs.com/)
    templateId: 'YOUR_TEMPLATE_ID', // Example: 'template_wo2ohc9'
    
    // EmailJS Public Key (get from https://dashboard.emailjs.com/)
    publicKey: 'YOUR_PUBLIC_KEY', // Example: '8mKkSTCFk57ZOgGUc'
    
    // Recipient email (can be public)
    recipientEmail: 'your-email@example.com'
};

// Export for use in other files
window.EMAIL_CONFIG = EMAIL_CONFIG;

/*
SETUP INSTRUCTIONS:
1. Go to https://dashboard.emailjs.com/
2. Create an account or log in
3. Create a new service (Gmail, Outlook, etc.)
4. Create a new template with the following variables:
   - {{to_name}} - Recipient name
   - {{from_name}} - Sender email
   - {{reply_to}} - Reply-to email
   - {{type}} - Report type (bug/feature/support)
   - {{email}} - User email
   - {{subject}} - Report subject
   - {{description}} - Detailed description
   - {{browser}} - Browser info
   - {{priority}} - Priority level
   - {{timestamp}} - When sent
   - {{language}} - Interface language
   - {{url}} - Website URL
   - {{user_agent}} - User agent string
   - {{message}} - Formatted complete message

5. Copy your Service ID, Template ID, and Public Key to this file
6. Rename this file to config.js
7. Test the form to ensure emails are being sent

SECURITY NOTE:
- Never commit the actual config.js file to version control
- The config.js file is already added to .gitignore
- For production deployment, use environment variables if possible
*/ 