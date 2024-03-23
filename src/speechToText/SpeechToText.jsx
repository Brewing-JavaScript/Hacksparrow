import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../Api/Api";
import { useNavigate } from "react-router-dom";
import Recording from "../Loader/Recording";


function SpeechToText() {
  const [transcription, setTranscription] = useState("");
  const [recording, setRecording] = useState(false);
  const recognition = new window.webkitSpeechRecognition();
  const navigate = useNavigate();

  useEffect(() => {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      console.log("Speech recognition started");
      setRecording(true);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setRecording(false);
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      setTranscription(finalTranscript);
      handleTranscribe(finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    if (recording) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [recording]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTranscribe = async (text) => {
    console.log("Transcribed text:", text);
    try {
      const response = await api.post("/speech-to-text", {
        transcription: text,
      });
      console.log("Response data:", response.data);
      updateTextColor(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateTextColor = (color) => {
    // Update textColor property with color name
    const themeSettingsString = sessionStorage.getItem("themeSettings");
    if (themeSettingsString) {
      const themeSettings = JSON.parse(themeSettingsString);
      const updatedThemeSettings = { ...themeSettings, textColor: color.colorName, backgroundColor: color.backgroundColor };
      sessionStorage.setItem(
        "themeSettings",
        JSON.stringify(updatedThemeSettings)
      );
      navigate("/");
      // {"colorName":"green","backgroundColor":"#99CC99"}
    }
  };

  return (
    <>
      {
        recording ? <Recording />
          :
          <div className="w-full h-screen flex items-center flex-col gap-12 justify-center">
            <h1 className="text-3xl font-bold shadow-md p-8">give voice command to customize display</h1>
            <button className="py-4 px-20 border" onClick={() => setRecording((prev) => !prev)}>
              {recording ? "Stop Recording" : "Start Recording"}
            </button>
            {transcription && (
              <div className="w-[80%] ">
                <h2>Transcription:</h2>
                <p>{transcription}</p>
              </div>
            )}
          </div>
      }
    </>
  );
}

export default SpeechToText;
