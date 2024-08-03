// src/TypeRacer.js
import React, { useState, useEffect } from "react";
import "./TypeRacer.css";

const passages = [
  "The quick brown fox jumps over the lazy dog.",
  "React is a JavaScript library for building user interfaces.",
  "To be or not to be, that is the question.",
  // Add more passages as needed
];

const TypeRacer = () => {
  const [text, setText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [passage, setPassage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const randomPassage = passages[Math.floor(Math.random() * passages.length)];
    setPassage(randomPassage);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    if (!startTime) {
      setStartTime(new Date());
    }

    if (e.target.value === passage) {
      setEndTime(new Date());
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    const randomPassage = passages[Math.floor(Math.random() * passages.length)];
    setPassage(randomPassage);
    setInputValue("");
    setStartTime(null);
    setEndTime(null);
    setIsFinished(false);
  };

  const calculateWPM = () => {
    const wordsTyped = passage.split(" ").length;
    const timeTaken = (endTime - startTime) / 1000 / 60; // in minutes
    return (wordsTyped / timeTaken).toFixed(2);
  };

  return (
    <div className="type-racer">
      <h1>Type Racer</h1>
      <p>{passage}</p>
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        disabled={isFinished}
      />
      {isFinished && (
        <div>
          <p>Congratulations! You finished the race.</p>
          <p>Your WPM: {calculateWPM()}</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default TypeRacer;
