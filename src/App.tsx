import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { encodeString, getSymbol, WORD_SPLITTER } from './utils';

const App: React.FC<{}> = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [pressedTime, setPressedTime] = useState<number>(0);
  const [releasedTime, setReleasedTime] = useState<number>(0);
  const [value, setValue] = useState('');

  const codeHandlerDown = useCallback(() => {
    if (isPressed) return;
    setIsPressed(true);
    setPressedTime(new Date().getTime())
  }, [isPressed]);

  const codeHandlerUp = useCallback(() => {
    if (!isPressed) return;
    setIsPressed(false);
    setReleasedTime(new Date().getTime())
  }, [isPressed]);

  useEffect(() => {
    document.addEventListener('keydown', codeHandlerDown)
    document.addEventListener('keyup', codeHandlerUp)
    document.addEventListener('mousedown', codeHandlerDown)
    document.addEventListener('mouseup', codeHandlerUp)

    return () => {
      document.removeEventListener('keydown', codeHandlerDown)
      document.removeEventListener('keyup', codeHandlerUp)
      document.removeEventListener('mousedown', codeHandlerDown)
      document.removeEventListener('mouseup', codeHandlerUp)
    }
  }, [codeHandlerDown, codeHandlerUp])

  useEffect(() => {
    if (!pressedTime && !releasedTime) return;
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - (isPressed ? releasedTime : pressedTime);
    setValue(prevValue => `${prevValue}${getSymbol(timeDiff, isPressed)}`);
  }, [isPressed, pressedTime, releasedTime]);

  const encodedMSG = useMemo(() => {
    return encodeString(value);
  }, [value])

  return (
    <main>
      <button onClick={() => setValue('')}>reset</button>
      <br />
      {encodedMSG}
      <br />
      {value.replace(WORD_SPLITTER, '').replaceAll('_', '\u00a0')}
    </main>
  )
}

export default App;