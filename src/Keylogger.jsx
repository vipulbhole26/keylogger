import React, { useState, useEffect, useref } from 'react';

const keylogger = () => {
  const [isLogging, setIsLogging] = useState(false);
  const [keyPresses, setKeyPresses] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  // const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    if (isLogging) {
      inputRef.current.focus();
    }
  }, [isLogging])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isLogging) {
        setKeyPresses([...keyPresses, `key ${event.key} pressed down`]);
      }
    };

    const handleKeyUp = (event) => {
      if (isLogging) {
        setKeyPresses([...keyPresses, `key ${event.key} pressed up`]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isLogging, keyPresses]);

  const handleStartLogging = () => {
    setIsLogging(true);
  };

  const handleStopLogging = () => {
    setIsLogging(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="container">
      <div className={`key-logger ${darkMode ? 'dark-mode' : ''}`}
       data-theme={darkMode? 'dark' : 'light'}
      >
        <h1 className='key'>KeyLogger</h1>
        <div className="toggle-container">
          <input 
            type="checkbox"
            id='dark-mode-toggle'
            className='toggle'
            onChange={toggleDarkMode}
            checked={darkMode} 
          />
          <label htmlFor='dark-mode-toggle'>Dark Mode</label>
        </div>
      <div className="button-container">
        <button className="button-logging" onClick={handleStartLogging}>Start Logging Keypresses</button>
        <button className="button-logging" onClick={handleStopLogging}>Stop Logging Keypresses</button>
      </div>
      <div className="key-press-display">
        <div className="pressed-down">
          {keyPresses.map((keyPress, index) => (
            <p key={index}>{keyPress}</p>
          ))}
        </div>
        <div className="pressed-up">
          {keyPresses.map((keyPress, index) => (
            <p key={index}>{keyPress}</p>
          ))}
        </div>
      </div>
        <div>
          <input ref={inputRef} type="text" style={{ opacity: 1, height: '100%', width: '100%', padding: '100%'}} />
        </div>
    </div>
    </div>
  );
};

export default keylogger;
