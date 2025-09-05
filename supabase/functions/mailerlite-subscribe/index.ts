import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('MailerLite function called with method:', req.method)
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, subscriptionTypes } = await req.json()
    console.log('Processing email subscription for:', email)
    console.log('Subscription preferences:', subscriptionTypes)
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const apiKey = Deno.env.get('MAILERLITE_API_KEY')
    console.log('MailerLite API key configured:', !!apiKey)
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'MailerLite API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Prepare subscriber data with groups based on preferences
    const groups = []
    if (subscriptionTypes?.events) groups.push('events')
    if (subscriptionTypes?.podcast) groups.push('podcast')
    if (subscriptionTypes?.general) groups.push('general')
    
    // If no preferences selected, default to general
    if (groups.length === 0) groups.push('general')
    
    console.log('Adding subscriber to groups:', groups)
    
    // Subscribe to MailerLite
    console.log('Calling MailerLite API...')
    const subscriberData = {
      email: email,
      status: 'active',
      fields: {
        subscription_preferences: groups.join(', '),
        signup_source: 'website'
      }
    }
    
    // Add groups if they exist (MailerLite groups need to be created first in dashboard)
    if (groups.length > 0) {
      subscriberData.groups = groups
    }
    
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(subscriberData),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('MailerLite API error response:', response.status, errorData)
      return new Response(
        JSON.stringify({ error: 'Failed to subscribe to newsletter' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const data = await response.json()
    console.log('MailerLite success response:', data)
    
    // Create a more descriptive success message based on preferences
    let successMessage = 'Du er nu tilmeldt vores nyhedsbrev!'
    
    if (groups.length === 3) {
      successMessage = 'Du er nu tilmeldt alle vores nyhedsbreve: Events, Podcast og Generelle nyheder!'
    } else if (groups.length === 2) {
      const groupNames = []
      if (groups.includes('events')) groupNames.push('Events')
      if (groups.includes('podcast')) groupNames.push('Podcast')
      if (groups.includes('general')) groupNames.push('Generelle nyheder')
      successMessage = `Du er nu tilmeldt: ${groupNames.join(' og ')}!`
    } else if (groups.includes('events')) {
      successMessage = 'Du er nu tilmeldt Events!'
    } else if (groups.includes('podcast')) {
      successMessage = 'Du er nu tilmeldt Podcast!'
    } else if (groups.includes('general')) {
      successMessage = 'Du er nu tilmeldt Generelle nyheder!'
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: successMessage,
        groups: groups,
        subscriber_data: data
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Unexpected error in MailerLite function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})