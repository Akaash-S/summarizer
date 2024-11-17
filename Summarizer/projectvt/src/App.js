import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const startVoiceRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.start();

    recognition.onstart = () => {
      setIsListening(true);
      setIsLoading(true);
    };

    recognition.onresult = (event) => {
      const capturedText = event.results[0][0].transcript;
      setText(capturedText); // Set the text from voice recognition
    };

    recognition.onerror = (event) => {
      console.error("Error: ", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      setIsLoading(false);
    };

    recognitionRef.current = recognition;
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const clearText = () => {
    setText("");
  };

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  // Animation for typing effect
  const textVariants = {
    initial: { opacity: 0, width: 0 },
    animate: {
      opacity: 1,
      width: "auto",
      transition: { duration: 2, ease: "easeOut" },
    },
  };

  // Button hover animation
  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Voice-to-Text Recognition App</h1>
      </header>

      <main className="app-main">
        <motion.button
          onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="action-button"
        >
          {isListening ? "Stop Recognition" : "Start Voice Recognition"}
        </motion.button>

        {isLoading && <div className="loading-indicator">Listening...</div>}

        {/* Text Container */}
        <div className="text-container">
          <motion.div
            initial="initial"
            animate="animate"
            variants={textVariants}
            className="text-display"
          >
            <p>{text}</p>
          </motion.div>
        </div>

        <div className="controls">
          <button onClick={clearText} className="control-button">Clear Text</button>
          <button onClick={speakText} className="control-button">Read Text</button>
        </div>
      </main>
    </div>
  );
}

export default App;
