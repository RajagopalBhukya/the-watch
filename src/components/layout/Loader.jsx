import React, { useEffect, useRef, useState } from "react";

const LETTERS = "THE WATCH".split("");

export default function Loader({ onDone }) {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    let finishTimer;

    const letterTimer = window.setInterval(() => {
      setVisibleLetters((current) => {
        if (current >= LETTERS.length) {
          window.clearInterval(letterTimer);
          finishTimer = window.setTimeout(() => onDoneRef.current?.(), 350);
          return current;
        }

        return current + 1;
      });
    }, 130);

    return () => {
      window.clearInterval(letterTimer);
      window.clearTimeout(finishTimer);
    };
  }, []);

  return (
    <div className="loader">
      <img src="/the-watch-logo.png" className="loader-logo" alt="The Watch" />
      <div className="loader-name">
        {LETTERS.map((character, index) => (
          <span className={index < visibleLetters ? "on" : ""} key={`${character}-${index}`}>
            {character === " " ? "\u00a0" : character}
          </span>
        ))}
      </div>
      <div className="loader-bar">
        <i style={{ width: `${(visibleLetters / LETTERS.length) * 100}%` }} />
      </div>
    </div>
  );
}
