const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL;

console.log('=== RESEND API TEST ===');
console.log('RESEND_API_KEY set:', !!apiKey);
console.log('RESEND_FROM_EMAIL:', fromEmail);

if (!apiKey) {
  console.error('ERROR: RESEND_API_KEY is not set!');
  process.exit(1);
}

if (!fromEmail) {
  console.error('ERROR: RESEND_FROM_EMAIL is not set!');
  process.exit(1);
}

console.log('\nAttempting to send test email...');

fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    from: fromEmail,
    to: 'RecoveryFestMI@Gmail.com',
    subject: 'Test Email from Recovery Fest',
    html: '<h1>Test Email</h1><p>If you see this, Resend is working!</p>',
  }),
})
  .then(res => res.json())
  .then(data => {
    console.log('Response status:', data);
    if (data.error) {
      console.error('ERROR:', data.error);
    } else if (data.id) {
      console.log('SUCCESS! Email sent with ID:', data.id);
    }
  })
  .catch(err => {
    console.error('Request failed:', err.message);
  });
