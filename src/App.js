import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { data } from 'autoprefixer';

const API_URL = 'https://api.sampleapis.com/csscolornames/colors';

function App() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [customIncrement, setCustomIncrement] = useState('');
  const [color, setColor] = useState('');
  const [textIncrement, setTextIncrement] = useState('');
  const [textColor, setTextColor] = useState('');
  const [hasErrorsCustomIncrement, setHasErrorsCustomIncrement] =
    useState(false);
  const [errorMessageCustomIncrement, setErrorMessageCustomIncrement] =
    useState('');
  const [hasErrorsUpdateColor, setHasErrorsUpdateColor] = useState(false);

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
    setTextIncrement('');
    setHasErrorsCustomIncrement(false);
  };

  const handleColorSelect = (event) => {
    setColor(event.target.value);
  };

  const handleTextIncrementChange = (event) => {
    setTextIncrement(event.target.value);
  };

  const handleColorTextSubmit = () => {
    if (textIncrement === 'red') {
      setColor('red');
    }

    setTextIncrement('');
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
      setHasErrorsCustomIncrement(false);
    } else if (isNaN(typedInput)) {
      setErrorMessageCustomIncrement('This is not a number');
      setHasErrorsCustomIncrement(true);
      // Only integers allowed
    } else if (typedInput % 1 !== 0) {
      setErrorMessageCustomIncrement('Decimal places are not allowed');
      setHasErrorsCustomIncrement(true);
    } else if (typedInput < 1 || typedInput > 100) {
      setErrorMessageCustomIncrement('Numbers must be between 1 and 100');
      setHasErrorsCustomIncrement(true);
    } else {
      setHasErrorsCustomIncrement(false);
    }
  };

  const handleCustomIncrementSubmit = () => {
    if (hasErrorsCustomIncrement === false && customIncrement !== '') {
      setIncrement(+customIncrement);
    }

    setCustomIncrement('');
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <form onSubmit={handleFormSubmit}>
        <h1 className='form-title mb-4 text-3xl font-bold'>
          Zynk's React Counter
        </h1>

        <div className='text-center text-md mb-6'>
          <h2 className='mb-1 text-lg font-bold'>
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
        </div>

        <div className='text-center text-md mb-6'>
          <h2 className='mb-3 text-lg font-bold'>
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
              className={cn(
                'bg-blue-500',
                'text-white',
                'px-4',
                'py-2',
                'rounded-md',
                'text-sm',
                'hover:bg-blue-600',
                {
                  'opacity-50': hasErrorsCustomIncrement,
                  'cursor-not-allowed': hasErrorsCustomIncrement,
                  'hover:bg-blue-500': hasErrorsCustomIncrement,
                },
              )}
              onClick={handleCustomIncrementSubmit}
              disabled={hasErrorsCustomIncrement}
            />
          </div>
          {hasErrorsCustomIncrement && (
            <div class='mt-3 bg-orange-100 border-l-8 border-orange-500 text-orange-700 p-2 w-[300px] text-center flex mx-auto justify-center'>
              {errorMessageCustomIncrement}
            </div>
          )}
        </div>

        <div className='text-center text-md mb-6'>
          <h2 className='mb-3 text-lg font-bold'>{`Color: default`}</h2>

          <label htmlFor='id-select-counter-color'>{`Counter color: `}</label>

          <select
            value={color}
            onChange={handleColorSelect}
            id='id-select-counter-color'
            className='outline-none mb-4'
          >
            <option value=''>Choose color</option>
            <option value='red'>Red</option>
            <option value='green'>Green</option>
            <option value='blue'>Blue</option>
            <option value='purple'>Purple</option>
          </select>

          <div className='flex justify-center gap-3 text-sm'>
            <input
              name='input-text-1'
              type='text'
              className='bg-blue-100 px-3 py-2 outline-none'
              value={textColor}
              onChange={handleTextIncrementChange}
            />
            <input
              type='button'
              value='Update Color'
              className={cn(
                'bg-blue-500',
                'text-white',
                'px-4',
                'py-2',
                'rounded-md',
                'text-sm',
                'hover:bg-blue-600',
                {
                  'opacity-50': hasErrorsUpdateColor,
                  'cursor-not-allowed': hasErrorsUpdateColor,
                  'hover:bg-blue-500': hasErrorsUpdateColor,
                },
              )}
              onClick={handleColorTextSubmit}
              disabled={hasErrorsUpdateColor}
            />
          </div>
        </div>
      </form>

      {dataFromServer && dataFromServer.map((item) => {
        if (item.id < 10) {
          return (
            <p>{`${item.name} - ${item.hex} (id=${item.id})`}</p>
          )
        }

        return null;
      })}
    </div>
  );
}

export default App;
