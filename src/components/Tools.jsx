import React, { useState } from 'react';
import { createEvent } from '../supabaseClient';

export default function Tools() {
  const [inputText, setInputText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTTS = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    console.log('[Tools] Sending text to TTS:', inputText);
    try {
      const result = await createEvent('text_to_speech', {
        text: inputText,
        app_id: import.meta.env.VITE_PUBLIC_APP_ID
      });
      if (result?.response) {
        console.log('[Tools] TTS response:', result.response);
        setAudioUrl(result.response);
      }
    } catch (error) {
      console.error('[Tools] TTS Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <h2 className="text-xl mb-2 font-semibold">أدوات للمكفوفين</h2>
      <div>
        <label htmlFor="ttsInput" className="block mb-2">
          اكتب نصاً لتحويله إلى صوت:
        </label>
        <textarea
          id="ttsInput"
          className="box-border w-full p-2 mb-2 text-black resize-none"
          rows="4"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          placeholder="اكتب النص هنا..."
        />
        <button
          className="cursor-pointer bg-yellow-500 text-black px-4 py-2 rounded"
          onClick={handleTTS}
          disabled={loading}
        >
          {loading ? 'جاري التحويل...' : 'تحويل إلى صوت'}
        </button>
      </div>
      {audioUrl && (
        <audio
          controls
          className="mt-4"
          aria-label="Text to Speech Result Audio"
        >
          <source src={audioUrl} type="audio/mp3" />
          متصفحك لا يدعم تشغيل الصوت
        </audio>
      )}
    </div>
  );
}