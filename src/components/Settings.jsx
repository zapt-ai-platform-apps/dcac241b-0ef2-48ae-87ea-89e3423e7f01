import React, { useState } from 'react';

export default function Settings() {
  const [contrastOption, setContrastOption] = useState('white');
  const [voiceSpeed, setVoiceSpeed] = useState('normal');

  const handleSave = () => {
    console.log('[Settings] Saving settings:', { contrastOption, voiceSpeed });
    alert('تم حفظ الإعدادات');
  };

  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">الإعدادات</h2>
      
      <div className="flex flex-col gap-2">
        <label className="text-lg">خيارات التباين:</label>
        <select
          className="box-border w-48 p-2 text-black"
          value={contrastOption}
          onChange={(e) => setContrastOption(e.target.value)}
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
        >
          <option value="slow">بطيء</option>
          <option value="normal">عادي</option>
          <option value="fast">سريع</option>
        </select>
      </div>

      <button
        className="cursor-pointer bg-yellow-500 text-black px-4 py-2 rounded w-32"
        onClick={handleSave}
      >
        حفظ
      </button>
    </div>
  );
}