import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(second, replace = false) {
    
    if(replace) {
      history.pop();

      setMode(second);
      setHistory(prev => ([...prev, second]));
      return;
    }

    setMode(second);
    setHistory(prev => ([...prev, second]));
    return;
  }
  
  function back() {

    if (history.length > 1) {
      history.pop()
    
      setMode(history[history.length - 1]);
      return;
    }

  }
  
  return { 
    mode,
    transition ,
    back
  };
}
