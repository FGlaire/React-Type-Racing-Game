import React, { useState, useEffect } from 'react';
import './TypeRacer.css';

const passages = [
  "The quick brown fox jumps over the lazy dog.",
  "React is a JavaScript library for building user interfaces.",
  "To be or not to be, that is the question.",
  "Life is like riding a bicycle. To keep your balance, you must keep moving.",
  "In the end, we will remember not the words of our enemies, but the silence of our friends.",
  // Add more sentences as needed
];

const TypeRacer = () => {
  const [passage, setPassage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

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
    setIsFinished(false);
    setStartTime(null);
    setEndTime(null);
  };

  const calculateWPM = () => {
    const wordsTyped = passage.split(" ").length;
    const timeTaken = (endTime - startTime) / 1000 / 60; // in minutes
    return (wordsTyped / timeTaken).toFixed(2);
  };

  const renderPassage = () => {
    const inputChars = inputValue.split("");
    return passage.split("").map((char, index) => {
      let className = "";
      if (index < inputChars.length) {
        className = char === inputChars[index] ? "correct" : "incorrect";
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="type-racer">
      <h1>Type Racer</h1>
      <div className="passage">{renderPassage()}</div>
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        disabled={isFinished}
        placeholder="Start typing here..."
      />
      {isFinished && (
        <div className="result">
          <p>Congratulations! You finished the race.</p>
          <p>Your WPM: {calculateWPM()}</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default TypeRacer;
