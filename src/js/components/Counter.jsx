import React from 'react';

const Counter = ({ count }) => {
  const digits = count.toString().padStart(6, '0').split('');

  return (
    <>
      {digits.map((digit, index) => (
        <div key={index} style={styles.digitBox}>
          {digit}
        </div>
      ))}
    </>
  );
};

const styles = {
  digitBox: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: '3rem',
    fontFamily: 'monospace',
    width: '60px',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
};

export default Counter;