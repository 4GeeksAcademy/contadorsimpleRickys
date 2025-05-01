import React, { useState, useEffect, useRef } from 'react';
import Counter from './Counter';

const Home = () => {
  const initialCount = 0; // puedes cambiar este valor como base para la cuenta regresiva
  const [count, setCount] = useState(initialCount);
  const [isRunning, setIsRunning] = useState(true);
  const [isCountdown, setIsCountdown] = useState(true); // true para cuenta regresiva, false para ascendente
  const intervalRef = useRef(null);

  const startCounter = () => {
    if (intervalRef.current) return; // ya está corriendo
    intervalRef.current = setInterval(() => {
      setCount(prev =>
        isCountdown ? Math.max(0, prev - 1) : prev + 1
      );
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

  const toggleCounterMode = () => {
    resetCounter();
    setIsCountdown(prev => !prev);
  };

  useEffect(() => {
    startCounter();
    return () => stopCounter(); // limpieza
  }, [isCountdown]);

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
        <button onClick={toggleCounterMode}>
          Cambiar a {isCountdown ? 'ascendente' : 'regresiva'}
        </button>
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