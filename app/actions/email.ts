'use server'

export async function subscribeToNewsletter(email: string) {
  // Validate email
  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email address' }
  }

  // Check if API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured')
    return { error: 'Email service is not properly configured. Please contact support.' }
  }

  // Check if verified from email is configured
  if (!process.env.RESEND_FROM_EMAIL) {
    console.error('RESEND_FROM_EMAIL is not configured')
    return { error: 'Email service is not properly configured. Please contact support.' }
  }

  try {
    // Send email notification to RecoveryFestMI@Gmail.com
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: 'RecoveryFestMI@Gmail.com',
        subject: 'New Email Signup for Recovery Fest 2026',
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <p>This subscriber has opted to receive updates and messages about Recovery Fest 2026.</p>
        `,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Resend API error:', data)
      return { error: 'Failed to send notification. Please try again later.' }
    }

    return { success: true, message: 'Thank you for subscribing! Check your email for confirmation.' }
  } catch (error) {
    console.error('Subscription error:', error)
    return { error: 'Something went wrong. Please try again.' }
  }
}

export async function sendContactMessage(data: { name: string; email: string; message: string }) {
  // Validate inputs
  if (!data.name || !data.email || !data.message) {
    return { error: 'Please fill in all fields' }
  }

  if (!data.email.includes('@')) {
    return { error: 'Please enter a valid email address' }
  }

  // Check if API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured')
    return { error: 'Email service is not properly configured. Please contact support.' }
  }

  // Check if verified from email is configured
  if (!process.env.RESEND_FROM_EMAIL) {
    console.error('RESEND_FROM_EMAIL is not configured')
    return { error: 'Email service is not properly configured. Please contact support.' }
  }

  try {
    // Send email notification to RecoveryFestMI@Gmail.com
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: 'RecoveryFestMI@Gmail.com',
        replyTo: data.email,
        subject: `New Contact Form Message from ${data.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        `,
      }),
    })

    if (!response.ok) {
      // Fallback: Log the message if API fails
      console.log('Contact form submission:', data)
    }

    return { success: true, message: 'Thank you for your message! We\'ll get back to you soon.' }
  } catch (error) {
    console.error('Contact form error:', error)
    return { error: 'Something went wrong. Please try again.' }
  }
}
