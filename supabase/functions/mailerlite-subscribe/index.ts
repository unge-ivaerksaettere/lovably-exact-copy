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

    // Prepare subscriber data with group assignments
    const preferences = []
    const groupIds = []
    
    // Map preferences to MailerLite group IDs
    if (subscriptionTypes?.events_copenhagen) {
      preferences.push('events_copenhagen')
      groupIds.push('164683428306880092')  // events copenhagen group ID
    }
    if (subscriptionTypes?.events_aarhus) {
      preferences.push('events_aarhus')
      groupIds.push('164694201904137857')  // events aarhus group ID
    }
    if (subscriptionTypes?.podcast) {
      preferences.push('podcast')
      groupIds.push('164683434654958803')  // podcast group ID
    }
    if (subscriptionTypes?.webinars) {
      preferences.push('webinars')
      groupIds.push('164683440684270768')  // webinars group ID
    }
    
    // If no preferences selected, default to webinars
    if (preferences.length === 0) {
      preferences.push('webinars')
      groupIds.push('164683440684270768')  // webinars group ID
    }
    
    console.log('Storing subscription preferences:', preferences)
    console.log('Assigning to group IDs:', groupIds)
    
    // Subscribe to MailerLite with group assignments
    console.log('Calling MailerLite API...')
    const subscriberData = {
      email: email,
      status: 'active',
      groups: groupIds,
      fields: {
        subscription_preferences: preferences.join(', '),
        signup_source: 'website',
        events_copenhagen_interested: subscriptionTypes?.events_copenhagen ? 'yes' : 'no',
        events_aarhus_interested: subscriptionTypes?.events_aarhus ? 'yes' : 'no',
        podcast_interested: subscriptionTypes?.podcast ? 'yes' : 'no',
        webinars_interested: subscriptionTypes?.webinars ? 'yes' : 'no'
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
    
    if (preferences.length === 4) {
      successMessage = 'Du er nu tilmeldt alle vores nyhedsbreve: Events i København, Events i Århus, Podcast og Webinars!'
    } else if (preferences.length > 1) {
      const prefNames = []
      if (preferences.includes('events_copenhagen')) prefNames.push('Events i København')
      if (preferences.includes('events_aarhus')) prefNames.push('Events i Århus')  
      if (preferences.includes('podcast')) prefNames.push('Podcast')
      if (preferences.includes('webinars')) prefNames.push('Webinars')
      successMessage = `Du er nu tilmeldt: ${prefNames.join(' og ')}!`
    } else if (preferences.includes('events_copenhagen')) {
      successMessage = 'Du er nu tilmeldt Events i København!'
    } else if (preferences.includes('events_aarhus')) {
      successMessage = 'Du er nu tilmeldt Events i Århus!'
    } else if (preferences.includes('podcast')) {
      successMessage = 'Du er nu tilmeldt Podcast!'
    } else if (preferences.includes('webinars')) {
      successMessage = 'Du er nu tilmeldt Webinars!'
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