import https from 'https';

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL;

if (!apiKey) {
  console.error('[ERROR] RESEND_API_KEY is not set');
  process.exit(1);
}

if (!fromEmail) {
  console.error('[ERROR] RESEND_FROM_EMAIL is not set');
  process.exit(1);
}

console.log('[TEST] Starting Resend API test...');
console.log('[TEST] From Email:', fromEmail);
console.log('[TEST] API Key (first 10 chars):', apiKey.substring(0, 10) + '...');

const emailData = JSON.stringify({
  from: fromEmail,
  to: 'RecoveryFestMI@Gmail.com',
  subject: 'Test Email from Recovery Fest',
  html: '<h1>Test</h1><p>This is a test email to verify Resend is working.</p>',
});

const options = {
  hostname: 'api.resend.com',
  path: '/emails',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(emailData),
    'Authorization': `Bearer ${apiKey}`,
  },
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('[TEST] Response Status:', res.statusCode);
    console.log('[TEST] Response Headers:', JSON.stringify(res.headers, null, 2));
    console.log('[TEST] Response Body:', data);

    if (res.statusCode === 200) {
      console.log('[SUCCESS] Email sent successfully!');
    } else {
      console.error('[FAILED] Email request failed');
    }
  });
});

req.on('error', (error) => {
  console.error('[ERROR] Request error:', error.message);
  process.exit(1);
});

req.write(emailData);
req.end();
