// import React, { useState } from 'react';

// const TextToSpeechTrial = () => {
//   const [text, setText] = useState('');
//   const [lang, setLang] = useState('en-US'); // Default language is English (United States)

//   const handleSpeak = () => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = lang;
//     speechSynthesis.speak(utterance);
//   };

//   return (
//     <div>
//       <textarea value={text} onChange={(e) => setText(e.target.value)} />
//       <select value={lang} onChange={(e) => setLang(e.target.value)}>
//         <option value="en-US">English (US)</option>
//         <option value="en-GB">English (UK)</option>
//         <option value="fr-FR">French</option>
//         <option value="hi-IN">Hindi</option>
//         <option value="mr-IN">Marathi</option>
//         <option value="zh-CN">Chinese</option>

//         {/* Add more language options as needed */}

//       </select>
//       <button onClick={handleSpeak}>Speak</button>
//     </div>
//   );
// };

// export default TextToSpeechTrial;

// // ORIGINAL CODE

// import React, { useState, useRef } from "react";

// const TextToSpeechTrial = () => {
//   const [text, setText] = useState("");
//   const [lang, setLang] = useState("en-US"); // Default language is English (United States)
//   const utteranceRef = useRef(null);

//   const handleSpeak = () => {
//     utteranceRef.current = new SpeechSynthesisUtterance(text);
//     utteranceRef.current.lang = lang;
//     speechSynthesis.speak(utteranceRef.current);
//   };

//   const handlePause = () => {
//     if (speechSynthesis.speaking) {
//       speechSynthesis.pause();
//     }
//   };

//   return (
//     <div>
//       <textarea value={text} onChange={(e) => setText(e.target.value)} />
//       <select value={lang} onChange={(e) => setLang(e.target.value)}>
//         <option value="en-US">English (US)</option>
//         <option value="en-GB">English (UK)</option>
//         <option value="fr-FR">French</option>
//         <option value="hi-IN">Hindi</option>
//         <option value="mr-IN">Marathi</option>
//         <option value="zh-CN">Chinese</option>
//         {/* Add more language options as needed */}
//       </select>
//       <button onClick={handleSpeak}>Speak</button>
//       <button onClick={handlePause}>Pause</button>
//     </div>
//   );
// };

// export default TextToSpeechTrial;
import React, { useState, useRef } from 'react';

const TextToSpeechTrial = () => {
  const [text, setText] = useState('');
  const [lang, setLang] = useState('en-US'); // Default language is English (United States)
  const [isPlaying, setIsPlaying] = useState(false); // Track if speech is playing or paused
  const utteranceRef = useRef(null);

  const handleSpeak = () => {
    const synthesis = window.speechSynthesis;
    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.lang = lang;
    utteranceRef.current.onend = () => setIsPlaying(false); // Reset isPlaying state when speech ends
    synthesis.speak(utteranceRef.current);
    setIsPlaying(true);
    console.log('Speech synthesis started.');
  };

  const handleTogglePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        handleSpeak();
      }
    }
  };

  // Function to handle errors during speech synthesis
  const handleError = (error) => {
    console.error('Speech synthesis error:', error);
    setIsPlaying(false);
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
      <button onClick={handleTogglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
};

export default TextToSpeechTrial;
