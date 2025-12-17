import { useState, useEffect, useCallback } from "react";

const chars = "!@#$%^&*()_+-=[]{}|;':\",./<>?0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleOnHover?: boolean;
}

export const ScrambleText = ({
  text,
  className = "",
  scrambleOnHover = true,
}: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length * 2;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 2) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration++;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 30);
  }, [text, isScrambling]);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  return (
    <span
      className={`${className} ${isScrambling ? "text-secondary" : ""}`}
      onMouseEnter={scrambleOnHover ? scramble : undefined}
    >
      {displayText}
    </span>
  );
};
