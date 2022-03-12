import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(second, replace = false) {
    
    if(replace) {
      const newHistory = history.slice(0, -1);

      setMode(second);
      setHistory([...newHistory, second]);
      return;
    }

    setMode(second);
    setHistory(prev => ([...prev, second]));
    return;
  }
  
  function back() {

    if (history.length > 1) {
      const newHistory = history.slice(0, - 1)

      setMode(newHistory[newHistory.length - 1]);

      setHistory(newHistory);
      return;
    }

  }
  
  return { 
    mode,
    transition ,
    back
  };
}
