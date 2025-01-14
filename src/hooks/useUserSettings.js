import { useState, useEffect } from 'react';

export function useUserSettings(session) {
  const [theme, setTheme] = useState('white');
  const [voiceSpeed, setVoiceSpeed] = useState('normal');

  useEffect(() => {
    if (session) {
      fetchUserSettings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function fetchUserSettings() {
    console.log('[App] Fetching user settings...');
    try {
      const response = await fetch('/api/settings', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session?.access_token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      const data = await response.json();
      console.log('[App] Fetched settings:', data);
      setTheme(data.contrast_option);
      setVoiceSpeed(data.voice_speed);
    } catch (error) {
      console.error('[App] Error fetching user settings:', error);
    }
  }

  return { theme, voiceSpeed, fetchUserSettings };
}