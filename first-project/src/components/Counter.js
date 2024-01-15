import React, { useState } from 'react';

function Counter() {
const [number, setNumber] = useState(0);

function increment() {
    setNumber(number + 1);
}

function decrement() {
    setNumber(number - 1);
}

  return (
    <div>
      <h1>Counter</h1>
        <p>{number}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
    </div>
  )
}

export default Counter;