import React from 'react';
import useSettings from '../hooks/useSettings';
import SettingsForm from './SettingsForm';

export default function Settings({ refreshSettings }) {
  const {
    contrastOption,
    setContrastOption,
    voiceSpeed,
    setVoiceSpeed,
    loading,
    handleSave
  } = useSettings(refreshSettings);

  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">الإعدادات</h2>
      {loading && <p className="text-sm italic">جارٍ تحميل أو حفظ الإعدادات...</p>}
      <SettingsForm
        contrastOption={contrastOption}
        setContrastOption={setContrastOption}
        voiceSpeed={voiceSpeed}
        setVoiceSpeed={setVoiceSpeed}
        loading={loading}
        handleSave={handleSave}
      />
    </div>
  );
}