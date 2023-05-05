import React, { useState, useEffect } from 'react';
import cn from 'classnames';

const API_URL = 'https://api.sampleapis.com/csscolornames/colors';

function App() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [customIncrement, setCustomIncrement] = useState('');
  const [color, setColor] = useState('');
  const [text, setText] = useState('');
  const [hasErrors, setHasErrors] = useState(false);

  const [dataFromServer, setDataFromServer] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((result) => result.json())
      .then((data) => setDataFromServer(data));
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleIncreaseByIncrement = () => {
    setCount((prev) => prev + increment);
  };

  const handleResetCounter = () => {
    setCount(0);
    setIncrement(1);
    setCustomIncrement('');
    setColor('');
    setText('');
    setHasErrors(false);
  };

  const handleColorSelect = (event) => {
    setColor(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleColorTextSubmit = () => {
    if (text === 'red') {
      setColor('red');
    }

    setText('');
  };

  const handleUpdateIncrementRoundButton = (e) => {
    setIncrement(+e.target.value);
  };

  const handleCustomIncrement = (e) => {
    // Calling `setState` doesn't immediately update the state object -> won't be
    // able to see the new change immediately after calling setState ...
    // Solution 1 - storing input in another variable (and test-validate that)
    // Solution 2 - move the logic into the callback function that will be
    // only called AFTER the state updates ...
    const typedInput = e.target.value;
    setCustomIncrement(typedInput);

    if (typedInput === '') {
      setHasErrors(false);
    } else if (isNaN(typedInput)) {
      console.log('Not a number');
      setHasErrors(true);
      // Only integers allowed
    } else if (typedInput % 1 !== 0) {
      console.log('Not a number');
      setHasErrors(true);
    } else if (typedInput < 1 || typedInput > 100) {
      console.log('Accepted numbers 1-100');
      setHasErrors(true);
    } else {
      setHasErrors(false);
    }
  };

  const handleCustomIncrementSubmit = () => {
    if (hasErrors === false && customIncrement !== '') {
      setIncrement(+customIncrement);
    }
  };

  return (
    <div className='h-screen flex items-center justify-center'>
      <form onSubmit={handleFormSubmit}>
        <h1 className='form-title mb-4 text-3xl font-bold text-center'>
          Zynk's Simple Counter
        </h1>
        <h2 className='mb-1 text-lg font-bold text-center'>
          Counter:{' '}
          <span
            className={cn({
              'text-red-500': color === 'red',
              'text-green-500': color === 'green',
              'text-blue-500': color === 'blue',
              'text-purple-500': color === 'purple',
            })}
          >
            {count}
          </span>
        </h2>

        <div className='flex justify-center mb-4'>
          <button
            className='text-sm bg-blue-500 text-white px-4 py-2 font-bold rounded-md m-2 hover:bg-blue-700'
            onClick={handleIncreaseByIncrement}
            type='button'
          >
            Increase +{increment}
          </button>
          <button
            className='text-sm bg-blue-500 text-white px-4 py-2 font-bold rounded-md m-2 hover:bg-blue-700'
            onClick={handleResetCounter}
            type='button'
          >
            Reset
          </button>
        </div>

        <div className='text-center text-md mb-12'>
          <h2 className='mb-3 text-lg font-bold text-center'>
            {`Increment: ${increment}`}
          </h2>

          <div className='flex justify-center items-center gap-3 mb-3'>
            <p>Select:</p>
            <div className='flex gap-1 justify-center'>
              {[1, 2, 3, 4, 5].map((number) => (
                <button
                  type='button'
                  onClick={handleUpdateIncrementRoundButton}
                  key={number}
                  value={number}
                  className='text-sm bg-blue-500 text-white w-10 h-10 rounded-full hover:bg-blue-700 hover:font-bold'
                >
                  {number}
                </button>
              ))}
            </div>
          </div>

          <div className='flex justify-center items-center gap-3 mb-2'>
            <p>Choose custom: </p>
            <input
              type='text'
              className='bg-blue-100 px-3 py-1 outline-none w-16'
              name='choose-custom-increment'
              id='id-choose-custom-increment'
              value={customIncrement}
              onChange={handleCustomIncrement}
            />
            <input
              type='button'
              value='Apply'
              className='bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 hover:font-bold'
              onClick={handleCustomIncrementSubmit}
            />
          </div>
          {hasErrors && (
            <div class='bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-1 text-left'>
              Input not in the right format!
            </div>
          )}
        </div>

        <div className='flex justify-center gap-3 mb-5'>
          <label className='mb-1 text-center' htmlFor='id-select-counter-color'>
            Change counter color:
          </label>
          <select
            value={color}
            onChange={handleColorSelect}
            id='id-select-counter-color'
            className='outline-none'
          >
            <option value=''>Choose color</option>
            <option value='red'>Red</option>
            <option value='green'>Green</option>
            <option value='blue'>Blue</option>
            <option value='purple'>Purple</option>
          </select>
        </div>

        <div className='flex justify-center gap-3 text-sm'>
          <input
            name='input-text-1'
            type='text'
            className='bg-blue-100 px-2 outline-none'
            value={text}
            onChange={handleTextChange}
          />
          <input
            type='button'
            value='Update Color'
            className='bg-blue-200 text-black px-4 py-2 rounded-md'
            onClick={handleColorTextSubmit}
          />
        </div>
      </form>
    </div>
  );
}

export default App;
