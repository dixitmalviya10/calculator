// File: CalculatorInput.tsx (React with TypeScript)
import { useEffect } from "react";
import { playClickSound } from "../utils/clickSound";
import { evaluate } from "mathjs";

const operators = ["+", "-", "*", "/", "%", "."];

export const useKeyboardInput = (
  setValue: React.Dispatch<React.SetStateAction<string>>
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (/\d/.test(key) || operators.includes(key) || key === ".") {
        setValue((prev) => {
          const lastChar = prev.slice(-1);

          if (prev === "0" && /\d/.test(key)) return key;

          if (operators.includes(lastChar) && operators.includes(key)) {
            return prev; // prevent double operators
          }

          if (prev === "0" && key !== ".") return key; // overwrite leading zero

          return prev + key;
        });
        playClickSound();
      } else if (key === "Backspace") {
        setValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
        playClickSound();
      } else if (key === "Enter") {
        setValue((prev) => {
          try {
            return String(evaluate(prev));
          } catch {
            return "Error";
          }
        });
        playClickSound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setValue]);
};
