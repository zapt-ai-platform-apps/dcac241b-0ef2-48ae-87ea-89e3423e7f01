export async function fetchSettings(supabase) {
  const { data: { session } } = await supabase.auth.getSession();
  const response = await fetch('/api/settings', {
    headers: {
      Authorization: `Bearer ${session?.access_token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user settings');
  }
  const data = await response.json();
  return data;
}

export async function updateSettings(supabase, { contrastOption, voiceSpeed }) {
  const { data: { session } } = await supabase.auth.getSession();
  const response = await fetch('/api/settings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contrastOption,
      voiceSpeed
    })
  });
  if (!response.ok) {
    throw new Error('Failed to update settings');
  }
}