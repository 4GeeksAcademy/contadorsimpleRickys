import React, { useState, useEffect, useRef } from 'react';
import Counter from './Counter';

const Home = () => {
  const initialCount = 0;
  const [count, setCount] = useState(initialCount);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  const startCounter = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    setIsRunning(true);
  };

  const stopCounter = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const resetCounter = () => {
    stopCounter();
    setCount(initialCount);
  };

  useEffect(() => {
    startCounter();
    return () => stopCounter(); // limpieza
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.counterContainer}>
        <Counter count={count} />
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={isRunning ? stopCounter : startCounter}>
          {isRunning ? 'Parar' : 'Reanudar'}
        </button>
        <button onClick={resetCounter}>Reiniciar</button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: 'white',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  },
  counterContainer: {
    backgroundColor: '#e0e0e0',
    padding: '20px 30px',
    borderRadius: '15px',
    display: 'flex',
    gap: '10px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
};

export default Home;