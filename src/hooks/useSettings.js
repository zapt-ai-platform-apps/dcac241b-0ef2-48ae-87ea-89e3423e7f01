import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { fetchSettings, updateSettings } from '../services/settingsService';

export default function useSettings(refreshSettings) {
  const [contrastOption, setContrastOption] = useState('white');
  const [voiceSpeed, setVoiceSpeed] = useState('normal');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      const settings = await fetchSettings(supabase);
      setContrastOption(settings.contrast_option);
      setVoiceSpeed(settings.voice_speed);
    } catch (error) {
      console.error('[Settings] Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setLoading(true);
    console.log('[Settings] Saving settings:', { contrastOption, voiceSpeed });

    try {
      await updateSettings(supabase, { contrastOption, voiceSpeed });
      alert('تم حفظ الإعدادات');
      if (typeof refreshSettings === 'function') {
        refreshSettings();
      }
    } catch (error) {
      console.error('[Settings] Save error:', error);
      alert('حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setLoading(false);
    }
  }

  return {
    contrastOption,
    setContrastOption,
    voiceSpeed,
    setVoiceSpeed,
    loading,
    handleSave
  };
}