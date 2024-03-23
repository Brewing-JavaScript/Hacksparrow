import React, { useState } from 'react';

const TextToSpeechTrial = () => {
  const [text, setText] = useState('');
  const [lang, setLang] = useState('en-US'); // Default language is English (United States)

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        <option value="en-US">English (US)</option>
        <option value="en-GB">English (UK)</option>
        <option value="fr-FR">French</option>
        <option value="hi-IN">Hindi</option>
        <option value="mr-IN">Marathi</option>
        <option value="zh-CN">Chinese</option>

        {/* Add more language options as needed */}

      </select>
      <button onClick={handleSpeak}>Speak</button>
    </div>
  );
};

export default TextToSpeechTrial;

// ORIGINAL CODE






