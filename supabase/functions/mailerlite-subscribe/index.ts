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

    // Prepare subscriber data with preferences stored as custom fields
    const preferences = []
    if (subscriptionTypes?.events) preferences.push('events')
    if (subscriptionTypes?.podcast) preferences.push('podcast')
    if (subscriptionTypes?.general) preferences.push('general')
    
    // If no preferences selected, default to general
    if (preferences.length === 0) preferences.push('general')
    
    console.log('Storing subscription preferences:', preferences)
    
    // Subscribe to MailerLite (without groups for now, just storing preferences)
    console.log('Calling MailerLite API...')
    const subscriberData = {
      email: email,
      status: 'active',
      fields: {
        subscription_preferences: preferences.join(', '),
        signup_source: 'website',
        events_interested: subscriptionTypes?.events ? 'yes' : 'no',
        podcast_interested: subscriptionTypes?.podcast ? 'yes' : 'no',
        general_interested: subscriptionTypes?.general ? 'yes' : 'no'
      }
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
    
    if (preferences.length === 3) {
      successMessage = 'Du er nu tilmeldt alle vores nyhedsbreve: Events, Podcast og Generelle nyheder!'
    } else if (preferences.length === 2) {
      const prefNames = []
      if (preferences.includes('events')) prefNames.push('Events')
      if (preferences.includes('podcast')) prefNames.push('Podcast')
      if (preferences.includes('general')) prefNames.push('Generelle nyheder')
      successMessage = `Du er nu tilmeldt: ${prefNames.join(' og ')}!`
    } else if (preferences.includes('events')) {
      successMessage = 'Du er nu tilmeldt Events!'
    } else if (preferences.includes('podcast')) {
      successMessage = 'Du er nu tilmeldt Podcast!'
    } else if (preferences.includes('general')) {
      successMessage = 'Du er nu tilmeldt Generelle nyheder!'
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: successMessage,
        preferences: preferences,
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