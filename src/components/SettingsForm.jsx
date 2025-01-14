import React from 'react';

export default function SettingsForm({
  contrastOption,
  setContrastOption,
  voiceSpeed,
  setVoiceSpeed,
  loading,
  handleSave
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label className="text-lg">خيارات التباين:</label>
        <select
          className="box-border w-48 p-2 text-black"
          value={contrastOption}
          onChange={(e) => setContrastOption(e.target.value)}
          disabled={loading}
        >
          <option value="white">خلفية سوداء ونص أبيض</option>
          <option value="yellow">خلفية سوداء ونص أصفر</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg">سرعة الصوت:</label>
        <select
          className="box-border w-48 p-2 text-black"
          value={voiceSpeed}
          onChange={(e) => setVoiceSpeed(e.target.value)}
          disabled={loading}
        >
          <option value="slow">بطيء</option>
          <option value="normal">عادي</option>
          <option value="fast">سريع</option>
        </select>
      </div>

      <button
        className="cursor-pointer bg-yellow-500 text-black px-4 py-2 rounded w-32"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? 'جاري الحفظ...' : 'حفظ'}
      </button>
    </>
  );
}