import { useState } from "react";
import { CALCINPUTS } from "./constants/options";
import { playClickSound } from "./utils/clickSound";
import { useKeyboardInput } from "./hooks/useKeyboardInput";
import { evaluate } from "mathjs";
import Panel from "./components/Panel";

function App() {
  const [value, setValue] = useState("0");

  const updateValue = (input: string) => {
    const operators = [".", "/", "*", "-", "+", "%"];
    localStorage.setItem("history", JSON.stringify(value + input));
    if (!isNaN(Number(input))) {
      setValue((prev) => (prev === "0" ? input : prev + input));
    } else if (operators.includes(input)) {
      setValue((prev) => {
        const lastChar = prev.slice(-1);
        if (operators.includes(lastChar)) return prev;
        return prev + input;
      });
    } else if (input === "DEL") {
      setValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (input === "C" || input === "CE") {
      setValue("0");
    } else if (input === "=") {
      try {
        const result = evaluate(value); // ← SAFE evaluation
        setValue(String(result));
      } catch {
        setValue("Error");
      }
    }
    playClickSound();
  };

  useKeyboardInput(setValue);
  const handleChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    input: string | number
  ) => {
    updateValue(String(input));
    (e.target as HTMLButtonElement).blur();
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen p-5">
        <div className="border-2 max-w-sm w-full rounded">
          <h2 className="py-2 px-2 text-lg font-semibold bg-slate-100">
            Calculator
          </h2>
          <div className="border-t-2">
            <div className="text-right text-4xl mx-2 my-3 font-semibold overflow-x-clip">
              {value}
            </div>
            <div className="grid grid-cols-4 gap-1 p-1">
              {CALCINPUTS.map((inputs, index) => (
                <button
                  key={index}
                  onClick={(e) => handleChange(e, inputs)}
                  className={`py-3 px-6 text-lg ${
                    inputs === "="
                      ? "bg-blue-500 text-white border hover:border-blue-400 hover:bg-blue-400 active:bg-blue-300"
                      : "bg-slate-100 border hover:border-slate-300 hover:bg-slate-200 active:bg-slate-300"
                  }`}>
                  {inputs}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Panel />
    </>
  );
}

export default App;
