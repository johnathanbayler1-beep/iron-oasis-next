exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: JSON.stringify({ error: 'Method not allowed.' }),
    };
  }

  try {
    const { name, email, phone } = JSON.parse(event.body || '{}');

    if (!name || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required validation nodes.' }),
      };
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase keys missing from environment configuration.');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server infrastructure misconfigured.' }),
      };
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ApiKey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        created_at: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Supabase integration fault: ${errorText}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'Identity successfully logged to the cluster.' }),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown fault.';
    return {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    };
  }
};
