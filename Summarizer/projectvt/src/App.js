import React, { useState } from "react";
import "./index.css";

function App() {
  const [transcription, setTranscription] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleMicInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      setTranscription(""); // Clear the text area
      recognition.start();
      setIsRecording(true);

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
          }
        }
        setTranscription(transcript);
      };

      recognition.onerror = (err) => {
        console.error("Speech recognition error:", err);
        setIsRecording(false);
      };
    }
  };

  const handleClearText = () => setTranscription("");

  const handleAudioFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("No file selected.");
      return;
    }

    if (file.type.startsWith("audio/")) {
      const reader = new FileReader();
      reader.onload = () => {
        alert("Audio file uploaded! Ready for processing.");
        console.log("Audio file data:", reader.result);
        // Send `reader.result` to server or process locally as needed
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid audio file.");
    }
  };

  const handleSummarize = () => {
    if (!transcription.trim()) {
      alert("No transcription available to summarize.");
      return;
    }

    // A basic keyword-based summarization
    const words = transcription.split(" ");
    const wordFrequency = {};
    words.forEach((word) => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });

    const sortedWords = Object.entries(wordFrequency).sort(
      (a, b) => b[1] - a[1]
    );
    const summary = sortedWords
      .slice(0, 5) // Taking top 5 keywords
      .map((item) => item[0])
      .join(", ");

    alert(`Summary (keywords): ${summary}`);
  };

  return (
    <div className="App">
      <header>
        <h1>Audio to Text Transcription</h1>
        <p>Convert your audio effortlessly</p>
      </header>

      <div className="main-container">
        <div className="transcription-box">
          <h2>Transcription</h2>
          <textarea
            className="transcription-text"
            value={transcription}
            readOnly
            placeholder="Your transcription will appear here..."
          />
        </div>
        <div className="action-buttons">
          <button className="mic-button" onClick={handleMicInput}>
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
          <label className="upload-button">
            Upload Audio File
            <input
              type="file"
              accept="audio/*"
              className="audio-upload"
              onChange={handleAudioFileUpload}
            />
          </label>
          <button className="summarize-button" onClick={handleSummarize}>
            Summarize
          </button>
          <button className="clear-button" onClick={handleClearText}>
            Clear Text
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
