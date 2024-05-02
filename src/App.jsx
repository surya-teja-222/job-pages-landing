import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement, reset,
} from './stores/counter';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  return (
    <div>
      <h1>Counter</h1>
      <h2>{counter}</h2>
      <div>
        <button type="button" onClick={() => dispatch(increment())}>+</button>
        <button type="button" onClick={() => dispatch(decrement())}>-</button>
        <button type="button" onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </div>
  );
}

export default App;
