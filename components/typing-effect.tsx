import { useEffect, useState, useRef } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number; // ms per character
  className?: string;
}

export function TypingEffect({
  text,
  speed = 100,
  className = "",
}: TypingEffectProps) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = indexRef.current;
      setDisplayed((prev) => prev + text.charAt(nextIndex));
      indexRef.current += 1;
      if (indexRef.current >= text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className={`${className} typing`}>{displayed}</span>;
}
