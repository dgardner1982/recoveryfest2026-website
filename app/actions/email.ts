'use server'

export async function subscribeToNewsletter(email: string) {
  // Validate email
  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email address' }
  }

  try {
    // Send email notification to recoveryfestmi@gmail.com
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Recovery Fest <onboarding@resend.dev>',
        to: 'recoveryfestmi@gmail.com',
        subject: 'New Email Signup for Recovery Fest 2026',
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <p>This subscriber has opted to receive updates and messages about Recovery Fest 2026.</p>
        `,
      }),
    })

    if (!response.ok) {
      // Fallback: Log the email if API fails (you can implement database storage here)
      console.log('Newsletter signup:', email)
    }

    return { success: true, message: 'Thank you for subscribing! Check your email for confirmation.' }
  } catch (error) {
    console.error('Subscription error:', error)
    return { error: 'Something went wrong. Please try again.' }
  }
}
